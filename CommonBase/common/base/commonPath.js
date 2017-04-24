define(function(){
	
	var contextPath = "/cmt";
	
	var commonPath = {
		//获取所有单位
		getAlldepartments:contextPath+"/suspects/getDepartmentList.action",
		//获取案由
		caseTypeList:contextPath+'/suspects/getCaseTypeList.action',
		//获取案由（新）
		caseTypeListNew:contextPath+'/casePerson/getCaseTypeList.action',
		//获取流程列表
		getFlowList:contextPath+"/suspects/getFlowList.action",
		//根据警号查询名称
		getpoliceName: contextPath+'/suspects/getPoliceNameByCode.action',
		//查看详情页面
		detailUrl: contextPath+'/suspects/personCaseDetail.html?personCaseId=',
		//查询所有嫌疑人
		getSuspects: contextPath+'/suspects/searchSuspectsName.action',
		//查询所有案件名称
		getCaseName: contextPath+'/suspects/searchCaseName.action',
		//查询所有警号
		getPoliceNum: contextPath+'/suspects/searchPoliceNum.action',
		//查询所有警员名称
		getPoliceName: contextPath+'/suspects/searchPoliceName.action',
		//查询所有警员名称（兼容IE8）
		getPoliceNameAc: contextPath+'/suspects/searchPoliceNameAc.action',
		//根据id获取措施日志
		dealLogUrl: contextPath+'/suspects/loadPersonCaseFlow.action',
		//获取当前服务时间
		getServTime: contextPath+'/casePerson/getServerTime.actioin'
	}
	
	return commonPath;
});