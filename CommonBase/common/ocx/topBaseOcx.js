var baseOcx = function(ocxParam){
	
	if(typeof ocxParam == "string"){
		ocxObj = $(ocxParam)[0].object;
	}if(typeof ocxParam == "object"){
		ocxObj = ocxParam;
	}
	
	function generateOcxParamJson(jsonParam){
		return JSON.stringify(jsonParam);
	}
	
	function decodeOcxRet(ret){
		return eval("("+ret+")");
	}
	
	/**
	 * 主方法
	 */
	function sysFunc(jsonParam) {
		if (!ocxObj) {
			return;
		}
		return decodeOcxRet(ocxObj.GS_SASysFunc(generateOcxParamJson(jsonParam)));
	}
	
	function getOcxVersion(){
		var jsonParam = {
			"action" : "GetVersion",
			"arguments" : {
			}
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 设置路径信息
	 */
	function setOcxConfigParam(jsonParam){
		return sysFunc(jsonParam);
	}
	
	/**
	 * 初始化
	 */
	function init(platVersion){
		var params = {};
		params.platVersion=platVersion;
		var jsonParam = {
			"action" : "Init",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}

	
	/**
	 * 退出登录
	 */
	function logout(){
		var jsonParam = {
			"action" : "LogoutSAP",
			"arguments" : {
			}
		};
		return sysFunc(jsonParam);
	}
	
	
	
	/**
	 * 反初始化
	 */
	function UnInit(){
		var jsonParam = {
			"action" : "UnInit",
			"arguments" : {
			}
		};
		return sysFunc(jsonParam);
	}
	
	
	/**
	 * 注册回调消息
	 */
	function registCallback(callbackFun){
		if (!ocxObj) {
			return;
		}
		ocxObj.GS_SARegJsFunctionCallback(callbackFun);
	}
	
	/**
	 * 登录CMS服务
	 */
	function loginSAP(szServerIP,nPort,szUser,szPassword,szServName){
		var params = {};
		params.szServerIP = szServerIP;
		params.nPort = parseInt(nPort);
		params.szUser = szUser;
		params.szPassword = szPassword;
		params.szServName = szServName;
		var jsonParam = {
			"action" : "LoginSAP",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 登录ss
	 */
	function loginSSvr(szSvrIP,nPort,szUser,szPsw){
		var params = {};
		params.szSvrIP = szSvrIP;
		params.nPort = parseInt(nPort,10);
		params.szUser = szUser;
		params.szPsw = szPsw;
		var jsonParam = {
			"action" : "LoginSSvr",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 设置ss信息
	 */
	function setStreamServerInfo(szServerIP,nPort,szUser,szPassword,nIndex){
		var params = {};
		params.szServerIP = szServerIP;
		params.nPort = parseInt(nPort,10);
		params.szUser = szUser;
		params.szPassword = szPassword;
		params.nIndex = nIndex;
		var jsonParam = {
			"action" : "SetStreamServerInfo",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	/**
	 * 登出ss
	 */
	function logoutSSvr(){
		var params = {};
		var jsonParam = {
			"action" : "LogoutSSvr",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 设置平台信息
	 */
	function setVSPInfo(szServerIP,nPort,szUser,szPassword,nPlatformIndex,ePlatformType,nPlatformID){
		var params = {};
		params.szServerIP = szServerIP;
		params.nPort = parseInt(nPort);
		params.szUser = szUser;
		params.szPassword = szPassword;
		params.nPlatformIndex = parseInt(nPlatformIndex);
		params.ePlatformType = parseInt(ePlatformType);
		params.nPlatformID = parseInt(nPlatformID);
		var jsonParam = {
			"action" : "SetVSPInfo",
			"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	
	/**
	 * 摘要方法
	 */
	function snapshotFunc(jsonParam) {
		if (!ocxObj) {
			return;
		}
		return decodeOcxRet(ocxObj.GS_SASnapshotFunc(generateOcxParamJson(jsonParam)));
	}
	
	function setInterestedZone(szFileID){
		var params = {};
		params.szFileID = szFileID;
		var jsonParam = {
			"action" : "SetInterestedZone",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function clearInterestedZone(){
		var params = {};
		var jsonParam = {
			"action" : "ClearInterestedZone",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function queryARLabel(szFileID){
		var params = {};
		params.szFileID = szFileID;
		var jsonParam = {
			"action" : "QueryARLabel",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function searchSnapshot(param){
		var params = {};
		params= param;
		var jsonParam = {
			"action" : "SnapshotSearch",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	function getSnapshotResult(nIndex,nOffset){
		var params = {};
		params.nIndex = nIndex;
		params.nOffset = nOffset;
		var jsonParam = {
			"action" : "GetSnapshotResult",
			"arguments" : params
		};
		return snapshotFunc(jsonParam);
	}
	
	
	/*****************文件管理**************************/
	function fileManageFunc(jsonParam){
		if (!ocxObj) {
			return;
		}
		return decodeOcxRet(ocxObj.GS_SAFileManageFunc(generateOcxParamJson(jsonParam)));
	}
	
	function saveAsImage(szDefaultFileName,szInputPath){
		var params = {};
		params.szDefaultFileName = szDefaultFileName;
		params.szInputPath = szInputPath;
			var jsonParam = {
			"action" : "SaveAsImage",
			"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	function getFolderPath(){
		var jsonParam = {
			"action" : "BrowseMenu",
			"arguments" : {
			}
		};
		return fileManageFunc(jsonParam);
	}
	
	function getFilePath(param){
		var jsonParam = {
			"action" : "BrowseFolder",
			"arguments" : {
				'folder' : param
			}
		};
		return fileManageFunc(jsonParam);
	}
	
	//单文件上传
	function uploadFile(szFileName,szFolderID,szBegintime,szEndtime,szExtraInfo,szpFilePath,eUploadType,szAccountName){
		//argus:1)szFileName//文件别名                  2)szFolderID //文件夹ID     3)szBegintime//起始时间戳 格式: "2015-04-16 15:30:30" 
	//4）szEndtime结束时间戳 格式: "2015-04-16 15:30:30"  5）szExtraInfo//上传给服务器，服务器用这条数据写数据库，Json字符串      6)szpFilePath //文件路径
		if(!ocxObj) {
			return ;
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
			"action" : "StartUpLoadFile",
			"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	function stopUpLoadFile(uploadId){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.nUpLoadFileID = parseInt(uploadId,10);
		var jsonParam = {
			"action" : "StopUpLoadFile",
			"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//上传图片文件夹
	function uploadPictureFolder(szFilePath,szFolderID,szAccountName){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.szFilePath = szFilePath;
		params.szFolderID = szFolderID;
		params.szAccountName = szAccountName;
		var jsonParam = {
				"action" : "StartUpLoadFolder",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	function stopUpLoadFolder(){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		var jsonParam = {
				"action" : "StopUpLoadFolder",
				"arguments" : {}
		};
		return fileManageFunc(jsonParam);
	}
	
	//获取文件进度
	function getUploadFileUploadProgress(uploadId){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.nUpLoadFileID = parseInt(uploadId);
		var jsonParam = {
				"action" : "GetUploadFileInfo",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//获取文件夹进度
	function getPictureFolderUploadProgress(uploadId){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		var jsonParam = {
				"action" : "GetUploadFolderInfo",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//开始转码
	function startConvertFile(szSrcFileName,szDstFileName,szBeginTime){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.szSrcFileName = szSrcFileName;
		params.szDstFileName = szDstFileName;
		params.szBeginTime = szBeginTime;
		var jsonParam = {
				"action" : "StartConvertFile",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//停止转码
	function stopConvertFile(lPort){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.lPort = lPort;
		var jsonParam = {
				"action" : "StopConvertFile",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	//获取转码进度
	function getConvertFileProgress(lPort){
	
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.lPort = lPort;
		var jsonParam = {
				"action" : "GetConvertFileProgress",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	/**
	 * 下载录像  nRecType ：1为结构化平台录像下载，2为本地录像下载
	 */
	function startDownloadRec(szFileName,szFileID,szBegintime,szEndtime,szCurrentTime,nRecType){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.szFileName = szFileName;
		params.szFileID = szFileID;
		params.szBegintime = szBegintime;
		params.szEndtime = szEndtime;
		params.szCurrentTime = szCurrentTime;
		params.nRecType = nRecType;
		var jsonParam = {
				"action" : "StartDownloadRec",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	/**
	 * 停止下载录像
	 */
	function stopDownloadRec(nDownloadID,nRecType){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.nDownloadID = nDownloadID;
		params.nRecType = nRecType;
		var jsonParam = {
				"action" : "StopDownloadRec",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	/**
	 * 获取下载进度录像
	 */
	function getDownloadProgress(nDownloadID,nRecType){
		if(!ocxObj) {
			return ;
		}
		var params = {};
		params.nDownloadID = nDownloadID;
		params.nRecType = nRecType;
		var jsonParam = {
				"action" : "GetDownloadProgress",
				"arguments" : params
		};
		return fileManageFunc(jsonParam);
	}
	
	
	/**
	 * 通过ocx接口获取设备树（3.0.1）
	 */
	function getDevInfo(strOcxID,nNeedDev,nGetFromSvr,nPlatformIndex){
		if(!ocxObj) {
			return ;
		}
		var param ={};
		param.strOcxID = strOcxID;
		param.nNeedDev = nNeedDev;
		param.nGetFromSvr = nGetFromSvr;
		param.nPlatformIndex = nPlatformIndex;
		var jsonParam = {
				"action" : "GetDevInfo",
				"arguments" : params
		};
		return sysFunc(jsonParam);
	}
	
	
	
	
	return {
		init : init,
		logout : logout,
		uninit : UnInit,
		getOcxVersion : getOcxVersion,
		registCallback :registCallback,
		setOcxConfigParam : setOcxConfigParam,
		loginSAP : loginSAP,
		setVSPInfo :setVSPInfo,
//		loginSSvr :loginSSvr,
		logoutSSvr :logoutSSvr,
		setStreamServerInfo :setStreamServerInfo,
		/**摘要接口*/
		searchSnapshot :searchSnapshot,
		getSnapshotResult: getSnapshotResult,
		queryARLabel :queryARLabel,
		clearInterestedZone:clearInterestedZone,
		setInterestedZone:setInterestedZone,
		
		/**文件接口*/
		saveAsImage : saveAsImage,
		getFilePath : getFilePath,
		getFolderPath : getFolderPath,
		uploadFile :uploadFile,
		stopUpLoadFile : stopUpLoadFile,
		getUploadFileUploadProgress :getUploadFileUploadProgress,
		uploadPictureFolder : uploadPictureFolder,
		stopUpLoadFolder :stopUpLoadFolder,
		getPictureFolderUploadProgress : getPictureFolderUploadProgress,
		startConvertFile :startConvertFile,
		stopConvertFile :stopConvertFile,
		getConvertFileProgress : getConvertFileProgress,
		startDownloadRec : startDownloadRec,
		stopDownloadRec :stopDownloadRec,
		getDownloadProgress : getDownloadProgress
		
	}
}