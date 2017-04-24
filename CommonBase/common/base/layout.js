/**
 * 页面布局
 * @description layout.js
 * @author skz
 * @date 2016年9月2日
 * @time 下午5:58:09
 */
define(['jquery'],function(){
	return {
		initHeight: function(target,nav,extras){
			var winHeight = $(window).height(),
				navHeight = $(nav).outerHeight(true),
				targetHeight = winHeight - navHeight - ( extras || 0 );
			$(target).height(targetHeight);
		}
	}
})