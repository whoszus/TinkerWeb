/**
 * @description eventhandle.js
 * @author skz
 * @date 2016年9月23日
 * @time 下午1:59:00
 */
define(['jquery'],function(){
	return {
		/**
	     * @method
	     * @name stopBubble
	     * @description 阻止事件冒泡
	     * @param {Object} e 事件对象
	     * @example <caption>Usage of stopBubble</caption>
	     * Gsui.eventHandler.stopBubble(e)
	     */
	    stopBubble: function(e){
	        e && e.stopPropagation ? e.stopPropagation()/*W3C*/: window.event.cancelBubble = true/*IE*/;
	    },
	    /**
	     * @method
	     * @name stopDefault
	     * @description 阻止浏览器默认行为
	     * @param {Object} e 事件对象
	     * @returns {Boolean}
	     * @example <caption>Usage of stopDefault</caption>
	     * Gsui.eventHandler.stopDefault(e)
	     */
	    stopDefault: function(e){
	        e && e.preventDefault ? e.preventDefault()/*W3C*/: window.event.returnValue = false/*IE*/;
	        return false;
	    }
	}
})