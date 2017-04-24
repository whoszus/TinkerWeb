function covertIndexToSecond(frameIndex){
	return (frameIndex*40)/1000;
}

/**
 * yyyy-MM-dd hh:mm:ss
 * @param {} fmt
 * @return {}
 */
Date.prototype.Format = function(fmt)
{ //author: meizz

	var o = {
			"M+" : this.getMonth()+1,                 //月份   
	"d+" : this.getDate(),                    //日
	"h+" : this.getHours(),                   //小时
	"m+" : this.getMinutes(),                 //分
	"s+" : this.getSeconds(),                 //秒
	 "q+" : Math.floor((this.getMonth()+3)/3), //季度
	 "S"  : this.getMilliseconds()             //毫秒
	};   
	if(/(y+)/.test(fmt))   
	fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	 for(var k in o)   
	   if(new RegExp("("+ k +")").test(fmt))   
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
}

Date.DAY ="day";
Date.SECOND ="sec";
Date.MIN ="min";
Date.HOUR ="hour";
Date.MONTH ="month";
Date.YEAR ="year";
/**
 *    
 * @param {} type
 * @param {} time
 */
Date.prototype.addTimeByType = function(type,time)   
{ //author: meizz   
	if(isNaN(time)){
	 return ;
	}
	switch (type) {

	case Date.SECOND:
		this.setTime(this.getTime() + (time * 1000));break;
	case Date.MIN:
		this.setTime(this.getTime() + (time * 1000 * 60));break;
	case Date.HOUR:
		this.setTime(this.getTime() + (time * 1000 * 60 * 60));break;
	case Date.DAY:
		this.setTime(this.getTime() + (time * 1000 * 60 * 60 * 24));break;
	case Date.MONTH:
        this.prototype = new Date(this.getFullYear(), (this.getMonth()) + time, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());break;
  	case Date.YEAR:
        this.prototype = new Date((this.getFullYear() + time), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());break;
	}
	return this;
}

function changeToDate(str){
	return new Date(str.replace(/\-/g,"/"));
}


function FormatDateToStringByType(date,fmt) {
	var o = {
		"M+" : date.getMonth()+1,                 //月份
		"d+" : date.getDate(),                    //日
		"h+" : date.getHours(),                   //小时
		"m+" : date.getMinutes(),                 //分
		"s+" : date.getSeconds(),                 //秒
		"q+" : Math.floor((date.getMonth()+3)/3), //季度
		"S"  : date.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	return fmt;
}
