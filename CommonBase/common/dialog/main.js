/**
 * dialog 操作
 * @description main.js
 * @author skz
 * @date 2016年9月5日
 * @time 上午10:43:25
 */

define(['Gsui','common/dialog/util'],function(Gsui,util){
	var _dialog = Gsui.dialog,
		aJax = Gsui.aJax;
	
	return {
		/**
		 * @description 确认删除弹窗
		 * @param {function} callback	确定按钮回调
		 */
		delconfirm: function(callback){
			_dialog.confirm({
				msg: '确定删除？',
				confirmCallBack: callback
			})
		},
		/**
		 * @private
		 * @description 弹窗
		 * @param {string} target			选择器
		 * @param {string} title			弹窗标题
		 * @param {object|string} param		onshow回调参数
		 * @param {function} onshowcb		弹窗展示时回调
		 * @param {function} confirmcb		确定按钮回调
		 */
		_alert: function(target,title,param,onshowcb,confirmcb){
			var that = this,
				artdialog = null,
				$target = $(target);
			
			artdialog = _dialog.showModal({
				 id: 'crudBox',
                 title: title || '新增',
                 width: 400,
                 content: $target,
                 onshow: function(){
                	 $target.show();
 					onshowcb && onshowcb(param);
 				},
 				onclose: function(){
 					$target.hide();
 				}
			});
			this._btn(artdialog, confirmcb);
		},
		/**
		 * @private
		 * @description 弹窗按钮
		 * @param {object} instance		dialog实例对象
		 * @param {function} callback	确定回调
		 */
		_btn: function(instance,callback){
			instance && instance.button([{
                value : '确定',
                autofocus: true,
                callback : function() {
               	 callback && callback();
                }
            },{
                value : '取消',
                callback : function() {
                    this.close();
                }
            }]);
		}
	}
})