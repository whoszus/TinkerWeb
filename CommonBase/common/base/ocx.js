var uuidMapIpList = {};
var platformList = {};
var ssServerList = {};
var config = {};
$(function () {
    initConfig();
    //全局唯一一个注册ocx
    golbalBaseOcx = new baseOcx('#regOcxDiv');

    try {
        //注册回调
        golbalBaseOcx.registCallback(_onOcxEventProxy);
        //初始化
        golbalBaseOcx.init(_app.sysConfig["platVersion"]);
//		//获取CMS配置登录，登陆到代理，不直接登陆到CMS

        //获取MPS配置登录
        var mpsIp = _app.sysConfig["mps.ip"];
        var mpsPort = _app.sysConfig["mps.port"];
        var serName = _app.sysConfig["cms.subject"];

        var ret = golbalBaseOcx.loginSAP(mpsIp, mpsPort, "", "", serName);
        if (ret && ret.code != 0) {
            $.gmsg({theme: 'danger', contentHtml: '登录消息总线代理服务失败，请检查配置!', delayTime: 3000, useIframe: true});
        }

        //获取SS配置登录
        getSSInfo();

        //设置用户配置
        setOcxConfigParam();

        //设置平台登录信息
        getPlatInfo();

        //获取uuidMapIp
        $.ajax({
            url: Constants.CONTEXT_PATH + '/resource/getUUIdMapAddrByType.do?type=3',
            dataType: "json",
            type: "post",
            success: function (info) {
                for (var i = 0; i < info.length; i++) {
                    uuidMapIpList[info[i].uuid] = info[i].address;
                }
            }
        });


        var ocxVersion = golbalBaseOcx.getOcxVersion().data.version;
        var version = _app.sysConfig["ocx.Version"];
        if (version != "8000" && version > ocxVersion.split('.')[3]) {
            //
            // require(['artDialog','Gsui'],function(artdialog,Gsui){
            //     Gsui.dialog.warning("您的控件不是最新的，将自动为您下载最新控件！",3000);
            //     $('#downloadOcxBtn').click();
            // });
            $('#tipDownload').attr("data-flag",1);
        }else{
            //版本是最新的
            $('#tipDownload').attr("data-flag",2);
        }
    } catch (e) {
        $('#tipDownload').attr("data-flag",0);
    }
    $("#exchange").click(function () {
        dialog({
            title: '系统切换',
            content: '<iframe width="100%" height="100%" src="' + hostPath + '/security/sysApp/sysswitch.action" frameborder="0"></iframe>',
            width: 690,
            height: 484,
            opacity: 0.3,
            onshow: function () {
                $("#mainIframeId").hide();
            },
            onclose: function () {
                $("#mainIframeId").show();
            }
        }).showModal();
    })
    $(window).unload(function () {
        if (golbalBaseOcx) {
            golbalBaseOcx.logout();
            golbalBaseOcx.logoutSSvr();
            golbalBaseOcx.uninit();
        }
    });

});
/**
 * 全局回调函数
 */
function _onOcxEventProxy(data) {
    // var ret = eval("(" + data + ")");
    // if (ret.action == "DownloadSAPRec") {
    //     if (ret.code == 0) {
    //         // _downLoadWin.downLoadSaVideo(ret.data);
    //     } else {
    //         // $.gmsg({
    //         //     theme: 'danger',
    //         //     contentHtml: '下载失败!原因:' + SAErrorType[ret.code],
    //         //     delayTime: 3000,
    //         //     useIframe: true
    //         // });
    //     }
    // } else if (ret.action == "DownloadLocalRec") {
    //     if (ret.code == 0) {
    //         // _downLoadWin.downLoadPlatVideo(ret.data);
    //     } else {
    //         // $.gmsg({
    //         //     theme: 'danger',
    //         //     contentHtml: '下载失败!原因:' + SAErrorType[ret.code],
    //         //     delayTime: 3000,
    //         //     useIframe: true
    //         // });
    //     }
    // } else {
    //
    //
    //     // var win = getChildWindow(['casearea','mainIframeId','dialogIframeId']);
    //     try{
    //         var win1 = window.frames['common'].window.frames['mainIframeId'].window.frames['dialogIframeId'].window.frames['baseInfoFrame'].window.frames['featureFrame'];
    //         if (win1 && win1.golcallbackFun) {
    //             win1.golcallbackFun(ret);
    //         }
    //
    //     }catch (e){}
    //     try{
    //         var win2 = window.frames['common'].window.frames['mainIframeId'].window.frames['dialogIframeId'].window.frames['bodyCheckFrame'];
    //         if (win2 && win2.golcallbackFun) {
    //             win2.golcallbackFun(ret);
    //         }
    //     }catch (e){
    //     }
    //
    //     try{
    //         var win3 = window.frames['common'];
    //         if (win3 && win3.golcallbackFun) {
    //             win3.golcallbackFun(ret);
    //         }
    //     }catch (e){
    //     }
    //
    //     try{
    //         var win2 = window.frames['common'].window.frames['mainIframeId'].window.frames['dialogIframeId'].window.frames['personalEffectsFrame'];
    //         if (win2 && win2.golcallbackFun) {
    //             win2.golcallbackFun(ret);
    //         }
    //     }catch (e){
    //
    //     }
        
    // }
}
//
//  function getChildWindow(frameNames){
//     var win,txt = 'window.';
//     try{
//         if($.type(frameNames) === 'array'){
//             $.each(frameNames,function(index,name){
//                 txt += 'frames["' + name +'"]';
//             });
//             win = eval(txt);
//         }else{
//             win = window.frames[frameNames];
//         }
//     }catch (err){
//     }
//     return win;
// }

function getPlatInfo() {
    $.ajax({
        url: Constants.CONTEXT_PATH + '/platform/getAllList.do',
        dataType: "json",
        type: "post",
        success: function (info) {
            for (var i = 0; i < info.length; i++) {
                platformList[info[i].platformId] = info[i].id;
                golbalBaseOcx.setVSPInfo(info[i].ip, info[i].port, info[i].loginName, info[i].loginPwd, info[i].id, 1, info[i].platformId);
            }
        }
    });
//	golbalBaseOcx.setVSPInfo("172.16.16.101",10002,"sysadmin","90cfe39ede38a4deeb4f1750e8e01ba1",1,1,54);
}

function initConfig() {
    var ocxVersion = $('#ocxConfig').val();
    if (ocxVersion) {
        config.ocxVersion = ocxVersion;
    } else {
        config.ocxVersion = 0;
    }
}

function getSSInfo() {
    $.ajax({
        url: Constants.CONTEXT_PATH + '/server/getServerByType.do?type=3',
        dataType: "json",
        type: "post",
        success: function (ret) {
            if (ret != null && ret.length > 0) {
                for (var i = 0; i < ret.length; i++) {
                    ssServerList[ret[i].serverId] = ret[i];
                    golbalBaseOcx.setStreamServerInfo(ret[i].ip, ret[i].port, ret[0].loginName, ret[0].loginPwd, ret[i].serverId);
                }

            }
        }
    });
//	golbalBaseOcx.setStreamServerInfo("172.16.16.101","10086","","",1);

}
/**
 * 设置配置信息
 */
function setOcxConfigParam() {
    //设置用户参数
    var data = {};
    data.action = 'SetSavePath';
    data['arguments'] = {};
    var captureSavePath = $.cookie('config.Capture') ? $.cookie('config.Capture') : "c:\\VSAS\\抓拍图像";
    var picPath = $.cookie('config.szHttpPicPath') ? $.cookie('config.szHttpPicPath') : "c:\\VSAS\\车牌图像";
    var videoPath = $.cookie('config.localRecord') ? $.cookie('config.localRecord') : "c:\\VSAS\\本地录像";
    var cutVideoPath = $.cookie('config.cutVideoPath') ? $.cookie('config.cutVideoPath') : "c:\\VSAS\\录像下载";
    data['arguments']['szCaptureSavePath'] = captureSavePath;   //抓图
    data['arguments']['szHttpPicPath'] = picPath;            //车牌图片
    data['arguments']['szLocalRecord'] = videoPath;            //本地录像
    data['arguments']['szCutVideoRecord'] = cutVideoPath;            //本地录像
    golbalBaseOcx.setOcxConfigParam(data);
}