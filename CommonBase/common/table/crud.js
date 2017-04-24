/**
 * @description crud.js 表格增删改查操作
 * @author skz
 * @date 2016年9月5日
 * @time 上午9:19:47
 */

define(['Gsui','common/table/util'],function(Gsui,util){
	var _dialog = Gsui.dialog,
		table = Gsui.bsTable,
		aJax = Gsui.aJax;
	
	return {
		/**
		 * @description 表格列表
		 * @param {string} target 选择器
		 * @param {string} url 	  表格数据请求url
		 * @param {string} height 表格高度
		 */
		list: function(target,url,height,query){
			var options = {
				url: url,
		        method: 'post',
		        height: height || ($(window).height()-10),
		        sidePagination: 'server',
		        contentType: 'application/x-www-form-urlencoded',
		        classes : 'table table-hover table-condensed'
			};
			if(query){
				options.queryParams = function(params){
					for ( var key in query) {
						params[key] = query[key];
					}
					return params;
				}
			}
			table.initTable(target,options);
			
			/*table.initTable(target,{
		        url: url,
		        method: 'post',
		        height: height || 510,
		        sidePagination: 'server',
		        contentType: 'application/x-www-form-urlencoded',
		        classes : 'table table-hover table-condensed'
		    });*/
		},
		listWithQuery: function(target,url,height,query){
			var options = {
				url: url,
				method: 'post',
		        height: height || ($(window).height()-10),
		        sidePagination: 'server',
		        contentType: 'application/x-www-form-urlencoded',
		        classes : 'table table-hover table-condensed'	
			};
			if(query){
				options.queryParams = function(params){
					for ( var key in query) {
						params[key] = query[key];
					}
					return params;
				}
			}
			bsTable.initTable(target,options);
		},
		/**
		 * @description 添加记录
		 * @param {string} tmplurl 		添加模板页面url
		 * @param {string} url 	  		添加记录操作请求url
		 * @param {object} param 		表单参数
		 * @param {function} callback 	添加成功回调
		 */
		add: function(tmplurl,url,param,callback){
			this._add("添加", tmplurl, url, param, callback);
		},
		/**
		 * @description 编辑记录
		 * @param {string} tmplurl 		编辑模板页面url
		 * @param {string} url 	  		编辑记录操作请求url
		 * @param {object} param 		表单参数
		 * @param {function} callback 	编辑成功回调
		 */
		edit: function(tmplurl, url, param, callback){
			this._add("编辑", tmplurl, url, param, callback);
		},
		/**
		 * @description 删除记录
		 * @param {string} url 	  		删除操作请求url
		 * @param {object} param 		请求参数
		 * @param {function} callback 	删除成功回调
		 */
		del: function(url,param,callback){
			var that = this;
			_dialog.confirm({
				msg: '确定删除？',
				confirmCallBack: function(){
					that._crud(url, param, callback, '删除成功', '删除失败');
				}
			})
		},
		/**
		 * @description 查询记录
		 * @param {string} target 		选择器
		 * @param {string} url 	  		表格数据请求url
		 * @param {object} param 		查询条件
		 */
		search: function(target,url,param){
			util.refresh(target, url, param);
		},
		/**
		 * @private
		 * @description 添加、删除基础操作
		 * @param {string} title 			弹窗标题
		 * @param {string} tmplurl 			模板页面url
		 * @param {string} url 	  			操作请求url
		 * @param {object|function} param 	表单参数
		 * 	function --->  function(id)  
		 * 		args : id of the iframe
		 * 		returns:  object
		 * @param {function} callback 		成功回调
		 */
		_add: function(title,tmplurl,url,param,callback){
			var that = this,
				successText = (title || '添加') + '成功',
				failureText = (title || '添加') + '失败';
			
			_dialog.showModal({
				 id: 'crudBox',
                 title: title || '新增',
                 width: 400,
                 url: tmplurl,
                 button:[{
                     value : '确定',
                     autofocus: true,
                     callback : function() {
                    	param = $.type(param) == 'object' ? param : ( $.type(param) =='function' && param(this.id) );
                    	that._crud(url, param, callback,successText,failureText); 
                     }
                 },{
                     value : '取消',
                     callback : function() {
                         this.close();
                     }
                 }]
			});
		},
		/**
		 * @private
		 * @description 增删改查基础操作
		 * @param {string} url 	  		操作请求url
		 * @param {object} param 		请求参数
		 * @param {function} callback 	成功回调
		 * @param {string} successText 	操作成功提示信息
		 * @param {string} failureText 	操作失败提示信息
		 */
		_crud: function(url,param,callback,successText,failureText){
			aJax.postJSON(url,param,function(res){
				if(res.success){
					_dialog.success(successText || '添加成功');
					callback && callback();
				}else{
					_dialog.error(failureText || '添加失败');
				}
			},
			function(){
				_dialog.error('服务出错');
			})
		}
	};
})
