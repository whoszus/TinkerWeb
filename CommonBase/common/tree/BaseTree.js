/**
 * Created by SKZ on 2016/11/14.
 */
define(['ztree'],function () {

    /**
     * @param target     DOM容器 ID
     * @param url
     * @param setting
     * @constructor
     */
    function BaseTree(target,url,setting,initial){
        this.target = $(target.indexOf('#') != -1 ? target : '#'+target);
        this.url = url;
        this.setting = $.extend(true,this.config,setting);
        this.oTree = null;
        if(initial == undefined || initial) this.initial();
    }

    BaseTree.prototype = {
        config: {
            view : {
                selectedMulti : true,
                showIcon : true,
                dblClickExpand: true,
                showLine: true
            },
            data : {
                simpleData : {
                    enable : true
                }
            },
            callback : {
                onClick : null,
                onDblClick : null,
                onRightClick: null
            }
        },
        initial: function (callback) {
            var self = this;
            $.getJSON(this.url, function (zNodes) {
                // TODO delete
                //zNodes = zNodes.zNodes;
                self.oTree = $.fn.zTree.init(self.target,self.setting,zNodes);
                callback && callback(zNodes,self.oTree);
            });
        },
        refresh: function () {
            this.oTree.refresh();
        },

        /**
         * 是否父节点
         * @returns {*}
         */
        isParentNode: function () {
            var zNode;
            if(!this.oTree) return false;
            zNode = this.getSelectedNode();
            return zNode ? zNode.isParent : false;
        },
        /**
         * 是否子节点
         * @returns {boolean}
         */
        isChildNode: function () {
            var zNode;
            if(!this.oTree) return false;
            zNode = this.getSelectedNode();
            return zNode ? !zNode.isParent : false;
        },
        /**
         * 是否包含子节点
         * @param node
         * @returns {*|Function|HTMLElement[]|boolean}
         */
        hasChildren: function (node) {
            var zNode = node || this.getSelectedNode();
            return !!(zNode && zNode.children && zNode.children.length > 0);
        },
        /**
         * 给定节点是否为第一个节点（相对其父级目录）
         * 选中节点是否为第一个节点
         * @param node
         * @returns {*|isFirstNode}
         */
        isFirstNode: function (node) {
            var zNode = node || this.getSelectedNode();
            return (zNode && zNode.isFirstNode);
        },
        /**
         * 是否重复
         * @param key
         * @param value
         * @param node
         * @returns {*|boolean}
         */
        hasRepeated: function (key, value, node) {
            var targetNode = this.getNodeByFilter(key,value,node);
            return (targetNode && !$.isEmptyObject(targetNode));
        },
        /**
         * 节点名称是否重复
         * @param nodeName
         * @param parentNode
         * @returns {*|boolean}
         */
        hasRepeatedName: function (nodeName, parentNode) {
            return this.hasRepeated('name',nodeName,parentNode);
        },
        /**
         * 自定义图标
         * @example
         * view : {
		     addDiyDom: diyIconDom
	     *  }
         * @param treeId
         * @param treeNode
         */
        diyIconDom: function (treeId, treeNode) {
            var anchorObj = $('#' + treeNode.tId + '_a');
            var str = "<span class='icon-pack' id='task_icon_"
                + treeNode.id
                + "' title='未启动'><i class='icon unstart_icon'></i></span>";
            anchorObj.after(str);
        },
        /**
         * 自定义节点图标展示
         * 只显示子节点的图标
         * @example
         * view : {
		  showIcon : showChildIcon
	     *  }
         * @param treeId
         * @param treeNode
         * @returns {boolean}
         */
        showChildIcon: function (treeId, treeNode) {
            return !treeNode.isParent;
        },

        selectNode: function (node) {
            this.oTree.selectNode(node);
        },
        selectNodeByFilter: function (key, value, parentNode) {
            var node = this.getNodeByFilter(key,value,parentNode);
            node && this.selectNode(node);
        },
        selectNodeByName: function (nodeName, parentNode) {
            this.selectNodeByFilter('name',nodeName,parentNode);
        },
        selectNodeById: function (nodeId, parentName) {
            this.selectNodeByFilter('id',nodeId,parentName);
        },
        /**
         * 取消给定节点的选中状态
         * 取消所有选中节点 （node 为空）
         * @param node
         */
        cancelSelectedNode: function (node) {
            this.oTree.cancelSelectedNode(node);
        },
        expandNode: function (node, expandFlag) {
            var targetNode = node || this.getSelectedNode();
            return this.oTree.expandNode(targetNode,expandFlag);
        },
        closeNode: function (node) {
            return this.expandNode(node,false);
        },
        expandAll: function (expandFlag) {
            return this.oTree.expandAll(expandFlag || true);
        },
        closeAll: function () {
            return this.oTree.expandAll(false);
        },
        transformNodesToArray: function (nodeList) {
            var zNodes = nodeList || this.oTree.getNodes();
            return this.oTree.transformToArray(zNodes);
        },

        /**
         * 获取第一个选中节点
         * @returns {*}
         */
        getSelectedNode: function () {
            if(this.oTree){
                return this.oTree.getSelectedNodes()[0];
            }
        },
        /**
         * 获取所有选中的节点
         * @returns {*}
         */
        getSelectedNodes: function () {
            if(this.oTree){
                return this.oTree.getSelectedNodes();
            }
        },
        /**
         * 获取选中节点的名称
         * @returns {*|Function|string}
         */
        getSelectedNodeName: function () {
            var node = this.getSelectedNode();
            return node && node.name;
        },
        /**
         * 获取
         * TODO
         * @returns {*}
         */
        getFirstNode: function () {
            var zNodes = this.getSelectedNodes();
            var firstNode;
            $.each(zNodes, function (index, node) {
                if(node.isFirstNode) {
                    firstNode = node;
                    return false;
                }
            });
            return firstNode;
        },
        /**
         * 获取给定节点的所有父节点
         * 获取选中节点的所有父节点
         * @param node
         * @param parentNodesList
         * @returns {*}
         */
        getParentNodes: function (node, parentNodesList) {
            var parentNode;
            if(!node || !node.getParentNode() || !node.getParentNode().isParent) return;
            parentNode = node.getParentNode();
            parentNodesList.push(parentNode);
            this.getParentNodes(parentNode,parentNodesList);
            return parentNodesList;
        },
        /**
         * 获取给定节点的所有子节点
         * 获取选中节点的所有子节点
         * @param node
         * @param childNodesList
         * @example
         * getChildNodes(node,[])
         * @returns {*}
         */
        getChildNodes: function (node, childNodesList) {
            var childNode;
            var self = this;
            if(!this.hasChildren(node)) return;
            $.each(node.children, function (i, item) {
                childNodesList.push(item);
                self.getChildNodes(item,childNodesList);
            });
            return childNodesList;
        },
        /**
         * 根据过滤器获取节点
         * @param key           节点属性名称
         * @param value         节点属性值
         * @param parentNode    节点的父级节点（指定过滤开始位置/级别）
         *                       为 null 时，从根目录开始查询
         * @example
         * getNodeByFilter('name','abc',parentNode)
         * @returns {*}
         */
        getNodeByFilter: function (key, value, parentNode) {
            var refNode = parentNode || this.getSelectedNode() || null;
            return this.oTree.getNodeByParam(key,value,refNode);
        },
        /**
         * 根据节点名称获取节点
         * @param nodeName
         * @param parentNode
         * @returns {*}
         */
        getNodeByName: function (nodeName, parentNode) {
            return this.getNodeByFilter('name',nodeName,parentNode);
        },
        getNodeById: function (nodeId, parentNode) {
            return this.getNodeByFilter('id',nodeId,parentNode);
        },
        /**
         * 获取选中节点的元素ID  #area_id
         * @returns {*|string}
         */
        getSelectedNodeElemId: function () {
            var node = this.getSelectedNode();
            return node && node.tId;
        },
        /**
         * 获取选中节点的ID    对应数据表中的ID （maybe）
         * @returns {*}
         */
        getSelectedNodeId: function () {
            var node = this.getSelectedNode();
            return node && node.id;
        },
        getCheckedNodes: function (checkFlag) {
            return this.oTree.getCheckedNodes(checkFlag || true);
        },
        getUnCheckedNodes: function () {
            return this.getCheckedNodes(false);
        },

        getInstance: function () {
            return this.oTree;
        }
    };
    return BaseTree;
});