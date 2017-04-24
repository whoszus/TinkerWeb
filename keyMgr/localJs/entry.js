/**
 * Created by Tinker on 2017/4/24.
 */


/**
 * 首页
 *
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function () {
    // initLayout();
    parentVerticalTab.initTab();
    serverTable.setTable();
    // initEvent();
    // validator.verify1();
    // isValid = false;// 验证标记
});

var serverTable = {
    /**
     * 设置表格
     */
    setTable: function () {
        var settings = {
            classes: 'table table-hover',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            // 全部勾选
            onCheckAll: function (rows) {

            },
            // 取消全部
            onUncheckAll: function (rows) {

            },
            // 单次勾选
            onCheck: function (row, $element) {

            },
            // 取消单次勾选
            onUncheck: function (row, $element) {

            },
            // 翻页时清空勾选信息
            onPageChange: function (number, size) {

            },
            queryParams: function (params) {
                var pageNumber = 1;
                if (params.limit != 0) {
                    pageNumber = params.offset / params.limit + 1;
                }
                params.pageSize = params.limit;
                params.pageNumber = pageNumber;
                // params['condition_EQ_']
                return params;
            }
        }
        C.createTable("#bootstrapTable", Constants.SERVER_IP
            + '/passwordMgr/getSiteBootstrapTable', settings);
    },
    /**
     * 更新表格
     */
    refreshTb: function () {
        $("#bootstrapTable").bootstrapTable('refresh', {
            url: Constants.CONTEXT_PATH + '/domain/getPageList.do'
        });
    }

}


var parentVerticalTab = {
    initTab: function () {
        $('#parentVerticalTab').easyResponsiveTabs({
            type: 'vertical', //Types: default, vertical, accordion
            width: '90%', //auto or any width like 600px
            fit: true, // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function (event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo2');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    }

}


/**
 * 初始化布局
 */
function initLayout() {
    $(".main-container").height($(window).outerHeight() - 10);
    $(".tree-container").height($(window).outerHeight() - 10);
    $("#centerDiv").height($(window).outerHeight() - 10);
    $(window).resize(function () {
        $('.main-container').height($(window).height() - 100);
    });
}

function initEvent() {
    // 添加按钮
    // $("#parentName").click(function () {
    //     popUpWindow.chooseDomain();
    // });

}

/**
 * 弹出窗
 */
var popUpWindow = {}

/**
 * 提交信息
 */
var postData = {}

/**
 * 验证规则
 */
var validator = {
    /**
     * 验证填写1
     */
    verify1: function () {
        $("#platformwin").validator({
            rules: {
                isReplicate: function (element) {
                    var code = 0;
                    $.ajax({
                        url: Constants.CONTEXT_PATH + "/domain/getPageList.do?",
                        data: {
                            'search_EQ_name': element.value,
                            'search_NEQ_id': $("#id").val()
                        },
                        dataType: "json",
                        type: "post",
                        async: false,
                        success: function (ret) {
                            if (ret.content.length != 0) {
                                code = 1;
                            }
                        }
                    });
                    if (code == 0) {
                        return true;
                    }
                    return false;
                },
                special: [/^[\u4e00-\u9fa5\uff08\uff09a-zA-Z0-9\-\_\.\(\)]+$/, '不能含有特殊字符']
            },
            messages: {},
            fields: {}
        });
    },
    /**
     * 判断验证是否通过
     */
    isPass: function () {
        $('#platformwin').isValid(function (v) {
            if (v) {
                isValid = true;
            } else {
                isValid = false;
            }
        });
    }

};

