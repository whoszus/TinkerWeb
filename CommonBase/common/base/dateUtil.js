/**
 * 日期操作
 * @author zxl
 */
define(function(){
	/**
	 * 日期操作相关方法
	 */
	var myDateUtil = {
			/**
			 * 设置日期(0为今天，-1为昨天，以此类推)
			 * @param AddDayCount
			 * @returns {String}/2016-01-01/
			 */
		GetDateStr:function(AddDayCount){
			var dd = new Date();
		    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		    var y = dd.getFullYear();
		    var m = dd.getMonth()+1;//获取当前月份的日期
		    if(m<10){
		    	m = '0'+m;
		    }
		    var d = dd.getDate();
		    if(d<10){
		    	d = '0'+d;
		    }
		    
		    return y+"-"+m+"-"+d;
		},
		GetDateStr:function(date,AddDayCount){
			date.setDate(date.getDate()+AddDayCount);//获取AddDayCount天后的日期
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    var strHours=date.getHours();
		    var strMins=date.getMinutes();
		    var strSeconds=date.getSeconds();		    
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    if (strHours >= 0 && strHours <= 9) {
		    	strHours = "0" + strHours;
		    }
		    if (strMins >= 0 && strMins <= 9) {
		    	strMins = "0" + strMins;
		    }
		    if (strSeconds >= 0 && strSeconds <= 9) {
		    	strSeconds = "0" + strSeconds;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMins
            + seperator2 + strSeconds;
		    return currentdate;
		},
		/**
		 * 设置日期(0为今天，-1为昨天，以此类推)
		 * @param AddDayCount
		 * @returns {String}/2016年01月01日/
		 */
		getDateFmt:function(AddDayCount){
			var dd = new Date();
		    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		    var y = dd.getFullYear();
		    var m = dd.getMonth()+1;//获取当前月份的日期
		    if(m<10){
		    	m = '0'+m;
		    }
		    var d = dd.getDate();
		    if(d<10){
		    	d = '0'+d;
		    }
		    
		    return y+"年"+m+"月"+d+"日";
		},
		/**
		 * 获取当前时间
		 * @returns {String}/2016-01-01 23:59:59/
		 */
		getNowFormatDate:function() {
		    var date = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    var strHours=date.getHours();
		    var strMins=date.getMinutes();
		    var strSeconds=date.getSeconds();		    
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    if (strHours >= 0 && strHours <= 9) {
		    	strHours = "0" + strHours;
		    }
		    if (strMins >= 0 && strMins <= 9) {
		    	strMins = "0" + strMins;
		    }
		    if (strSeconds >= 0 && strSeconds <= 9) {
		    	strSeconds = "0" + strSeconds;
		    }
//		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
//            + " " + date.getHours() + seperator2 + date.getMinutes()
//            + seperator2 + date.getSeconds();
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMins
            + seperator2 + strSeconds;
		    return currentdate;
		},
		/**
		 * 获取指定日期的时间字符串
		 * @param date  {Date}
		 * @returns {String}/2016-01-01 23:59:59/
		 */
		getNowFormatDate:function(date) {
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    var strHours=date.getHours();
		    var strMins=date.getMinutes();
		    var strSeconds=date.getSeconds();		    
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    if (strHours >= 0 && strHours <= 9) {
		    	strHours = "0" + strHours;
		    }
		    if (strMins >= 0 && strMins <= 9) {
		    	strMins = "0" + strMins;
		    }
		    if (strSeconds >= 0 && strSeconds <= 9) {
		    	strSeconds = "0" + strSeconds;
		    }
//		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
//            + " " + date.getHours() + seperator2 + date.getMinutes()
//            + seperator2 + date.getSeconds();
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMins
            + seperator2 + strSeconds;
		    return currentdate;
		},
		/**
		 * 根据一个日期查找另一个日期
		 * @param {} theDay：2016-04-20
		 * @param {} AddDayCount：(-1为前一天，1为后一天，0不变，以此类推)
		 * @return {String}
		 */
		findDayByDay:function(theDay,AddDayCount){
			var formatDay = new Date(theDay);
			formatDay.setDate(formatDay.getDate()+AddDayCount);//获取AddDayCount天后的日期
			var y = formatDay.getFullYear();
		    var m = formatDay.getMonth()+1;//获取当前月份的日期
		    if(m<10){
		    	m = '0'+m;
		    }
		    var d = formatDay.getDate();
		    if(d<10){
		    	d = '0'+d;
		    }
		    
		    return y+"-"+m+"-"+d;
		},
		/**
		 * 返回距 1970 年 1 月 1 日之间的毫秒数(可用于比较时间先后)
		 * @param {} Date 格式为：yyyy-mm-dd
		 */
		formatTimesFromDate:function(Date){
			var arr = Date.split("-");
			var newDate = new Date(arr[0],arr[1],arr[2]);
			var resultDate = newDate.getTime();
			return resultDate;
		},
		/**
		 * 返回距 1970 年 1 月 1 日之间的毫秒数(可用于比较时间先后)
		 * @param {} Time 格式为：hh:mm:ss
		 */
		formatTimesFromTime:function(Time){
			var arr = Time.split(":");
			var newTime = new Date('','','',arr[0],arr[1],arr[2]);
			var resultDate = newTime.getTime();
			return resultDate;
		}
	};
	
	return myDateUtil;
});
