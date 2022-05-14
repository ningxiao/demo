class Downloader {
    constructor() {
        this.logger = new Logger("Downloader");
        this.ws = null;
    }
    appendBuffer(buffer1, buffer2) {
        const buf = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        buf.set(new Uint8Array(buffer1), 0);
        buf.set(new Uint8Array(buffer2), buffer1.byteLength);
        return buf.buffer;
    };
    reportFileSize(sz, st) {
        self.postMessage({
            t: kGetFileInfoRsp,
            i: {
                sz: sz,
                st: st
            }
        });
    };
    reportData(start, end, seq, data) {
        self.postMessage({
            t: kFileData,
            s: start,
            e: end,
            d: data,
            q: seq
        }, [data]);
    };
    getFileInfoByHttp(url) {
        let size = 0;
        let status = 0;
        let reported = false;
        const xhr = new XMLHttpRequest();
        this.logger.logInfo("Getting file size " + url + ".");
        xhr.open('get', url, true);
        xhr.onreadystatechange = () => {
            const len = xhr.getResponseHeader("Content-Length");
            if (len) {
                size = len;
            }
            if (xhr.status) {
                status = xhr.status;
            }
            if (!reported && ((size > 0 && status > 0) || xhr.readyState == 4)) {
                this.reportFileSize(size, status);
                reported = true;
                xhr.abort();
            }
        };
        xhr.send();
    };
    downloadFileByHttp(url, start, end, seq) {
        const xhr = new XMLHttpRequest;
        xhr.open('get', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader("Range", "bytes=" + start + "-" + end);
        xhr.onload = () => {
            this.reportData(start, end, seq, xhr.response);
        };
        xhr.send();
    };
    requestWebsocket(url, msg, cb) {
        if (this.ws == null) {
            this.ws = new WebSocket(url);
            this.ws.binaryType = 'arraybuffer';
            this.ws.onopen = (evt) => {
                this.logger.logInfo("Ws connected.");
                this.ws.send(msg);
            };
            this.ws.onerror = (evt) => {
                this.logger.logError("Ws connect error " + evt.data);
            }
            this.ws.onmessage = cb.onmessage;
        } else {
            this.ws.onmessage = cb.onmessage;
            this.ws.send(msg);
        }
    };
    getFileInfoByWebsocket(url) {
        let data;
        const expectLength = 4;
        const cmd = {
            url: url,
            cmd: "size",
        };
        this.requestWebsocket(url, JSON.stringify(cmd), {
            onmessage: (evt) => {
                if (data != null) {
                    data = this.appendBuffer(data, evt.data);
                } else if (evt.data.byteLength < expectLength) {
                    data = evt.data.slice(0);
                } else {
                    data = evt.data;
                }
                // Assume 4 bytes header as file size.
                if (data.byteLength == expectLength) {
                    const int32array = new Int32Array(data, 0, 1);
                    const size = int32array[0];
                    this.reportFileSize(size, 200);
                    //self.logger.logInfo("Got file size " + self.fileSize + ".");
                }
            }
        });
    };
    downloadFileByWebsocket(url, start, end, seq) {
        let data = null;
        const expectLength = end - start + 1;
        const cmd = {
            url: url,
            cmd: "data",
            start: start,
            end: end
        };
        this.requestWebsocket(url, JSON.stringify(cmd), {
            onmessage: (evt) => {
                if (data != null) {
                    data = this.appendBuffer(data, evt.data);
                } else if (evt.data.byteLength < expectLength) {
                    data = evt.data.slice(0);
                } else {
                    data = evt.data;
                }
                // Wait for expect data length.
                if (data.byteLength == expectLength) {
                    this.reportData(start, end, seq, data);
                }
            }
        });
    };
    getFileInfo(proto, url) {
        switch (proto) {
            case kProtoHttp:
                this.getFileInfoByHttp(url);
                break;
            case kProtoWebsocket:
                this.getFileInfoByWebsocket(url);
                break;
            default:
                this.logger.logError("Invalid protocol " + proto);
                break;
        }
    };
    downloadFile(proto, url, start, end, seq) {
        switch (proto) {
            case kProtoHttp:
                this.downloadFileByHttp(url, start, end, seq);
                break;
            case kProtoWebsocket:
                this.downloadFileByWebsocket(url, start, end, seq);
                break;
            default:
                this.logger.logError("Invalid protocol " + proto);
                break;
        }
    }
}
self.importScripts("common.js");
self.downloader = new Downloader();
self.onmessage = function (evt) {
    if (!self.downloader) {
        console.log("[ER] Downloader not initialized!");
        return;
    }
    const objData = evt.data;
    switch (objData.t) {
        case kGetFileInfoReq:
            self.downloader.getFileInfo(objData.p, objData.u);
            break;
        case kDownloadFileReq:
            self.downloader.downloadFile(objData.p, objData.u, objData.s, objData.e, objData.q);
            break;
        case kCloseDownloaderReq:
            //Nothing to do.
            break;
        default:
            self.downloader.logger.logError("Unsupport messsage " + objData.t);
    }
};
