class Decoder {
    constructor() {
        this.logger = new Logger("Decoder");
        this.coreLogLevel = 1;
        this.accurateSeek = true;
        this.wasmLoaded = false;
        this.tmpReqQue = [];
        this.cacheBuffer = null;
        this.decodeTimer = null;
        this.videoCallback = null;
        this.audioCallback = null;
        this.requestCallback = null;
    }
    initDecoder(fileSize, chunkSize) {
        const ret = Module._initDecoder(fileSize, this.coreLogLevel);
        this.logger.logInfo("initDecoder return " + ret + ".");
        if (0 === ret) {
            this.cacheBuffer = Module._malloc(chunkSize);
        }
        self.postMessage({
            t: kInitDecoderRsp,
            e: ret
        });
    };
    uninitDecoder() {
        const ret = Module._uninitDecoder();
        this.logger.logInfo("Uninit ffmpeg decoder return " + ret + ".");
        if (this.cacheBuffer) {
            Module._free(this.cacheBuffer);
            this.cacheBuffer = null;
        }
    };
    openDecoder() {
        const paramCount = 7;
        const paramSize = 4;
        const paramByteBuffer = Module._malloc(paramCount * paramSize);
        const ret = Module._openDecoder(paramByteBuffer, paramCount, this.videoCallback, this.audioCallback, this.requestCallback);
        const objData = {
            t: kOpenDecoderRsp,
            e: ret
        };
        this.logger.logInfo("openDecoder return " + ret);
        if (ret === 0) {
            const paramIntBuff = paramByteBuffer >> 2;
            const paramArray = Module.HEAP32.subarray(paramIntBuff, paramIntBuff + paramCount);
            const duration = paramArray[0];
            const videoPixFmt = paramArray[1];
            const videoWidth = paramArray[2];
            const videoHeight = paramArray[3];
            const audioSampleFmt = paramArray[4];
            const audioChannels = paramArray[5];
            const audioSampleRate = paramArray[6];
            Object.assign(objData, {
                v: {
                    d: duration,
                    p: videoPixFmt,
                    w: videoWidth,
                    h: videoHeight
                },
                a: {
                    f: audioSampleFmt,
                    c: audioChannels,
                    r: audioSampleRate
                }
            });
        }
        self.postMessage(objData);
        Module._free(paramByteBuffer);
    };
    closeDecoder() {
        this.logger.logInfo("closeDecoder.");
        if (this.decodeTimer) {
            clearInterval(this.decodeTimer);
            this.decodeTimer = null;
            this.logger.logInfo("Decode timer stopped.");
        }
        const ret = Module._closeDecoder();
        this.logger.logInfo("Close ffmpeg decoder return " + ret + ".");
        self.postMessage({
            t: kCloseDecoderRsp,
            e: 0
        });
    };
    startDecoding(interval) {
        if (this.decodeTimer) {
            clearInterval(this.decodeTimer);
        }
        this.decodeTimer = setInterval(this.decode, interval);
    };
    pauseDecoding() {
        if (this.decodeTimer) {
            clearInterval(this.decodeTimer);
            this.decodeTimer = null;
        }
    };
    decode() {
        let ret = Module._decodeOnePacket();
        if (ret === 7) {
            self.decoder.logger.logInfo("Decoder finished.");
            self.decoder.pauseDecoding();
            self.postMessage({
                t: kDecodeFinishedEvt,
            });
        }
        while (ret == 9) {
            ret = Module._decodeOnePacket();
        }
    };
    sendData(data) {
        const typedArray = new Uint8Array(data);
        Module.HEAPU8.set(typedArray, this.cacheBuffer);
        Module._sendData(this.cacheBuffer, typedArray.length);
    };

    seekTo(ms) {
        const accurateSeek = this.accurateSeek ? 1 : 0;
        const ret = Module._seekTo(ms, accurateSeek);
        self.postMessage({
            t: kSeekToRsp,
            r: ret
        });
    };
    processReq(req) {
        //this.logger.logInfo("processReq " + req.t + ".");
        switch (req.t) {
            case kInitDecoderReq:
                this.initDecoder(req.s, req.c);
                break;
            case kUninitDecoderReq:
                this.uninitDecoder();
                break;
            case kOpenDecoderReq:
                this.openDecoder();
                break;
            case kCloseDecoderReq:
                this.closeDecoder();
                break;
            case kStartDecodingReq:
                this.startDecoding(req.i);
                break;
            case kPauseDecodingReq:
                this.pauseDecoding();
                break;
            case kFeedDataReq:
                this.sendData(req.d);
                break;
            case kSeekToReq:
                this.seekTo(req.ms);
                break;
            default:
                this.logger.logError("Unsupport messsage " + req.t);
        }
    };
    cacheReq(req) {
        if (req) {
            this.tmpReqQue.push(req);
        }
    };
    onWasmLoaded() {
        this.logger.logInfo("Wasm loaded.");
        this.wasmLoaded = true;
        this.videoCallback = Module.addFunction((buff, size, timestamp) => {
            const outArray = Module.HEAPU8.subarray(buff, buff + size);
            const data = new Uint8Array(outArray);
            const objData = {
                t: kVideoFrame,
                s: timestamp,
                d: data
            };
            self.postMessage(objData, [objData.d.buffer]);
        }, 'viid');
        this.audioCallback = Module.addFunction((buff, size, timestamp) => {
            const outArray = Module.HEAPU8.subarray(buff, buff + size);
            const data = new Uint8Array(outArray);
            const objData = {
                t: kAudioFrame,
                s: timestamp,
                d: data
            };
            self.postMessage(objData, [objData.d.buffer]);
        }, 'viid');
        this.requestCallback = Module.addFunction((offset, availble) => {
            self.postMessage({
                t: kRequestDataEvt,
                o: offset,
                a: availble
            });
        }, 'vii');
        while (this.tmpReqQue.length > 0) {
            this.processReq(this.tmpReqQue.shift());
        }
    };
}
self.Module = {
    onRuntimeInitialized: () => {
        if (self.decoder) {
            self.decoder.onWasmLoaded();
        } else {
            console.log("[ER] No decoder!");
        }
    }
};
self.importScripts("common.js");
self.importScripts("libffmpeg.js");
self.decoder = new Decoder();
self.onmessage = (evt) => {
    if (!self.decoder) {
        console.log("[ER] Decoder not initialized!");
        return;
    }
    const req = evt.data;
    if (!self.decoder.wasmLoaded) {
        self.decoder.cacheReq(req);
        self.logger.logInfo("Temp cache req " + req.t + ".");
        return;
    }
    self.decoder.processReq(req);
};
