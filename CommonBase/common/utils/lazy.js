/**
 * @description lazy.js
 * @author skz
 * @date 2016年9月21日
 * @time 下午8:01:30
 */
define(function(){
	function LoadImage(opts){
		this.defaults = $.extend(true,{},{
			url: '',
			errorUrl: '',
			before: function(){},
			success: function(){},
	        error: function(){}
		},opts);
		this._createImg= function(){
	    	var img = new Image();
	    	//img.src = this.defaults.url;
	    	return img;
		};
		this._onload= function(img){
			var that = this;
			
			img.onload = function(){
				img.onload = img.onerror = null;
				that.defaults.success && that.defaults.success();
	            img = null;
			}
			img.src = this.defaults.url;// + "?_=" + new Date().getTime();
			
	    };
		this._before= function(){
			this.defaults.before && this.defaults.before();
		};
		this._onerror= function(img){
			var that = this;
			img.onerror = function(){
				img.onload = img.onerror = null;
	    		that.defaults.error && that.defaults.error();
	            img = null;
			}
	    };
		this.loadImage= function(){
			var img = this._createImg();
			this._before();
			try {
				this._onload(img);
			} catch (e) {
				this._onerror(img);
			}
			this._onerror(img);
			img = null;
		}
	};
	
	function lazyLoad(imgSrc,target,wrapTarget){
		var that = this;
		new LoadImage({
			url: imgSrc,
			before: function(){
				//var url = contextPath + '/content/images/default.jpg';///content/images/common/loading.gif
				//$(target).attr('src',url);
			},
			success: function(){
				 $(target).attr('src',imgSrc);
			},
			error: function(){
				//$(target).attr('src',contextPath + '/content/images/default.jpg');
				//$(target).closest(wrapTarget || '.magContainer').attr('data-error',true);
			}
		}).loadImage();
	}
	return lazyLoad;
})
