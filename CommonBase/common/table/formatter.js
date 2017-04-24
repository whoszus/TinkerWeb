/**
 * @description formatter.js
 * @author skz
 * @date 2016年9月6日
 * @time 上午10:51:28
 */
define(function(require,exports){
	return{
		// 通用表格操作Formatter
		handleMenuFormatHook: function(){
			return handleMenuFormat = function (value,row,index){
				return [
			        '<a class="edit icons-edit" href="javascript:void(0)" title="编辑">',
			        '</a>  ',
			        '<a class="del icons-trash" href="javascript:void(0)" title="删除"> ',
			        '</a>'
			    ].join('');
			}
		},
		//法案法规 审核状态 Formatter
		lawslibReviewStatusFormatHook: function(){
			return reviewStatusFormat = function (value,row,index){
				return value == 1 ? '已审核' : '未审核';
			}
		}
	};
})