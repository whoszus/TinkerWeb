/**
 * @description util.js 表格工具方法
 * @author skz
 * @date 2016年9月5日
 * @time 上午10:42:27
 */

define(['jquery','Gsui'],function($,Gsui){
	var _dialog = Gsui.dialog,
		table = Gsui.bsTable,
		ajax = Gsui.ajax;
	
	return {
		/**
		 * @description 刷新表格
		 * @param {string} target 		选择器
		 * @param {string} url 	  		表格数据请求url
		 * @param {object} [param] 		查询条件
		 */
		refresh: function(target,url,param){
			var args = {};
			url && ( args.url = url );
			param && ( args.query = param );
			
			table.refresh(target, args);
		},
		/**
		 * @description 刷新表格数据
		 * @param {string} target 		选择器
		 * @param {array} [data] 		表格数据
		 */
		refreshOption: function(target,data){
			table.refreshOptions(target,{
				data: data
			})
		},
		/**
		 * @description 获取当前页的表格数据
		 * @param {string} target 	选择器
		 * @returns {array} [{}]
		 */
		getData: function(target){
			return table.getData(target);
		},
		/**
		 * @description 获取表格记录总数
		 * @param {string} target 	选择器
		 * @returns {number}
		 */
		getCount: function(target){
			return table.getRowsCount(target);
		},
		/**
		 * @description 获取表格选中的记录
		 * @param {string} target 	选择器
		 * @returns {array}
		 */
		getSelection: function(target){
			return table.getSelections(target);
		},
		/**
		 * @description 添加行记录
		 * @param {string} target 	选择器
		 * @param {number} index 	记录插入位置
		 * @param {object} data 	插入的记录数据
		 */
		addRow: function(target, index, data){
			this._addRow(target, index, data);
		},
		/**
		 * @description 表尾添加行记录
		 * @param {string} target 	选择器
		 * @param {object} data 	插入的记录数据
		 */
		appendRow: function(target,data){
			var index = this.getCount(target) - 1;
			this._addRow(target, index, data);
		},
		/**
		 * @description 表首添加行记录
		 * @param {string} target 	选择器
		 * @param {object} data 	插入的记录数据
		 */
		prependRow: function(target,data){
			this._addRow(target, 0, data);
		},
		/**
		 * @description 更新指定位置的行记录
		 * @param {string} target 	选择器
		 * @param {number} index 	记录位置
		 * @param {object} data 	记录数据
		 */
		updateRow: function(target, index, data){
			this._updateRow(target, index, data);
		},
		/**
		 * @description 更新表首行记录
		 * @param {string} target 	选择器
		 * @param {object} data 	记录数据
		 */
		updateFirstRow: function(target, data){
			this._updateRow(target, 0, data);
		},
		/**
		 * @description 更新表尾行记录
		 * @param {string} target 	选择器
		 * @param {object} data 	记录数据
		 */
		updateLastRow: function(target, data){
			var index = this.getCount(target) - 1;
			this._updateRow(target, index, data);
		},
		/**
		 * @description 删除一条行记录
		 * @param {string} target 	选择器
		 * @param {number} field 	标识的字段
		 * @param {string} value 	标识的字段值
		 */
		removeRow: function(target,field,value){
			var values = [];
			values.push(value);
			this._removeRow(target, field, values);
		},
		/**
		 * @description 删除多条行记录
		 * @param {string} target 	选择器
		 * @param {number} field 	标识的字段
		 * @param {array} values 	标识的字段值
		 */
		removeMultiRow: function(target,field,values){
			this._removeRow(target, field, values);
		},
		/**
		 * @description 表尾添加多条行记录
		 * @param {string} target 	选择器
		 * @param {array} data 		行记录数组
		 */
		appendRecords: function(target,data){
			table.append(target,data);
		},
		/**
		 * @description 表首添加多条行记录
		 * @param {string} target 	选择器
		 * @param {array} data 		行记录数组
		 */
		prependRecords: function(target,data){
			table.prepend(target,data);
		},
		check: function(){
			
		},
		uncheck: function(){
			
		},
		checkBy: function(){
			
		},
		uncheckBy: function(){
			
		},
		checkAll: function(){
			
		},
		uncheckAll: function(){
			
		},
		resetView: function(){
			
		},
		filterBy: function(){
			
		},
		addSubTable: function(){
			
		},
		/**
		 * @private
		 * @description 添加行记录
		 * @param {string} target 	选择器
		 * @param {number} index 	记录插入位置
		 * @param {object} data 	插入的记录数据
		 */
		_addRow: function(target,index,data){
			var options = {};
			options.index = index;
			options.row = data;
			table.insertRow(target,options);
		},
		/**
		 * @private
		 * @description 更新行记录
		 * @param {string} target 	选择器
		 * @param {number} index 	记录位置
		 * @param {object} data 	更新的记录数据
		 */
		_updateRow: function(target,index,data){
			var options = {};
			options.index = index;
			options.row = data;
			table.updateRow(target,options);
		},
		/**
		 * @private
		 * @description 删除行记录
		 * @param {string} target 	选择器
		 * @param {number} field 	标识的字段
		 * @param {array} data 		标识的字段值
		 */
		_removeRow: function(target,field,values){
			var options = {};
			options.field = field;
			options.values = values;
			table.removeRow(target,options);
		}
	}
})