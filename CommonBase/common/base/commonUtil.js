$.ajaxSetup({cache:false});
/**
 *  @description 表格 公共操作类
 *  @class
 */
var bsTable = {
	/**
	 * @description 默认设置项
	 * @member
	 */
	settings : {
        url : "",
        height: 450,
        sidePagination: "server",
        classes : 'table table-hover table-striped',
        method : 'get',
        undefinedText : '暂无',
        pagination : true,
        cache : false,
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
     * @description 初始化表格
     * @param {String} target 表格ID "#table"
     * @param {Object} [settings] 自定义设置项
     */
    initTable : function(target,settings){
        this.settings = $.extend(true,{},this.settings,settings || {});
        return $(target).bootstrapTable(this.settings);
    },
    /**
     * 
     * @description 刷新Table设置项
     *   可以通过修改配置项来刷新表格，如设置
     * 	 pageSize,更改页面显示条数;
     * 	 url,从服务器中重新加载数据;
     * 	 data 通过数据初始化表格
     * @param {String} target	target 表格ID "#table"
     * @param {Object} options	bootstrapTable设置项
     */
    refreshTableOptions : function(target,options){
    	$(target).bootstrapTable('refreshOptions', options || {});
    },
    /**
     * @description 获取表格数据
     * @param {String} target			target 表格ID "#table"
     * @param {Integer} currentPage		当前页的数据 true / false
     */
    getTableData : function(target,currentPage){
    	return $(target).bootstrapTable('getData', currentPage || false);
    },
    /**
     * @description 表格插入数据
     * @param {String} target 	target 表格ID "#table"
     * @param {Object} options	设置项<br><code>
     *     options = {
     *        index: index,	{Integer}	插入位置
     *        row : row		{Object}	插入数据
     *     }</code>
     */
    insertRow : function(target,options){
    	$(target).bootstrapTable('insertRow', options);
    },
    /**
     * @description 表格移除数据
     * @param {String} target 	target 表格ID "#table"
     * @param {Object} options	设置项<br><code>
     *     options = {
     *        field: id,	{Integer}	标识的字段
     *        values : ids	{Array}		标识值
     *     }</code>
     */
    removeRow : function(target,options){
    	$(target).bootstrapTable('remove', options);
    },
    /**
     * @description 表格行双击事件
     * @param {String} target		表格选择器
     * @param {function} callback	事件回调函数
     */
    onDblClickRow : function(target,callback){
    	$(target).on("dbl-click-row.bs.table",callback)
    },
    /**
     * @description 获取表格记录总数
     * @param {String} target target 表格ID "#table"
     * @returns {number}
     */
    getRowsCount: function(target){
    	return $(target).bootstrapTable('getData').length;
    }
};
