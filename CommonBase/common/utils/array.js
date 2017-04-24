/**
 * @description array.js
 * @author skz
 * @date 2016年9月23日
 * @time 下午2:00:35
 */
define(function(){
	return {
		/**
	     * @name sort
	     * @method
	     * @description 数组排序
	     * @example <caption>Usage of sort</caption>
	     * var list = [1,2,4,3,1,4,1,2,7,4,3,8,5,3];
	     *
	     * array.sort(list);
	     *
	     * result: -->  [1,1,1,2,2,3,3,3,4,4,4,5,7,8];
	     * @param {Array} list
	     * @param {String} [order]	asc desc
	     */
	    sort: function(list,order){
	        list.sort(function(a,b){
	            var type = {
	                "asc": a - b,
	                "desc": b - a
	            };
	            return type[(order || 'asc')];
	        })
	    },
	    /**
	     * @name group
	     * @method
	     * @description 对相同元素分组
	     * @example <caption>Usage of group</caption>
	     * var list = [1,2,4,3,1,4,1,2,7,4,3,8,5,3];
	     *
	     * array.group(list);
	     *
	     * result: -->  [[1,1,1],[2,2],[3,3,3],[4,4,4],[5],[7],[8]];
	     * @param {Array} list
	     * @returns {Array}
	     */
	    group: function(list){
	        var sameGroup = [],
	            i = 0,
	            n = 0,
	            len = list.length;
	        this.sort(list);
	        for (; i < len; i++) {
	            if (list[i] != list[i + 1]) {
	                sameGroup.push(list.slice(n, i + 1));
	                n = i + 1;
	            }
	        }
	        return sameGroup;
	    },
	    /**
	     * @method
	     * @name clone
	     * @description 克隆数组
	     * @example <caption>Usage of clone</caption>
	     * <h5>Usage 1</h5>
	     * var list = [1,2,3,4];
	     *
	     * array.clone(list);
	     *
	     * result: -->  [1,2,3,4];
	     * result.length == 4
	     *
	     * <h5>Usage 2</h5>
	     * var list = [];
	     * list['key1'] = 3;
	     * list['key2'] = 4;
	     *
	     * array.clone(list);
	     *
	     * result: -->  ['key1'==>3,'key2'==>4];
	     * result.length == 0
	     *
	     * <h5>Usage 3</h5>
	     * var list = [0,1];
	     * list['key1'] = 3;
	     * list['key2'] = 4;
	     *
	     * Gsui.array.clone(list);
	     *
	     * result: -->  [0,1,'key1'==>3,'key2'==>4];
	     * result.length == 2
	     * @param {Array} list
	     * @returns {*}
	     */
	    clone: function(list){
	        return new Array(list)[0];
	    }
	}
})