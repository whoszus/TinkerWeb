var ocxPanel = function(params){  // param :{ocxID:xxx,ocxType:xxx,defaultScreen:4}
	
	var config = {
		ocxID :'defaultOcxID',
		targetDom : null,
		ocxType : 1, //默认实时控件 1实时、2录像、3摘要、4画区域
		nRecordSummaryTask : 0,  //默认
		defaultScreen:4,
		nToolbarType:0, //工具条类型
		nViewType:0
	}
	if(typeof params =="object"){
		for(p in params){
			config[p] =params[p];		
		}
	}
	function initWithOutWindow(){
		config.ocxObj = config.targetDom.object;
	}
	function init(){
		config.ocxObj = config.targetDom.object;
		initWin();
	}
	
	function initWin(){
		
		var jsonParam = {
			"action" : "InitMonitorWnd",
			"arguments" : {
				strOcxID : config.ocxID,
				eDispSplit : config.defaultScreen,
				eOcxType : config.ocxType,
				nToolbarType : config.nToolbarType,
				nViewType:config.nViewType
			}
		};
		if(config.ocxType == 2){
			jsonParam["arguments"].nRecordSummaryTask = config.nRecordSummaryTask;
		}
		if(config.nViewType == 3){
			jsonParam["arguments"].RectX = config.RectX?config.RectX:864;
			jsonParam["arguments"].RectY  = config.RectY ?config.RectY :93;
			jsonParam["arguments"].RectWidth  = config.RectWidth ?config.RectWidth :234;
			jsonParam["arguments"].RectHeight  = config.RectHeight ?config.RectHeight :614;
		}
		return playerFunc(jsonParam);
	}
	function changeViewSplit(split){
		var jsonParam = {
			"action" : "ChangeViewSplit",
			"arguments" : {
				nDispSplit : split
			}
		};
		return playerFunc(jsonParam);
	}
	
	function delView(){
		var jsonParam = {
			"action" : "DeleteView",
			"arguments" : {
			}
		};
		return playerFunc(jsonParam);
	}
	
	function playerFunc(jsonParam) {
		if (!config.ocxObj) {
			return;
		}
		return decodeOcxRet(config.ocxObj.GS_SAPlayVideoFunc(generateOcxParamJson(jsonParam)));
	}
	
	/*****************文件管理**************************/
	function fileManageFunc(jsonParam){
		if (!config.ocxObj) {
			return;
		}
		return decodeOcxRet(config.ocxObj.GS_SAFileManageFunc(generateOcxParamJson(jsonParam)));
	}
	
	function sysFunc(jsonParam) {
		if (!config.ocxObj) {
			return;
		}
		return decodeOcxRet(config.ocxObj.GS_SASysFunc(generateOcxParamJson(jsonParam)));
	}
	
	function generateOcxParamJson(jsonParam){
		return JSON.stringify(jsonParam);
	}
	
	function decodeOcxRet(ret){
		return eval("("+ret+")");
	}
	
	
	function showToolBar(show){
		if (!config.ocxObj) {
			return;
		}
		var params = {};
		params.bShow = parseInt(show);
		var jsonParam = {
			"action" : "ShowTaskToolbar",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	function playSummaryVideo(nWndNo,sFileID,szJsonInfo){
		if (!config.ocxObj) {
			return;
		}
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.szAbstractFileID = sFileID+"";
		params.szJsonInfo = szJsonInfo;
		var jsonParam = {
			"action" : "PlaySummaryFile",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/* 
	 * 播放结构化上传的录像文件  时间格式：2010-10-10 10:10:10
	 */
	function playSAVideoFile(nWndNo,sFileID,sStartTime,sEndTime,sOffsetTime,nChnAbility){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.sFileID = sFileID+"";
		params.sStartTime = sStartTime;
		params.sEndTime = sEndTime;
		params.sOffsetTime = sOffsetTime;
		params.nChnAbility = nChnAbility;
		var jsonParam = {
			"action" : "SAPlayRecord",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 播放结构化的平台录像 时间格式：2010-10-10-10-10-10
	 * nStorageType
	 */
	function playRecord(nWndNo,nPlatformIndex,nDevID,nChnNo,szFileID,nStorageType,nPlatID
											,szStartTime,szEndTime,szCurrentTime,nRecordType,ability){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.nPlatformIndex = parseInt(nPlatformIndex);
		params.nDevID = parseInt(nDevID);
		params.nChnNo = parseInt(nChnNo);
		params.szFileID = szFileID+"";
		params.nStorageType = parseInt(nStorageType);
		params.nPlatID = parseInt(nPlatID);
		params.szStartTime = szStartTime;
		params.szEndTime = szEndTime;
		params.szCurrentTime = szCurrentTime;
		params.nRecordType = parseInt(nRecordType);
		params.ability = (ability != "" ? ability : null);
		
		var jsonParam = {
			"action" : "PlayRecord",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 关闭视频
	 */
	function closeVideo(nWndNo){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		var jsonParam = {
			"action" : "CloseVideo",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	function closeAllVideo(){
		var params = {};
		// params.nWndNo = parseInt(nWndNo);
		var jsonParam = {
			"action" : "CloseAllVideo",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}

	function registCallback(callbackFun){
		if (!config.ocxObj) {
			return;
		}
		config.ocxObj.GS_SARegJsFunctionCallback(callbackFun);
	}
	
	/**
	 * 打开实时视频
	 */
	function playRealVideo(nWndNo,nPlatformIndex,nDevID,nChnNo,nStreamType,nReqType,nPlatID,ability,RectX,RectY,RectWidth,RectHeight){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.nPlatformIndex = parseInt(nPlatformIndex);
		params.nDevID = parseInt(nDevID);
		params.nChnNo = parseInt(nChnNo);
		params.nStreamType = parseInt(nStreamType);
		params.nReqType = parseInt(nReqType);
		params.nPlatID = parseInt(nPlatID);
		params.ability = (ability != "" ? ability : null);
		params.RectX=parseInt(RectX);
		params.RectY=parseInt(RectY);
		params.RectWidth=parseInt(RectWidth);
		params.RectHeight=parseInt(RectHeight);
		var jsonParam = {
			"action" : "PlayRealVideo",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 播放实时分析流
	 */
	function playSARealVideo(nWndNo,nPlatformID,nDevID,nChnNo,nStreamType,nReqType,szTaskID,nX,nY,nWidth,nHeight,nTaskType){
		var params = {};
		params.nWndNo = parseInt(nWndNo);
		params.nPlatformID = parseInt(nPlatformID);
		params.nDevID = parseInt(nDevID);
		params.nChnNo = parseInt(nChnNo);
		params.nStreamType = parseInt(nStreamType);
		params.szTaskID = szTaskID;
		params.nReqType = parseInt(nReqType);
		params.nX = nX;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nY = nY;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nWidth = nWidth;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nHeight = nHeight;   //SA_RTS_TASK_MAP_DEV表记录的id，(中间表)
		params.nTaskType = nTaskType;
		var jsonParam = {
			"action" : "PlaySARealVideo",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/**
	 * 播放直连设备
	 */
	function playLiveSvrStream(nWndNo,szDevIP,nPort,nChnNo,nStreamType,nModelID,szUserName,szPassword,nIndex){
		var params = {};
		params.nWndNo = parseInt(nWndNo,10);
		params.szDevIP = szDevIP;
		params.nPort = parseInt(nPort,10);
		params.nChnNo = parseInt(nChnNo,10);
		params.nStreamType = parseInt(nStreamType,10);
		params.nModelID = parseInt(nModelID,10);
		params.szUserName = szUserName;
		params.szPassword = szPassword;
		params.nIndex = nIndex;
		var jsonParam = {
			"action" : "PlayLiveSvrStream",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	
	/* 抓图*/
	function streamCapture(nWndNo,szPicPath){
		var params = {};
		params.szPicPath = szPicPath;
		params.nWndNo =parseInt(nWndNo);
		var jsonParam = {
			"action" : "StreamCapture",
			"arguments" : params
		};
		return playerFunc(jsonParam);
	}
	/*	//注册回调
	function registerCallback(callbackFunc){
		config.ocxObj.GS_SARegJsFunctionCallback(callbackFunc);
	}*/
	function getRecordPic(nPlatformIndex,szFileID,szBegintime,
			szEndtime,szCurrentTime,nPlatformID,nDevID,nChnNo,eRecordType,eStorageType,eRecordVideoURLType){
		var params = {};
		params.nPlatformIndex = nPlatformIndex;
		params.szFileID = szFileID;
		params.szBegintime =szBegintime;
		params.szEndtime =szEndtime;
		params.szCurrentTime =szCurrentTime;
		params.nPlatformID =nPlatformID;
		params.nDevID =nDevID;
		params.nChnNo =nChnNo;
		params.eRecordType =eRecordType;
		params.eStorageType =eStorageType;
		params.eRecordVideoURLType =eRecordVideoURLType;
		var jsonParam = {
			"action" : "GetFirstStreamPic",
			"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}


	/**
	 * 打开高拍仪视频流   1.S500L ：高拍仪 2. Logitech HD Webcam C270 ：摄像头
	 * @constructor
	 */
	function OpenUSBStream(camName)
	{
		var jsonParam = {};
		jsonParam.action = 'PlayUsbCamera';
		jsonParam['arguments'] = {};
		jsonParam['arguments']['nWndNo'] = -1;
		jsonParam['arguments']['szDriverName'] = camName;
		playerFunc(jsonParam);
	}

	return {
		playSummaryVideo : playSummaryVideo,
		playSAVideoFile : playSAVideoFile,
		playRealVideo :playRealVideo,
		playSARealVideo :playSARealVideo,
		closeVideo :closeVideo,
		closeAllVideo :closeAllVideo,
		playRecord :playRecord,
		showToolBar :showToolBar,
		init :init,
		initWithOutWindow : initWithOutWindow,
		changeViewSplit : changeViewSplit,
		playLiveSvrStream : playLiveSvrStream,
		delView : delView,
		streamCapture:streamCapture,
		getRecordPic : getRecordPic,
		OpenUSBStream:OpenUSBStream,
		/*registerCallback: registerCallback*/
		registCallback:registCallback
	}
}