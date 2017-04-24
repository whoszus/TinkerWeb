/**
 * Created by skz on 2016/11/8.
 */
define(['bootstrapTable'],function () {
    /**
     *
     * @param target      table ID
     * @param settings    table 配置
     * @param initial     true 构建即初始化(默认)，false 手动初始化（调用init()或 list()）
     * @constructor
     */
    function Table(target,settings,initial) {
        this.tableObj = $(target.indexOf('#') != -1 ? target : '#'+target);
        this.settings = $.extend(true,{},this.defaults,settings);
        this.reqUrl = this.settings.url;
        this.elem = this.tableObj;
        this.$bs = this.elem.bootstrapTable;
        if(initial == undefined || initial) this.init();

        this.getTable = function () {
            return this.tableObj;
        }

    }
    Table.prototype = {
      defaults: {
          url : "",
          height: 450,
          classes : 'table table-hover table-condensed',
          method : 'post',
          undefinedText : '暂无',
          pagination : true,
          cache : false,
          sidePagination : 'client',
          //detailView: true,
          contentType: 'application/x-www-form-urlencoded',
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
      _init: function(settings){
    	  return this.handleHook(settings);
      },
      init: function () {
    	  this._init(this.settings);
      },
      list: function (query) {
    	  if(query){
    		  this.settings.queryParams = function(params){
					for ( var key in query) {
						params[key] = query[key];
					}
					return params;
				}
			}
    	  return this._init(this.settings);
      },
      handleHook: function(action,params){
    	  return ( (action && params) ? this.elem.bootstrapTable(action,params) :  this.elem.bootstrapTable(action));
    	  
      },
        /**
         * @description 刷新表格
         * @param {string} url 	  		表格数据请求url
         * @param {object} [param] 		查询条件
         */
      refresh: function (param,url) {
          var args = {};
          param && ( args.query = param );
          url = url ? url : this.reqUrl;
          url && ( args.url = url );
          this.handleHook('refresh',args);
      },
        /**
         * @description 刷新表格数据
         * @param {array} [data] 		表格数据
         */
      refreshOption: function (data) {
          this.handleHook('refreshOptions',data || {});
      },
        /**
         * @description 获取当前页的表格数据
         * @returns {array} [{}]
         */
      getData: function (currentPage) {
          return this.handleHook('getData',currentPage || false) || [];
      },
        /**
         * @description 获取表格记录总数
         * @returns {number}
         */
      getCount: function () {
          return this.getData().length;
      },
        /**
         * @description 获取表格选中的记录
         * @returns {array}
         */
      getSelection: function () {
          return this.handleHook('getSelections');
      },
      getIdSelections: function () {
          return $.map(this.getSelection(), function (row) {
              return row.id;
          });
          /*var ids = [];
          $.each(this.getSelection(),function(index,row){
        	  ids.push(row.id);
          })
          return ids;*/
      },
        /**
         * @description 添加行记录
         * @param {number} index 	记录插入位置
         * @param {object} row 	插入的记录数据
         */
      addRow: function (index, row) {
          this._insertRow(index,row);
      },
        /**
         * @description 表尾添加行记录
         * @param {object} row 	插入的记录数据
         */
      appendRow: function (row) {
          this._insertRow(this.getCount() - 1, row);
      },
        /**
         * @description 表首添加行记录
         * @param {object} row 	插入的记录数据
         */
      prependRow: function (row) {
          this._insertRow(0,row);
      },
        /**
         * @description 更新指定位置的行记录
         * @param {number} index 	记录位置
         * @param {object} row 	记录数据
         */
      updateRow: function (index, row) {
          this._modifyRow(index,row);
      },
        /**
         * @description 更新表首行记录
         * @param {object} row 	记录数据
         */
      updateFirstRow: function (row) {
          this._modifyRow(0,row);
      },
        /**
         * @description 更新表尾行记录
         * @param {object} row 	记录数据
         */
      updateLastRow: function (row) {
          this._modifyRow( this.getCount() - 1 , row);
      },
        /**
         * @description 删除一条行记录
         * @param {number} field 	标识的字段
         * @param {string} value 	标识的字段值
         */
      removeRow: function (field, value) {
          this._removeRow(field,[value]);
      },
        /**
         * @description 删除多条行记录
         * @param {number} field 	标识的字段
         * @param {array} values 	标识的字段值
         */
      removeMultiRow: function (field, values) {
          this._removeRow(field,values);
      },
        /**
         * @description 表尾添加多条行记录
         * @param {array} data [{},{}]		行记录数组
         */
      appendRecords: function (data) {
          this.handleHook('append',data)
      },
        /**
         * @description 表首添加多条行记录
         * @param {array} data [{},{]]		行记录数组
         */
      prependRecords: function (data) {
          this.handleHook('prepend',data);
      },
      check: function (index) {
          this.handleHook('check',index);
      },
      uncheck: function (index) {
          this.handleHook('uncheck',index);
      },
        /**
         *
         * @param field
         * @param values []
         */
      checkBy: function (field,values) {
          this.handleHook('checkBy',{field: field,values: values});
      },
      uncheckBy: function (field,values) {
          this.handleHook('uncheckBy',{field: field,values: values});
      },
      checkById: function (values) {
          this.handleHook('checkBy',{field: 'id',values: values});
      },
      uncheckById: function (values) {
          this.handleHook('uncheckBy',{field: 'id',values: values});
      },
      checkAll: function () {
          this.handleHook('checkAll');
      },
      uncheckAll: function () {
          this.handleHook('uncheckAll');
      },
      showLoading: function () {
          this.handleHook('showLoading');
      },
      hideLoading: function () {
          this.handleHook('hideLoading');
      },
      resetView: function () {

      },
      filterBy: function () {

      },

        /**
         * 显示隐藏的列
         * @param colName  列名（header的名称）
         */
      showColumn: function (colName) {
          this.handleHook('showColumn',colName);
      },
        /**
         * 隐藏列
         * @param colName 列名
         */
      hideColumn: function (colName) {
          this.handleHook('hideColumn',colName);
      },

      _insertRow: function (index, row) {
          this.handleHook('insertRow',{index: index, row: row});
      },
      _modifyRow: function (index, row) {
          this.handleHook('updateRow',{index: index, row: row});
      },
      _removeRow: function (field, values) {
          this.handleHook('remove',{field: field, values: values});
      },

      onClickRow: function (callback) {
          this.elem.on('click-row.bs.table', function (field, value, row, $element) {
              typeof callback == 'function' && callback(field, value, row, $element);
          });
      },
      onDbClickRow: function (callback) {
          this.elem.on('dbl-click-row.bs.table', function (row, $element) {
              typeof callback == 'function' && callback(row,$element);
          });
      },
        /**
         *
         * @param $detail  元素
         * @param cells    字段/列 [key1,key2....]
         * @param rows     数据 [{key1:value},{key2:value}]
         */
      buildSubTable: function ($detail,cells,rows) {
          $detail.bootstrapTable({
            columns: cells,
            data: rows
          });
      },
        /**
         * TODO test
         * @param cells    字段/列 [{field: id,title: 'ID'}]
         * @param rows     数据 [{key1:value},{key2:value}]
         * $.getJSON(url,param,function(result){
         *      var columns = getCells(result);
         *      var rows = result
         *      addSubTable(columns,rows);
         * })
         */
      addSubTable: function (cells,rows) {
          var self = this;
          this.onExpandRow(function ($detail,index, row) {
              self.buildSubTable($detail.html('<table></table>').find('table'),cells,rows);
          });
      },
      createSubTable: function($detail,cells,rows){
    	  this.buildSubTable($detail.html('<table></table>').find('table'),cells,rows);
      },
      onExpandRow: function (callback) {
          this.elem.on('expand-row.bs.table', function (e,index, row, $detail) {
              typeof callback == 'function' && callback(e,index,row,$detail);
          });
      },
      onCollapseRow: function (callback) {
          this.elem.on('collapse-row.bs.table', function (index, row) {
              typeof callback == 'function' && callback(index, row);
          });
      },
        /**
         * 手动设置 rows 信息
         * @param res
         */
      responseHandler: function (res) {
          // rows &  total
      },
      destroy: function(){
    	  this.handleHook('destroy');
      }
    };
    return Table;
});