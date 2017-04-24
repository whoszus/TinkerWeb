/**
 * Created by whoszus on 2017/2/13.
 */
var fileBurnOcx = function () {

    var ocxObj = null;

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

    function GS_SAFileManageFunc(jsonParam) {
        if (!ocxObj) {
            this.init();
        }
        return decodeOcxRet(ocxObj.GS_SAFileManageFunc(generateOcxParamJson(jsonParam)));
    }

    function init() {
        var classId = "clsid:B0D616B7-E0D0-40BA-A379-B550A9C4E478";
        var obj = $('<object classid=' + classId + ' width="1" height="1" ></object>');
        obj.appendTo($('body'));
        ocxObj = obj[0].object;
    }

    /**
     * 获取可刻录光驱盘符接口
     */
    function burnGetAvailableDisks() {
        if (!ocxObj) {
            this.init();
        }
        var params = {};
        var jsonParam = {
            "action": "BurnGetAvailableDisks",
            "arguments": params
        };
        return GS_SAFileManageFunc(jsonParam);
    }

    /**
     * 刻录接口调用
     * {"action":"BurnFile","arguments":{"szDiskSymbol":"G", "szTitle":"测试用盘", "nFileNum":2, "FileList":[{"szFilePath":"D://m.gmf"}, {"szFilePath":"D://m.gmf"}]}}
     * @param szDiskSymbol
     * @param szTitle
     * @param nFileNum
     * @param FileList 对象数组
     * @returns {*}
     * 回调方式 ：同步回调
     * 回调结果： {"action":"BurnFile","code":0,"szRetMsg":"成功"}
     */
    function burnFile(szDiskSymbol,szTitle,nFileNum,FileList) {
        if (!ocxObj) {
            this.init();
        }
        var params = {};
        params.szDiskSymbol =szDiskSymbol;
        params.szTitle=szTitle;
        params.nFileNum=nFileNum;
        params.FileList=FileList;
        var jsonParam = {
            "action": "BurnFile",
            "arguments": params
        };
        return GS_SAFileManageFunc(jsonParam);
    }

    /**
     * 获取刻录进度接口
     {"action":"BurnGetProgress","arguments":{}}
     同步返回结果
     {"code":0,"nProgressOfBurn":0}
     * @returns {*}
     */
    function burnGetProgress() {
        if (!ocxObj) {
            this.init();
        }
        var params = {};
        var jsonParam = {
            "action": "BurnGetProgress",
            "arguments": params
        };
        return GS_SAFileManageFunc(jsonParam);
    }

    function burnFilesStop() {
        if (!ocxObj) {
            this.init();
        }
        var params = {};
        var jsonParam = {
            "action": "BurnFilesStop",
            "arguments": params
        };
        return GS_SAFileManageFunc(jsonParam);
    }


    function registCallback(callbackFun){
        if (!ocxObj) {
            return;
        }
        ocxObj.GS_SARegJsFunctionCallback(callbackFun);
    }

    /**
     *
     4.获取身份证接口
     {"action":"ReadIDCard","arguments":{}}
     同步返回结果
     * @returns {*}
     */
    function readIDCard() {
        if (!ocxObj) {
            this.init();
        }
        var params = {};
        var jsonParam = {
            "action": "ReadIDCard",
            "arguments": params
        };
        return GS_SAFileManageFunc(jsonParam);
    }

    function printBarcode(parrszContent) {
        if (!ocxObj) {
            this.init();
        }
        var jsonParam = {};
        jsonParam.action = 'PrintBarcode';
        jsonParam['arguments'] = {};
        jsonParam['arguments']['parrszContent'] = parrszContent;
        jsonParam['arguments']['eDirection'] = 0;
        jsonParam['arguments']['iXPos'] = 176;
        jsonParam['arguments']['iYPos'] = 112;
        jsonParam['arguments']['iHeight'] = 112;
        jsonParam['arguments']['iNarrow'] = 2;
        jsonParam['arguments']['iWide'] = 5;
        jsonParam['arguments']['eRotation'] = 1;
        jsonParam['arguments']['bReadable'] = 1;
        jsonParam['arguments']['eCodeType'] = 0;
        return GS_SAFileManageFunc(jsonParam);
    }

    return {
        init: init,
        burnGetAvailableDisks:burnGetAvailableDisks,
        burnGetProgress:burnGetProgress,
        burnFile:burnFile,
        burnFilesStop:burnFilesStop,
        readIDCard:readIDCard,
        printBarcode:printBarcode,
        registCallback:registCallback
    };

}