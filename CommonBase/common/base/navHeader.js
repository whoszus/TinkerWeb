/**
 * @author skz
 * 2016年11月15日上午9:31:18
 */
define(['jquery'],function(){
	var navHeader = {
		shareframe: false,			// 是否共享iframe标志
		//homerefresh: true,			// 首页是否刷新
		$lis: $('li','#nav-menu'),	// 导航项
		$nav: $('#nav-menu'),		// 导航条
		$wrap: $('.section'),		// 页面容器（存放iframe）
		$hometgt: $('#home'),	// 首页选择器
		$commtgt: $('#common'),		// 公用选择器
		prefix: 'HF_',				// id 前缀
		frameCls: '.iframe',		// iframe 类名
		path: Constants.CONTEXT_PATH,
		
		/**
		 * 入口
		 */
		launch: function(){
			this.initTab();
			this.observeRefresh();
			this.checkAlert();
		},
		/**
		 * 是否支持Storage
		 * @param type storage类型
		 */
		storageAvailable: function(type){
			try {
		        var storage = window[type],
		            x = '__storage_test__';
		        storage.setItem(x, x);
		        storage.removeItem(x);
		        return true;
		    }catch(e) {
		        return false;
		    }
		},
		/**
		 * 导航高亮
		 * @param index
		 */
		navHighlihgt: function(index){
			this.$lis.eq(index).addClass('active').siblings('li').removeClass('active');
		},
		/**
		 * 显示tab和list
		 * @param index
		 * @param url
		 */
		showPage: function(index,url){
			var $lis = this.$lis,
				absurl = null;
			
			index = index ? index : 0;
			url = url ? url : $($lis[index]).data('url');
			absurl = this.path + url;
			
			// 导航高亮
			this.navHighlihgt(index);
			
			/*if(index == 0 ){//&& !this.homerefresh
				//非首页刷新,重新加载首页
				if(sessionStorage.getItem("refresh") == "1"){ 
					this.$hometgt.attr('src', absurl);
					sessionStorage.setItem("refresh", 0);
				}
				this.$hometgt.show().siblings(this.frameCls).hide();
				
			}else if(!this.shareframe){// 不共享iframe
				// 获取或生成 iframe 的 id
				var id = url ? url.substring( url.indexOf("/") + 1, url.lastIndexOf("/") ) 
						: this.prefix + parseInt(Math.random()*100);
				
				//没有相关iframe,则创建
				if(!this.existframe(id)){
					var iframe = this.createframe(id);
					iframe.attr("src",absurl);
					this.appendframe(iframe);
				}
				$("#" + id).show().siblings(this.frameCls).hide();
			}else{
				this.$commtgt.attr("src",absurl).show().siblings(this.frameCls).hide();
			}*/
			this.$commtgt.attr("src",absurl).show().siblings(this.frameCls).hide();
		},
		/**
		 * 初始化tab
		 */
		initTab: function(){
			//浏览器不支持storage
			if (!this.storageAvailable('sessionStorage')) return ;
			
			//this.showPrePage();
			this.bindTab();
		},
		/**
		 * 非第一次，则显示最近点击的tab
		 */
		showPrePage: function(){
			// 获取上次点击的 tab 下标 & url
			var preTab = sessionStorage.getItem("tabbed"),
				preUrl = sessionStorage.getItem("url"),
				$lis = this.$lis,
				that = this;
			
			$lis.each(function(index){
				index == preTab && that.showPage(index, preUrl);
			})
		},
		/**
		 * 绑定tab点击事件
		 */
		bindTab: function(){
			var $lis = this.$lis,
				that = this;
			
			$lis.click(function(){
				var $li = $(this),
					index = $li.index();
				try{
					var theDialog = window.frames["common"].window.frames["mainIframeId"].window.frames["dialogIframeId"];
//					var ff = theDialog.window.frames["getFeatureFrame"]
					var bf = theDialog.window.frames["bodyCheckFrame"];
					var pf = theDialog.window.frames["personalEffectsFrame"];
//					debugger
					try{bf.collectOcx.exit();}catch(e){}
					try{pf.collectOcx.exit();}catch(e){}
//					try{ff.collectOcx.exit();}catch(e){}
					
				}catch(e){}
				// 显示页面
				that.showPage(index);
				// 记录点击 li 下标 及其 url
				//sessionStorage.setItem("tabbed",index);
	            //sessionStorage.setItem("url",$li.data("url"));
			})
		},
		/**
		 * 是否存在指定的Iframe
		 * @param id
		 */
		existframe: function(id){
			var frame = $(this.frameCls),
				flag = false;
			
			$.each(frame,function(idx,iframe){
				if($(iframe).attr("id") == id){
					flag = true;
					return false;
				}
			})
			return flag;
		},
		/**
		 * 移除iframe
		 * @param id
		 */
		removeframe: function(id){
			$("iframe[id='"+id+"']").remove();
		},
		/**
		 * 创建iframe
		 * @param id
		 * @returns
		 */
		createframe: function(id){
			return $('<iframe class="iframe" frameborder="0">').attr("id",id);
		},
		/**
		 * 添加到容器
		 * @param iframe
		 */
		appendframe: function(iframe){
			this.$wrap.append(iframe);
		},
		/**
		 * 监听页面刷新操作
		 */
		observeRefresh: function(){
			window.onunload = function() { 
				sessionStorage.setItem("refresh", 1);
			 }
		},
		checkAlert:function(){
/*			window.setInterval(function(){
				$.ajax({
					url:"/cmt/caseArea/showAlert.action",
					dataType:"JSON",
					type:"POST",
					success:function(data){
						if(data.success){
							$("#alertGif").show();
						}else{
							$("#alertGif").hide();
						}
					},error:function(data){
						
					}
				})
			}, 300000);*/
			
		}
	};
	
	return navHeader;
})