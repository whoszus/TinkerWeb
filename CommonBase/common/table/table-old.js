/**
 * @description table.js
 * @author skz
 * @date 2016年9月23日
 * @time 下午2:06:05
 */
define(['jquery','bootstrapTable'],function(){
	var bsTable = {
	    /**
	     * @property settings
	     * @name settings
	     * @type variable
	     * @description 默认设置项
	     * @private
	     */
	    settings : {
	        url : "",
	        height: 450,
	        classes : 'table table-hover table-striped',
	        method : 'get',
	        undefinedText : '暂无',
	        pagination : true,
	        cache : false,
	        sidePagination : 'client',
	        //escape : true,         //显示html标签 data-escape
	        formatLoadingMessage : function() {
	            return '加载中, 请稍等…';
	        },
	        formatShowingRows : function(pageFrom, pageTo, totalRows){
	            return ' 总共 <b class="total-row">' + totalRows + '</b> 条记录';
	        },
	        formatRecordsPerPage : function(pageNumber) {
	            return '每页显示 ' + pageNumber + ' 条';
	        },
	        paginationPreText : "<i class='glyphicon glyphicon-menu-left'></i>",
	        paginationNextText : "<i class='glyphicon glyphicon-menu-right'></i>",
	        queryParams : function(params) {
	            return params;
	        }
	    },
	    /**
	     * @method
	     * @name initTable
	     * @memberof bsTable
	     * @description 初始化表格
	     * @param {String} target 表格ID "#table"
	     * @param {Object} [settings] 自定义设置项
	     */
	    initTable : function(target,settings){
	        this.settings = $.extend({},this.settings,settings || {});
	        return $(target).bootstrapTable(this.settings);
	    },
	    /**
	     * @method
	     * @name refreshOptions
	     * @memberof bsTable
	     * @description 刷新Table设置项
	     *   可以通过修改配置项来刷新表格.如：<br>
	     *   <li>设置pageSize,更改页面显示条数;
	     * 	 <li>url,从服务器中重新加载数据;
	     * 	 <li>data 通过数据初始化表格
	     * @param {String} target	target 表格ID "#table"
	     * @param {Object} options	bootstrapTable设置项
	     * @example <caption>Usage of refreshOptions</caption>
	     * Gsui.bsTable.refreshOptions(target,{
		     *    data: {}      // data of table
		     * });
	     */
	    refreshOptions : function(target,options){
	        $(target).bootstrapTable('refreshOptions', options || {});
	    },
	    /**
	     * @method
	     * @name refresh
	     * @memberof bsTable
	     * @description 刷新Table
	     * @param {String} target	target 表格ID "#table"
	     * @param {Object} options	bootstrapTable设置项
	     * @example <caption>Usage of refresh</caption>
	     * Gsui.bsTable.refresh(target,{
		     *   url: url,      // server url
		     *   query: params  // Object| params for server
		     * });
	     */
	    refresh: function(target,options){
	        $(target).bootstrapTable('refresh', options || {});
	    },
	    /**
	     * @method
	     * @name getData
	     * @memberof bsTable
	     * @description 获取表格数据
	     * @param {String} target			target 表格ID "#table"
	     * @param {Integer} currentPage		当前页的数据 true / false
	     * @example Gsui.bsTable.getData(target,currentPage);
	     */
	    getData : function(target,currentPage){
	        return $(target).bootstrapTable('getData', currentPage || false);
	    },
	    /**
	     * @method
	     * @name insertRow
	     * @memberof bsTable
	     * @description 表格插入数据
	     * @param {String} target 	target 表格ID "#table"
	     * @param {Object} options	设置项<br><code>
	     *     options = {
		     *        index: index,	{Integer}	插入位置
		     *        row : row		{Object}	插入数据
		     *     }</code>
	     * @example Gsui.bsTable.insertRow(target,options);
	     */
	    insertRow : function(target,options){
	        $(target).bootstrapTable('insertRow', options);
	    },
	    /**
	     * @method
	     * @name updateRow
	     * @memberof bsTable
	     * @description 更新表格行数据
	     * @param {String} target 	target 表格ID "#table"
	     * @param {Object} options	设置项<br><code>
	     *     options = {
		     *        index: index,	{Integer}	更新行位置
		     *        row : row		{Object}	更新行数据
		     *     }</code>
	     * @example Gsui.bsTable.updateRow(target,options);
	     */
	    updateRow: function(target,options){
	    	$(target).bootstrapTable('updateRow', options);
	    },
	    /**
	     * @method
	     * @name removeRow
	     * @memberof bsTable
	     * @description 表格移除数据
	     * @param {String} target 	target 表格ID "#table"
	     * @param {Object} options	设置项<br><code>
	     *     options = {
		     *        field: id,	{Integer}	标识的字段
		     *        values : ids	{Array}		标识值
		     *     }</code>
	     * @example Gsui.bsTable.removeRow(target,options);
	     */
	    removeRow : function(target,options){
	        $(target).bootstrapTable('remove', options);
	    },
	    /**
	     * @method
	     * @name append
	     * @memberof bsTable
	     * @description 表尾添加多条行数据
	     * @param {String} target 	target 表格ID "#table"
	     * @param {array} data	行数据<br><code>
	     *     data = [{},{},...]
	     *  </code>
	     * @example Gsui.bsTable.append(target,data);
	     */
	    append: function(target,data){
	    	$(target).bootstrapTable('append', data);
	    },
	    /**
	     * @method
	     * @name prepend
	     * @memberof bsTable
	     * @description 表首添加多条行数据
	     * @param {String} target 	target 表格ID "#table"
	     * @param {array} data	行数据<br><code>
	     *     data = [{},{},...]
	     *  </code>
	     * @example Gsui.bsTable.prepend(target,data);
	     */
	    prepend: function(target,data){
	    	$(target).bootstrapTable('prepend', data);
	    },
	    /**
	     * @method
	     * @name onDblClickRow
	     * @memberof bsTable
	     * @description 表格行双击事件
	     * @param {String} target		表格选择器
	     * @param {function} callback	事件回调函数
	     * @example Gsui.bsTable.onDblClickRow(target,callback);
	     */
	    onDblClickRow : function(target,callback){
	        $(target).on("dbl-click-row.bs.table",callback)
	    },
	    /**
	     * @method
	     * @name getRowsCount
	     * @memberof bsTable
	     * @description 获取表格记录总数
	     * @param {String} target target 表格ID "#table"
	     * @returns {number}
	     * @example Gsui.bsTable.getRowsCount(target);
	     */
	    getRowsCount: function(target){
	        return $(target).bootstrapTable('getData').length;
	    },
	    /**
	     * @method
	     * @name getSelections
	     * @memberof bsTable
	     * @description 获取被选中的表格记录
	     * @param {String} target target target 表格ID "#table"
	     * @returns {Array}
	     * @example Gsui.bsTable.getSelections(target);
	     */
	    getSelections: function(target){
	        /*return $.map($(target).bootstrapTable('getSelections'), function (row) {
	         return row;
	         });*/
	        return $(target).bootstrapTable('getSelections');
	    },
	    /**
	     * @method
	     * @name regCheckBoxEvents
	     * @memberof bsTable
	     * @description checkbox 点击事件
	     * @param target
	     * @param fn
	     * @example Gsui.bsTable.regCheckBoxEvents(target,fn);
	     */
	    regCheckBoxEvents: function(target,fn){
	        $(target).on('check.bs.table uncheck.bs.table ' +
	            'check-all.bs.table uncheck-all.bs.table', function () {
	            fn && fn();
	        });
	    }
	};
	
	return bsTable;
})