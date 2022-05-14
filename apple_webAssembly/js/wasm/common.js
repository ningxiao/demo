//Player request.
const kPlayVideoReq = 0;
const kPauseVideoReq = 1;
const kStopVideoReq = 2;

//Player response.
const kPlayVideoRsp = 0;
const kAudioInfo = 1;
const kVideoInfo = 2;
const kAudioData = 3;
const kVideoData = 4;

//Downloader request.
const kGetFileInfoReq = 0;
const kDownloadFileReq = 1;
const kCloseDownloaderReq = 2;

//Downloader response.
const kGetFileInfoRsp = 0;
const kFileData = 1;

//Downloader Protocol.
const kProtoHttp = 0;
const kProtoWebsocket = 1;

//Decoder request.
const kInitDecoderReq = 0;
const kUninitDecoderReq = 1;
const kOpenDecoderReq = 2;
const kCloseDecoderReq = 3;
const kFeedDataReq = 4;
const kStartDecodingReq = 5;
const kPauseDecodingReq = 6;
const kSeekToReq = 7;

//Decoder response.
const kInitDecoderRsp = 0;
const kUninitDecoderRsp = 1;
const kOpenDecoderRsp = 2;
const kCloseDecoderRsp = 3;
const kVideoFrame = 4;
const kAudioFrame = 5;
const kStartDecodingRsp = 6;
const kPauseDecodingRsp = 7;
const kDecodeFinishedEvt = 8;
const kRequestDataEvt = 9;
const kSeekToRsp = 10;

class Logger {
    constructor(module) {
        this.module = module;
    }
    log(line) {
        console.log("[" + this.currentTimeStr() + "][" + this.module + "]" + line);
    }
    logError(line) {
        console.error("[" + this.currentTimeStr() + "][" + this.module + "][ER] " + line);
    }
    logInfo(line) {
        console.log("[" + this.currentTimeStr() + "][" + this.module + "][IF] " + line);
    }
    logDebug(line) {
        console.log("[" + this.currentTimeStr() + "][" + this.module + "][DT] " + line);
    }
    currentTimeStr() {
        const now = new Date();
        return now.toLocaleString() + "." + now.getMilliseconds();
    }
}
