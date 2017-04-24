var ocxToolBar = function(id,config){
	
	var html = '<ul style="float:right;height:90%;">';
			html+='<li data-id="one" class="ocxtool_one" title="一分屏"></li>';			
			html+='<li data-id="four" class="ocxtool_four" title="四分屏"></li>';			
			html+='<li data-id="six" class="ocxtool_six" title="六分屏"></li>';			
			html+='<li data-id="nine" class="ocxtool_nine" title="九分屏"></li>';			
			html+='<li data-id="close" class="ocxtool_close" title="关闭"></li>';			
			html+='<li data-id="closeAll" class="ocxtool_closeall" title="全部关闭"></li>';			
	html+="</ul>";
	
	return {
		init : function(){
			$(html).appendTo(id);
			$(id+" ul li").each(function(index){
				$li =$(this);
				$li.click(function(){
					var id = $(this).data("id");
					if(config.clcikCallback){
						config.clcikCallback.call(this,id);
					}
				});
			});
		}
	}
}