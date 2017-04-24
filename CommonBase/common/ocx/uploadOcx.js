var uploadOcx = function () {

    var ocxObj = null;
    var CMSinfo = null;
    var hasLogin = false;

    function generateOcxParamJson(jsonParam) {
        return JSON.stringify(jsonParam);
    }

    function decodeOcxRet(ret) {
        return eval("(" + ret + ")");
    }

    function sysFunc(jsonParam) {
        if (!ocxObj) {
            return;
        }
        return decodeOcxRet(ocxObj.GS_SASysFunc(generateOcxParamJson(jsonParam)));
    }

    function playerFunc(jsonParam) {
        if (!ocxObj) {
            return;
        }
        return decodeOcxRet(ocxObj.GS_SAPlayVideoFunc(generateOcxParamJson(jsonParam)));
    }

    function uploadManageFunc(jsonParam) {
        if (!ocxObj) {
            return;
        }
        return decodeOcxRet(ocxObj.GS_SAFileManageFunc(generateOcxParamJson(jsonParam)));
    }

    function delView() {
        var jsonParam = {
            "action": "DeleteView",
            "arguments": {}
        };
        return playerFunc(jsonParam);
    }

    function registCallback(callbackFun){
        if (!ocxObj) {
            return;
        }
        ocxObj.GS_SARegJsFunctionCallback(callbackFun);
    }


    function init() {
        var classId = "clsid:B0D616B7-E0D0-40BA-A379-B550A9C4E478";
        var obj = $('<object classid=' + classId + ' width="1" height="1" ></object>');
        obj.appendTo($('body'));
        ocxObj = obj[0].object;
    }

    function getFolderPath() {
        var jsonParam = {
            "action": "BrowseMenu",
            "arguments": {}
        };
        return uploadManageFunc(jsonParam);
    }

    function getFilePath(param) {
        var jsonParam = {
            "action": "BrowseFolder",
            "arguments": {
                'folder': param
            }
        };
        return uploadManageFunc(jsonParam);
    }

    //单文件上传
    function uploadFile(szFileName, szFolderID, szBegintime, szEndtime, szExtraInfo, szpFilePath, eUploadType, szAccountName) {
        //argus:1)szFileName//文件别名                  2)szFolderID //文件夹ID     3)szBegintime//起始时间戳 格式: "2015-04-16 15:30:30"
        //4）szEndtime结束时间戳 格式: "2015-04-16 15:30:30"  5）szExtraInfo//上传给服务器，服务器用这条数据写数据库，Json字符串      6)szpFilePath //文件路径
        if (!ocxObj) {
            return;
        }
        var params = {};
        params.szFileName = szFileName;
        params.szFolderID = szFolderID;
        params.szBegintime = szBegintime;
        params.szEndtime = szEndtime;
        params.szExtraInfo = szExtraInfo;
        params.szpFilePath = szpFilePath;
        params.eUploadType = eUploadType;
        params.szAccountName = szAccountName;
        var jsonParam = {
            "action": "StartUpLoadFile",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    function stopUpLoadFile(uploadId) {
        if (!ocxObj) {
            return;
        }
        var params = {};
        params.nUpLoadFileID = parseInt(uploadId, 10);
        var jsonParam = {
            "action": "StopUpLoadFile",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    //上传图片文件夹
    function uploadPictureFolder(szFilePath, szFolderID, szAccountName) {
        if (!ocxObj) {
            return;
        }
        var params = {};
        params.szFilePath = szFilePath;
        params.szFolderID = szFolderID;
        params.szAccountName = szAccountName;
        var jsonParam = {
            "action": "StartUpLoadFolder",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    function stopUpLoadFolder() {
        if (!ocxObj) {
            return;
        }
        var params = {};
        var jsonParam = {
            "action": "StopUpLoadFolder",
            "arguments": {}
        };
        return uploadManageFunc(jsonParam);
    }

    //获取文件进度
    function getUploadFileUploadProgress(uploadId) {

        if (!ocxObj) {
            return;
        }
        var params = {};
        params.nUpLoadFileID = parseInt(uploadId);
        var jsonParam = {
            "action": "GetUploadFileInfo",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    //获取文件夹进度
    function getPictureFolderUploadProgress(uploadId) {

        if (!ocxObj) {
            return;
        }
        var params = {};
        var jsonParam = {
            "action": "GetUploadFolderInfo",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    //开始转码
    function startConvertFile(szSrcFileName, szDstFileName, szBeginTime) {
        if (!ocxObj) {
            return;
        }
        var params = {};
        params.szSrcFileName = szSrcFileName;
        params.szDstFileName = szDstFileName;
        params.szBeginTime = szBeginTime;
        var jsonParam = {
            "action": "StartConvertFile",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    //停止转码
    function stopConvertFile(lPort) {

        if (!ocxObj) {
            return;
        }
        var params = {};
        params.lPort = lPort;
        var jsonParam = {
            "action": "StopConvertFile",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    //获取转码进度
    function getConvertFileProgress(lPort) {

        if (!ocxObj) {
            return;
        }
        var params = {};
        params.lPort = lPort;
        var jsonParam = {
            "action": "GetConvertFileProgress",
            "arguments": params
        };
        return uploadManageFunc(jsonParam);
    }

    return {
        init: init,
        delView: delView,
        getFilePath: getFilePath,
        getFolderPath: getFolderPath,
        uploadFile: uploadFile,
        stopUpLoadFile: stopUpLoadFile,
        getUploadFileUploadProgress: getUploadFileUploadProgress,
        uploadPictureFolder: uploadPictureFolder,
        stopUpLoadFolder: stopUpLoadFolder,
        getPictureFolderUploadProgress: getPictureFolderUploadProgress,
        startConvertFile: startConvertFile,
        stopConvertFile: stopConvertFile,
        getConvertFileProgress: getConvertFileProgress,
        registCallback:registCallback
    };
}