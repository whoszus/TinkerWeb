/**
 * TODO 增删改
 * Created by skz on 2016/11/7.
 */
define(['common/tree/BaseTree','common/tools/extends'],function (BaseTree,extend) {
    function EditTree(target,url,setting){
        // 编辑
        var editConfig = {
            view: {
                selectedMulti: false,
                addHoverDom: diyHoverBtnDom,
                removeHoverDom: diyRemoveBtnDom
            },
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            callback: {
                onNodeCreated: onNodeCreated,
                onRename: onRename,
                onRemove: onRemove
            }
        };
        // 异步加载
        // TODO
        /*var asyncConfig = {
            "async": {
                enable: true,
                url: null,
                autoParam:["id"],   // 提交父节点属性
                otherParam:[]
            },
            callback: {
                onAsyncError: null,
                onAsyncSuccess: null
            }
        };*/

        // checkbox
        // TODO
        /*var checkConfig = {
            view: {
                selectedMulti: true
            },
            check: {
                enable: true
            },
            callback: {
                beforeCheck: null,
                onCheck: null
            }
        };*/

        var settings = $.extend(true,editConfig,setting);
        var self = this;

        // 修改作用域
        BaseTree.call(this,target,url,settings);


        // ---- 操作

        var btnIconPrefix = {
            add: 'add',
            edit: 'edit',
            del: 'remove'
        };

        // 自定义操作按钮DOM
        function diyHoverBtnDom(treeId, treeNode) {
            diyDelHoverBtnDom(treeId,treeNode);
            diyEditHoverBtnDom(treeId,treeNode);
            diyAddHoverBtnDom(treeId,treeNode);
        }
        // 移除自定义DOM
        function diyRemoveBtnDom(treeId, treeNode) {
            $('#'+ btnIconPrefix.add + "Btn_"+treeNode.tId).unbind().remove();
            $('#'+ btnIconPrefix.edit + "Btn_"+treeNode.tId).unbind().remove();
            $('#'+ btnIconPrefix.del + "Btn_"+treeNode.tId).unbind().remove();
        }
        // 添加按钮DOM
        function diyAddHoverBtnDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            var btn = $('#'+ btnIconPrefix.add + "Btn_"+treeNode.tId);

            if (btn.length>0) return;
            var addStr = diyBtnDomTmpl(btnIconPrefix.add,treeNode.tId,'新增');
            sObj.after(addStr);

            var $btn = $('#'+ btnIconPrefix.add + "Btn_"+treeNode.tId);
            $btn && $btn.bind('click',treeNode,addClick);
        }
        // 编辑按钮DOM
        function diyEditHoverBtnDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            var btn = $('#'+ btnIconPrefix.edit + "Btn_"+treeNode.tId);

            if (btn.length>0) return;
            var addStr = diyBtnDomTmpl(btnIconPrefix.edit,treeNode.tId,'编辑');
            sObj.after(addStr);

            var $btn = $('#'+ btnIconPrefix.edit + "Btn_"+treeNode.tId);
            $btn && $btn.bind('click',treeNode,editClick);
        }
        // 移除按钮DOM
        function diyDelHoverBtnDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            var btn = $('#'+ btnIconPrefix.del + "Btn_"+treeNode.tId);

            if (btn.length>0) return;
            var addStr = diyBtnDomTmpl(btnIconPrefix.del,treeNode.tId,'删除');
            sObj.after(addStr);

            var $btn = $('#'+ btnIconPrefix.del + "Btn_"+treeNode.tId);
            $btn && $btn.bind('click',treeNode,delClick);
        }
        // 按钮 DOM 模板
        function diyBtnDomTmpl(className, tId, title) {
            var id = className + 'Btn_' + tId;

            $btn = $('<span class="button icon" onfocus="this.blur();"></span>')
                .attr({id: id, title: title})
                .addClass(className);
            return $btn.prop('outerHTML');
        }
        // 添加按钮事件
        function addClick(evt) {
            var treeNode = evt.data;
            // 新增节点
            var newNode = self.oTree.addNodes(treeNode, {pId:treeNode.id, name:"新节点"});
            return false;
        }
        // 编辑按钮事件
        function editClick(evt) {
            var treeNode = evt.data;
            self.oTree.editName(treeNode);
            return false;
        }
        // 删除按钮事件
        function delClick(evt) {
            var treeNode = evt.data;
            self.oTree.removeNode(treeNode,true);
            return false;
        }

        // 节点添加回调
        function onNodeCreated(event, treeId, treeNode) {
            // here is an ajax request for adding node
            // ajax request should return an ID to update node for operation
            console.log(treeNode)
        }

        // 节点重命名回调
        function onRename(event, treeId, treeNode, isCancel) {
            // here is an ajax request for updating node
            console.log(treeNode)
        }

        // 节点删除回调
        function onRemove(event, treeId, treeNode) {
            // here is an ajax request for deleting node
            console.log(treeNode)
        }
    }

    // inheritance
    extend(EditTree,BaseTree);

    return EditTree;
});