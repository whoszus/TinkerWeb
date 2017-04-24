/**
 * 导航高亮
 * @author skz
 * @date 2016年7月11日
 * @time 下午3:27:24
 */
define(['jquery'],function(){
	
	return {
		init: function(){
			var href = window.location.href;
			var lis = $('li','.navbar-nav:not(.navbar-right)');
			
			lis.each(function(index,elem,obj){
				var _item = $(this).find('a').attr("href");
				href.lastIndexOf(_item) != -1  ? $(this).addClass('active').siblings('li').removeClass('active') : $(this).removeClass('active');
			});
		}
	}
	
})