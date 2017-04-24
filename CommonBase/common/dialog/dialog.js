/**
 * artDialog 封装的操作
 * TODO test
 * @description dialog.js
 * @author skz
 * @date 2016年9月23日
 * @time 下午1:45:53
 */
define(['jquery','artDialog'],function(){
	/**
	 * @description artDialog
	 * @class
	 * @name dialog
	 */
	var _dialog = {
		/**
	     * @property defaults
	     * @name defaultOptions
	     * @memberof dialog
	     * @description 默认配置项
	     * @type {Object}
	     * @private
	     */
	    defaultOptions : {
	        id : '_artbox_id',
	        title : '提示框',
	        width : $(window).width() / 4 * 2,
	        cancelValue: '关闭',
	        onshow : function(){
	        	_dialog.createBgFrame(this.id);
	        },
	        onclose : function(){
	        	_dialog.hasBgFrame(this.id) && _dialog.removeBgFrame(this.id);
	        },
	        oniframeload: function(){

	        }
	    },
	    /**
	     * @description 显示弹窗前的回调
	     * @private
	     */
	    onshowcb: function(){
	        this.createBgFrame(this.id);
	    },
	    /**
	     * @description 关闭弹窗前的回调
	     * @private
	     */
	    onclosecb: function(){
	        this.hasBgFrame(this.id) && this.removeBgFrame(this.id);
	    },
	    /**
	     * @private
	     * @property style
	     * @name alertStyle
	     * @memberof dialog
	     * @description 弹窗样式
	     */
	    alertStyle : {
	        $alert : $("<div class='sweet-alert'>"),
	        $text : $('<p class="sa-tips">').text("操作提示"),
	        $success : $('<div class="sa-icon sa-success">'),
	        $warning : $('<div class="sa-icon sa-warn">'),
	        $error : $('<div class="sa-icon sa-error">'),
	        $info: $('<div class="sa-icon sa-info">')
	    },
	    /**
	     * @description 创建iframe
	     * @param id
	     * @private
	     */
	    createBgFrame: function(id){
	    	var iframeHtml = "<iframe src='about:blank' style=\"position:absolute; visibility:inherit; top:0px; left:0px;border:none;padding:0;margin:0;  height:100%;width:100%; z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'\"/>";
	        $(".ui-dialog").append(iframeHtml);
	    },
	    /**
	     * @description 是否包含iframe
	     * @private
	     */
	    hasBgFrame: function(id){
	    	var iframes = $("iframe[name='"+id+"']"),
            	len = iframes.length;
	    	return len > 0;
	    },
	    /**
	     * @private
	     * @description 移除iframe
	     * @param {String} id   元素ID
	     */
	    removeBgFrame: function(id){
	    	 $("iframe[name='"+id+"']").remove();
	    },

	    /**
	     * @name _getInstance
	     * @memberof dialog
	     * @description 获取弹窗对象
	     * @name getInstance
	     * @param {Object} options artDialog配置项
	     * @returns {*}
	     * @private
	     */
	    _getInstance: function(options){
	        var opt = $.extend(true,{},this.defaultOptions,options),
	            that = this;

	        options.onshow && (opt.onshow = function(){
	            that.onshowcb();
	            options.onshow();
	        });

	        options.onclose && (opt.onclose = function(){
	            that.onclosecb();
	            options.onclose();
	        });

	        this.hasBgFrame(opt.id) && this.removeBgFrame(opt.id);
	        return dialog(opt);
	    },
	    /**
	     * @method
	     * @name showModal
	     * @memberof dialog
	     * @description 包含钟罩层的模型弹窗框
	     * @example <caption>Usage of showModal</caption>
	     * Gsui.dialog.showModal({
			 *		id : id,
			 *		title : '车辆详情',
			 *		url : your url,
			 *		data : your data
			 *	})
	     * @param {Object} options artDialog 配置项
	     * @returns {Object} artDialog 实例对象
	     */
	    showModal : function(options){
	        return this._getInstance(options).showModal();
	    },
	    /**
	     * @method
	     * @name showOcxModal
	     * @memberof dialog
	     * @description 包含钟罩层的模型弹窗框(针对OCX)
	     * @example <caption>Usage of showOcxModal</caption>
	     * Gsui.dialog.showOcxModal({
			 *		id : id,
			 *		title : '车辆详情',
			 *		url : your url,
			 *		data : your data
			 *	})
	     * @param {Object} options artDialog 配置项
	     * @returns {Object|*} artDialog 实例对象
	     */
	    showOcxModal: function(options){
	        options.onshow = function(){
	            var iframeHtml = "<iframe src='about:blank' style='position:absolute; visibility:inherit; top:0px; left:0px;border:none;padding:0;margin:0;  height:100%;width:100%; z-index:-1;'/>";
	            $('.ui-popup-backdrop').append(iframeHtml);

	            options.onshow();
	        };
	        return this._getInstance(options).showModal();
	    },
	    /**
	     * @method
	     * @name showDialog
	     * @memberof dialog
	     * @description 不包含钟罩层的模型弹窗框
	     * @example <caption>Usage of showDialog</caption>
	     * Gsui.dialog.showDialog({
			 *		id : id,
			 *		title : '车辆详情',
			 *		url : your url,
			 *		data : your data
			 *	})
	     * @param {Object} options artDialog 配置项
	     * @returns {Object} artDialog 实例对象
	     */
	    showDialog : function(options){
	        return this._getInstance(options).show(options.anchor);
	    },
	    /**
	     * @method
	     * @name confirm
	     * @memberof dialog
	     * @description 确认弹窗框
	     * @param {Object} options 配置项
	     * @param {String} options.msg 提示信息
	     * @param {function} options.confirmCallBack 确认回调
	     * @param {function} options.cancelCallBack  取消回调
	     * @returns {Object} artDialog 实例对象
	     * @example <caption>Usage of confirm</caption>
	     * Gsui.dialog.confirm({
			 *		msg : '确定？',
			 *		confirmCallBack : confirmCallBack,
			 *		cancelCallBack : cancelCallBack
			 *	})
	     */
	    confirm : function(options){
	        var confirmDialog,
	            msg = options.msg,
	            confirmCallBack = options.confirmCallBack,
	            cancelCallBack = options.cancelCallBack,
	            dialogContent = this._getAlertContent("info",msg).prop("outerHTML"),
	            setting = $.extend(true,{
	                content: dialogContent,
	                width: 410
	            },options || {});

	        confirmDialog = this.showDialog(setting);

	        confirmDialog.button([{//按钮操作
	            value : '确定',
	            autofocus: true,
	            callback : function() {
	                confirmCallBack && confirmCallBack();
	            }
	        },{
	            value : '取消',
	            callback : function() {
	                cancelCallBack && cancelCallBack();
	            }
	        }]);
	        return confirmDialog;
	    },
	    /**
	     * @method
	     * @name closeDialog
	     * @memberof dialog
	     * @description 删除dialog
	     * @param {Object} dialogObj
	     */
	    closeDialog : function(dialogObj){
	        dialogObj && dialogObj.close().remove();
	    },
	    /**
	     * @method
	     * @name getAlertContent
	     * @memberof dialog
	     * @description 获取弹框样式 HTML 内容 的jQuery对象
	     * @param {String} [type] 弹框类型
	     * @param {String} [msg]  描述信息
	     * @returns {*}
	     * @private
	     */
	    _getAlertContent : function(type,msg){
	        var htmlMap = {
	            "success": this.alertStyle.$success,
	            "error": this.alertStyle.$error,
	            "warning": this.alertStyle.$warning,
	            'info': this.alertStyle.$info
	        };
	        type === 'info' ? this.alertStyle.$alert.addClass('sa-confirm') :  this.alertStyle.$alert.removeClass('sa-confirm');
	        this.alertStyle.$alert.empty();
	        this.alertStyle.$alert.append(htmlMap[type]);
	        this.alertStyle.$alert.append(this.alertStyle.$text.html(msg));
	        return this.alertStyle.$alert;
	    },
	    /**
	     * @method
	     * @name success
	     * @memberof dialog
	     * @description 成功弹出框
	     * @param {String} [msg]	提示信息	 默认"操作成功"
	     * @param {Integer} [time]  弹框消失时间 默认1500
	     * @example <caption>Usage of success</caption>
	     * Gsui.dialog.success({
			 *		msg : '操作成功',
			 *		time : 1500
			 *	})
	     */
	    success : function (msg,time){
	        var self = this;
	        this.alert(msg, time, {
	            content : self._getAlertContent("success",msg).prop("outerHTML")
	        });
	    },
	    /**
	     * @method
	     * @name error
	     * @memberof dialog
	     * @description 失败弹出框
	     * @param {String} [msg]	提示信息	 默认"操作成功"
	     * @param {Integer} [time]  弹框消失时间 默认1500
	     * @example <caption>Usage of error</caption>
	     * Gsui.dialog.error({
			 *		msg : '操作失败',
			 *		time : 1500
			 *	})
	     */
	    error : function (msg,time){
	        var self = this;
	        this.alert(msg, time, {
	            content : self._getAlertContent("error",msg).prop("outerHTML")
	        });
	    },
	    /**
	     * @method
	     * @name warning
	     * @memberof dialog
	     * @description 警示弹出框
	     * @param {String} [msg]	提示信息	 默认"操作成功"
	     * @param {Integer} [time]  弹框消失时间 默认1500
	     * @example <caption>Usage of warning</caption>
	     * Gsui.dialog.warning({
			 *		msg : '警示',
			 *		time : 1500
			 *	})
	     */
	    warning: function(msg,time){
	        var self = this;
	        this.alert(msg, time, {
	            content : self._getAlertContent("warning",msg).prop("outerHTML")
	        });
	    },
	    /**
	     * @method
	     * @name alert
	     * @memberof dialog
	     * @description artDialog 的 Base 提示框
	     * @param {String} [msg]	提示信息	 默认"操作成功"
	     * @param {Integer} [time]  弹框消失时间 默认1500
	     * @param {Object} [options]  弹框配置项
	     * @example <caption>Usage of alert</caption>
	     * Gsui.dialog.alert({
			 *		msg : '提示',
			 *		time : 1500
			 *	})
	     */
	    alert : function(msg,time,options){
	        var self = this,
	            dialog,
	            opt = $.extend(true,{
	                id: "alert",
	                title : false,
	                width : 'initial',
	                content : self._getAlertContent("",msg).prop("outerHTML"),
	                onshow: function(){
	                    $('.ui-dialog-content').addClass('ui-dialog-content-spec');
	                }
	            },options  || {});

	        dialog = this.showDialog(opt);
	        setTimeout(function() {
	            self.closeDialog(dialog);
	        }, time || 1500);
	    },
	    /**
	     * @method
	     * @name download
	     * @memberof dialog
	     * @description 控件下载弹框
	     * @param {String} msg	描述信息
	     * @param {String} url	下载链接
	     */
	    download : function(msg,url){
	        var self = this;
	        url || this.warning('url 不能为空!');
	        this.showDialog({
	            title: '提示',
	            width: 'inherit',
	            content : self._getAlertContent("",msg || '下载?').prop("outerHTML"),
	            button : [  {
	                value : '确定',
	                autofocus: true,
	                callback : function() {dialog({url : url});}
	            },{
	                value : '取消',
	                callback : function() {this.close();}
	            }]
	        })
	    }
	}
	return _dialog;
	
})