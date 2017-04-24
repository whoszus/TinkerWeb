/**
 * jquery 的ajax请求
 * @description aJax.js
 * @author skz
 * @date 2016年9月23日
 * @time 下午1:55:51
 */
define(['jquery'],function(){
	/**
	 * @description ajax 请求工具
	 * @name aJax
	 * @class
	 */
	var aJax = {
	    /**
	     * @method
	     * @name globalSetting
	     * @memberof aJax
	     * @description ajax请求的全局设置
	     * @param {Object} setting	自定义设置对象
	     * @example Gsui.aJax.globalSetting(setting);
	     */
	    globalSetting : function(setting){
	        $.each(setting,function(prop,value){
	            $.ajaxSetting[prop] = value;
	        });
	    },
	    /**
	     * @method
	     * @name globalNoCache
	     * @memberof aJax
	     * @description ajax请求不缓存页面url
	     * @example Gsui.aJax.globalNoCache();
	     */
	    globalNoCache : function(){
	        $.ajaxSettings.cache = false;
	    },
	    /**
	     * @method
	     * @name globalJsonDataType
	     * @memberof aJax
	     * @description 设置ajax请求全局数据类型为json类型
	     * @example Gsui.aJax.globalJsonDataType();
	     */
	    globalJsonDataType : function(){
	        $.ajaxSetting.dataType = "json";
	    },
	    /**
	     * @method
	     * @name fetch
	     * @memberof aJax
	     * @description 同步从服务器获取数据
	     * @param {String} url	请求url
	     * @param {Object} data	请求参数
	     * @param {String} methodType 请求方法类型 "GET"(默认) "POST" "PUT"..
	     * @returns {Object} JSON格式数据
	     */
	    fetch : function(url,data,methodType){
	        var value = "";
	        if(!url) throw "url should not be empty!";
	        data = !data ? {} : ($.type(data)==="object" ? data : {});
	        $.ajax({
	            async : false, // 同步请求
	            type : methodType || "GET",
	            data : data,
	            url : url,
	            success : function(data) {
	                try{
	                    value = data.indexOf('{') !== -1 ? JSON.parse(data) : data;
	                }catch (e) {
	                    throw e;
	                }
	            }
	        });
	        return value;
	    },
	    /**
	     * @method
	     * @name getJSON
	     * @memberof aJax
	     * @private
	     * @description 从服务器获取数据
	     * @param {String} type 请求类型
	     * @param {String} url	请求url
	     * @param {Object} data	请求参数
	     * @param {function} successCallback 请求成功回调
	     * @param {function} errCallback     请求失败回调
	     */
	    _json: function(type,url,data,successCallback,errCallback){
	        $.ajax({
	            type : type || "GET",
	            dataType: 'json',
	            data : data,
	            url : url,
	            success :function(data, textStatus, jqXHR){
	                successCallback && successCallback(data, textStatus, jqXHR);
	            },
	            error: function(XMLHttpRequest, textStatus, errorThrown){
	                errCallback && errCallback(XMLHttpRequest, textStatus, errorThrown);
	            }
	        });
	    },
	    /**
	     * @method
	     * @name getJSON
	     * @memberof aJax
	     * @description 从服务器获取数据( GET请求方式)
	     * @param {String} url	请求url
	     * @param {Object} data	请求参数
	     * @param {function} successCallback 请求成功回调
	     * @param {function} errCallback     请求失败回调
	     * @example Gsui.aJax.getJSON(url,data,successCallback,errCallback);
	     */
	    getJSON: function(url,data,successCallback,errCallback){
	        this._json(url,data,successCallback,errCallback);
	    },
	    /**
	     * @method
	     * @name postJSON
	     * @memberof aJax
	     * @description 从服务器获取数据(POST 请求方式)
	     * @param {String} url	请求url
	     * @param {Object} data	请求参数
	     * @param {function} successCallback 请求成功回调
	     * @param {function} errCallback     请求失败回调
	     * @example Gsui.aJax.postJSON(url,data,successCallback,errCallback);
	     */
	    postJSON: function(url,data,successCallback,errCallback){
	        this._json('POST',url,data,successCallback,errCallback);
	    }
	}
	return aJax;
})