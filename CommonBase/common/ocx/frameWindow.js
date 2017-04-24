/**
 * gmsg.js 消息提示框
 * @param 看下的settings设置
 * @return 用户设置参数和消息框实例
 * @author liuxg
 */
(function(jQuery) {
$.fWin = function(options){
   
   var settings = initSettings(options);
   var instance =  newWin();
   if(settings.afterRender && typeof settings.afterRender == "function"){
   		settings.afterRender.call(settings,instance);
   }
	
   /**
    * 新建一个实例
    */
   function newWin(){
   		var win =  $('<div class="fwn-window" style="width:'+settings.width+'px;height:'+settings.height+'px;"></div>');
   		setTitle(win);
   		setBody(win);
   		setFooter(win);
   		if(settings.maskLayer) {
   			if(settings.modal){
   				var iframeHtml = "<div src='about:blank' style=\"border:0;position:fixed; visibility:inherit; top:0px; left:0px;  height:100%;width:100%; z-index:1000; background-color:#ccc;filter:alpha(opacity=50);opacity:0.5;filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0.5,filter:alpha(opacity=50))'\"/>";
				win.modalMask = $(iframeHtml).appendTo($('body'));
   			}
			var iframeHtml = "<iframe src='about:blank' style=\"border:0;position:fixed; visibility:inherit; top:0px; left:0px;  height:100%;width:100%; z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'\"/>";
			$(win).append(iframeHtml);
		}
		$(win).appendTo($("body"));
		var left = ($(window).outerWidth() - win.outerWidth()) / 2 + "px" ;
		/*var top = ($(window).outerHeight() - win.outerHeight()) * 0.382 + "px";*/
		var top = ($(window).height() - win.height())/2 + "px";
		win.css("left" , left).css("top" ,top);
		return win;
   }
   
   function setTitle(win){
   	if(settings.showTitle){
   		var str = '<div class="fwn-title" style="height:'+settings.titleHeight+'px;line-height:'+settings.titleHeight+'px;"><span style="float:left;margin-left:10px;" class="name">'+settings.title+'</span></div>';
   		var title = $(str).appendTo(win);
   		if(settings.canClose){
   			var closeBtn = '<span class="fwn-close" title="关闭"></span>';
   			var btn = $(closeBtn).appendTo(title);
   			btn.click(function(){
   				if(settings.closeModel == 'hide'){
   					hideWin(win);
   				}else{
   					closeWin(win);
   				}
   			});
   		}
   		var move =false;
   		var _x =0;
   		var _y =0;
   		$(title).mousedown(function(e){ 
   			if(e.target.className=="fwn-close"	|| e.target.className== "name"){
   				return;
   			}
			move=true; 
			_x=e.pageX-parseInt($(win).css("left")); 
			_y=e.pageY-parseInt($(win).css("top")); 
		});
   		$(document).mousemove(function(e){ 
			if(move){ 
				var x=e.pageX-_x;//控件左上角到屏幕左上角的相对位置 
				var y=e.pageY-_y;
				if(x < 0 || y<0 || x+$(win).width() > $('body').width() || y+$(win).height() >$('body').height()){
					return;
				}
				$(win).css({"top":y,"left":x}); 
			} 
			}).mouseup(function(){ 
			move=false; 
		}).mouseout(function(){ 
//			move=false; 
		}); 
   	}
   }
   
   function setTile(title){
   		$(this.instance).find(".fwn-title .name").html(title);
   }
   
   function setBody(win){
   		var body = '<div class="fwn-body" style="height:'+settings.bodyHeight+'px">'+settings.contentHtml+'</div>';
   		win.bodyNode = $(body).appendTo(win);
   }

   function setFooter(win){
   		if(settings.needFooter){
	   		var footer = '<div class="fwn-footer" style="height:'+settings.footerHeight+'px;"></div>';
	   		footer = $(footer).appendTo(win);
	   		if(settings.buttons){
	   			for(var i=0;i<settings.buttons.length;i++){
					  var b = $('<button class="btn btn-primary fw-btn" ><span style="text-align:center;">'+settings.buttons[i].text+'</span></button>');
					  b.appendTo(footer);
					  if(settings.buttons[i].callback){
					  	var cb = settings.buttons[i].callback;
					  	b.on("click",cb);
					  }
	   			}
	   		}
   		}
   }
   
   function initSettings(){
   		var settings = {
   		 "canClose" :true,
         "showTitle" :  true ,  //是否显示标题
		 "title" : "标题",                //标题，不传默认不显示标题栏
		 "contentHtml" : "",               //消息内容
		 "maskLayer" : true ,                 //显示遮罩层
	 	 "titleHeight" : 30,
	 	 "footerHeight" :40,
	 	 "height" : 100,
	 	 "width" : 150,
	 	 "needFooter" : true,
	 	 "closeModel" : 'hide'
	  }
	  for(o in options){
	  	settings[o] = options[o];
	  }
	  settings.bodyHeight = settings.height;
	  if(settings.showTitle){
	  	 settings.bodyHeight =  settings.bodyHeight- settings.titleHeight;
	  }
	  if(settings.needFooter){
	  	 settings.bodyHeight =  settings.bodyHeight- settings.footerHeight;
	  }
	  if(settings.bodyHeight < 0){
	  	settings.bodyHeight = 0;
	  }
	  $.extend(settings,options);
	  return settings ;
   }
   
   function showWin(win,callback){
	  /* $("body").css("overflow-y","hidden");*/
   		if(settings.modal && win.modalMask){
   			win.modalMask.show();
   		}
   		$(win).fadeIn(100,function(){
   			if(settings.afterShow && typeof settings.afterShow == "function"){
			   	settings.afterShow.call(settings,instance);
			}
			
   			if(callback && typeof callback == "function"){
			   	callback.call(settings,instance);
			}
			
   		});
   }
   
   function hideWin(win){
	  /* $("body").css("overflow-y","auto");*/
   		if(settings.onBeforeHide && typeof settings.onBeforeHide == "function"){
   			if(settings.onBeforeHide.call(settings,instance) == false){
   				return ;
   			}   		
   		}
   		if(settings.modal && win.modalMask){
   			win.modalMask.hide();
   		}
   		$(win).fadeOut(100,function(){
   			if(settings.afterHide && typeof settings.afterHide == "function"){
			   	settings.afterHide.call(settings,instance);
			}
   		});
//   		$(win).hide(100,function(){
//			if(settings.afterHide && typeof settings.afterHide == "function"){
//		   	settings.afterHide.call(settings,instance);
//		}
//		});
   }
   
   function closeWin(win){
   		if(settings.onClose && typeof settings.onClose == "function"){
   			if(settings.onClose.call(settings,instance) == false){
   				return ;
   			}   		
   		}
   		if(settings.modal && win.modalMask){
   			win.modalMask.remove();
   		}
   		$(win).remove();
   		/*$("body").css("overflow-y","auto");*/
   		
   }
   
   return {   
	    "settings" :  settings ,
        "instance" : instance ,
        "setTile" : setTile,
		"show" : function(callback){    //打开窗口
			showWin(instance,callback);
		},
		"hide" : function(){   //关闭窗口
		    hideWin(instance);
		},
		"close" : function(){
			closeWin(instance);
		}
   }
 
}



})(jQuery)
 
