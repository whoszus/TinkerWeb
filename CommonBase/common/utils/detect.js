/**
 * @description detect.js
 * @author skz
 * @date 2016年9月23日
 * @time 下午2:03:34
 */
define(function(){
	return {
		/**
	     * @name IE
	     * @method
	     * @description 是否IE
	     * @returns {boolean}
	     * @example <caption>Usage of IE</caption>
	     * detect.IE()
	     */
	    IE: function(){
	        return (!!window.ActiveXObject || "ActiveXObject" in window);
	    },
	    /**
	     * @name islt
	     * @method
	     * @description IE版本是否低于ver
	     * @param {number} ver IE版本（10,11）
	     * @returns {boolean}
	     * @example <caption>Usage of islt</caption>
	     * detect.islt(9)
	     */
	    islt: function(ver){
	        var ua = navigator.userAgent,
	            isIE = ua.indexOf('MSIE') > -1,
	            v = isIE ? /\d+/.exec(ua.split(';')[1]) : 0;
	        return !isIE ? false : parseInt(v) < ver;
	    }
	}
})