/**
 * Created by skz on 2016/11/6.
 */
define(['autocompleter'],function () {
    return {
        treeNodesToAutoCompleteSource: function (treeNodes, list) {
            for(var i in treeNodes){
                var treeNode = treeNodes[i];
                if(treeNode.id != -1){
                    list.push({
                        label: treeNode.name,
                        id: treeNode.id,
                        nodeType: treeNode.nodeType
                    })
                }
                treeNode.children.length && this.treeNodesToAutoCompleteSource(treeNode.children,list);
            }
            return list;
        },
        /**
         *
         * @param target        搜索框 ID
         * @param treeNodes     树节点数据
         * @param zTree         树实例
         */
        autoComplete: function (target,treeNodes, zTree) {
            var source  = this.treeNodesToAutoCompleteSource(treeNodes,[]);
            $(target.indexOf('#') != -1 ? target : '#'+target).autocompleter({
                source: source,
                limit: 10,
                customValue: 'label',
                customClass: ['blue'],
                callback: function (label, index, selected) {
                    zTree.getNodesByFilter(function (node) {
                        if(node.id == selected.id && node.nodeType == selected.nodeType){
                            zTree.selectNode(node);
                        }
                    })
                }
            })
        }
    };
});