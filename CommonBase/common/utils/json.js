/**
 * @description json.js
 * @author skz
 * @date 2016年9月23日
 * @time 下午2:02:13
 */
define(function(){
	return {
		/**
	     * @name stringify
	     * @method
	     * @description 处理IE8下 JSON.stringify(data), data 包含中文时出现乱码的问题
	     * @param {String} data
	     * @returns {string}
	     * @example <caption>Usage of stringify</caption>
	     * JSON.stringify('{"a": "abs"}')
	     */
	    stringify: function(data){
	        var objStr = '';
	        if(Gsui.detect.ieLessThan(9)){
	            eval("objStr = '" + JSON.stringify(data) + "';");
	        }else{
	            objStr = JSON.stringify(data);
	        }
	        return objStr;
	    },
	    /**
	     * @name isJsonStr
	     * @method
	     * @description 是否JSON格式字符串
	     * @param {String} str
	     * @returns {boolean}
	     * @example <caption>Usage of isJsonStr</caption>
	     * JSON.isJsonStr('{"a": "abs"}')
	     */
	    isJsonStr: function(str){
	        try{
	            JSON.parse(str);
	        }catch(e){
	            return false;
	        }
	        return true;
	    }
	}
})