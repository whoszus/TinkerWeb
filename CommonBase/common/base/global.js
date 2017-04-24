/**
 * 全局变量
 * @author skz
 * @date 2016年7月19日
 * @time 下午7:35:04
 */
define(function(){
	return {
		// 组织树配置
		orgTree: {
			view : {
				selectedMulti : false,
				showIcon : true,
				dblClickExpand: true,
				showLine: true//,
				//addHoverDom: null,
		        //removeHoverDom: null
			},
			data : {
				simpleData : {
					enable : true
				}
			},
			/*edit: {
	            //enable: true,
	           // removeTitle: "删除",
	           // renameTitle: "修改",
	           // editNameSelectAll: true
	        },*/
			callback : {
				onClick : null,
				onDblClick : null,
				onRightClick: null//,
				//beforeRemove: null,
	           // onRename: null
			}
		}
	}
})