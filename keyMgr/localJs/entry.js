/**
 * Created by Tinker on 2017/4/24.
 */

var layer = null;
var AjaxUrl = {
    encryptPsw :'/passwordMgr' +'/encryptPsw',
}

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
    initEvent();
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

    layui.config({
        version: false //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
        , debug: false //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
        , base: '' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
    });

    layui.use('layer', function () {
        layer = layui.layer;
        layer.ready(function () {
            layer.msg('很高兴一开场就见到你');
        });
    });


    $("#newSitePassword").click(function () {
        _keyMgr.newSitePasswordLayer();
    });

    $("#user_signOut").click(function () {
        _userModel.newAuthDialog();
    });

}

var _keyMgr = {
    sitePasswordLayer: null,
    newSitePasswordLayer: function () {
        _keyMgr.sitePasswordLayer = layer.open({
            type: 1,
            title: '新建加密密码',
            content: $("#site_addingDialog"),
            skin: 'layer-skin',
            area:['500px','384px'],
            btn: ['加密', '取消'],
            yes: function (index, layero) {
                _keyMgr.postSitePassword();
                return false;
            },
            btn2: function (index, layero) {
                debugger
            }
        });
    },
    getSitePassword: function () {
        var data = {};
        $('.site_addingDialog_cls' + '  :input' ).each(function () {
            var key = $(this).attr('id');
            data[key] = $(this).val();
        })
        data['userId'] = $('#globalUserId').val();
        return data;
    },
    postSitePassword:function () {
        var request = createCORS('post', Constants.SERVER_IP+AjaxUrl.encryptPsw);
        if(request){
            console.log(request);
            request.onload = function(){

            };
            request.send();
        }
       /* var data =this.getSitePassword();
        if(data){
            $.ajax({
                type: "post",
                async: false,
                //url: "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998",
                dataType: "jsonp",
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                //jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
                url: Constants.SERVER_IP + AjaxUrl.encryptPsw,
                data: data,
                success: function (param) {
                    console.log(param);
                    if (param.success) {
                        layer.msg(param.message);
                        _keyMgr.sitePasswordLayer.close();
                    }
                }
            });
        }*/
    }
}

function createCORS(method, url){
    var xhr = new XMLHttpRequest();
    if('withCredentials' in xhr){
        xhr.open(method, url, true);
    }else if(typeof XDomainRequest != 'undefined'){
        var xhr = new XDomainRequest();
        xhr.open(method, url);
    }else{
        xhr = null;
    }
    return xhr;
}



var _userModel = {
    newAuthDialog: function () {
        var authDialog = dialog({
            title: '用户验证',
            content: $("#user_authDialog"),
            okValue: '确 定',
            onclose: function () {
            },
            onshow: function () {
                this._popup.css("left", "280px");
                this._popup.css("top", "80px");
            },
            ok: function () {

            },
            cancelValue: '取消',
            cancel: function () {

            }
        });
        authDialog.showModal();
    }
}

/**
 * 提交信息
 */
var _postData = {

}

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

