/**
 * Created by Tinker on 2017/4/24.
 */

var layer = null;
var AjaxUrl = {
    encryptPsw: '/passwordMgr' + '/encryptPsw',
    deletePsw: '/passwordMgr' + '/deletePsw',
    decodePassword :'/passwordMgr' + '/decodePassword',
    /**
     * 用户认证
     */
    registerUrl: '/auth/register.do',
    loginWithToken:'/auth/loginWithToken.do',
    loginWithAccount:'/auth/loginWithAccount.do',

    /**
     * 历史记录
     */

    // 1.获取解密历史表格
    accessHistoryList:'/history/accessHistoryList.do',

};

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
     * 设置密码表格
     */
    setTable: function () {
        var settings = {
            classes: 'table table-hover',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            // 全部勾选
            onClickRow: function (rows) {
                // debugger
            },
            onDblClickRow: function (row) {
                _keyMgr.modifyPassword(row);
            },
            queryParams: function (params) {
                var pageNumber = 1;
                if (params.limit != 0) {
                    pageNumber = params.offset / params.limit + 1;
                }
                params.pageSize = params.limit;
                params.pageNumber = pageNumber;
                params['condition_LIKE_siteName'] = $("#site_address").val() || "";
                return params;
            }
        }
        C.createTable("#bootstrapTable", Constants.SERVER_IP
            +'/passwordMgr/getSiteBootstrapTable' , settings);
    },
    /**
     * 更新密码表格
     */
    refreshTb: function () {
        $("#bootstrapTable").bootstrapTable('refresh', {
            url: Constants.SERVER_IP + '/passwordMgr/getSiteBootstrapTable'
        });
    },

    /**
     *  设置操作历史表格
     */

    setOperationHistoryTable: function () {
        var settings = {
            classes: 'table table-hover',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            // 全部勾选
            onClickRow: function (rows) {
            },
            onDblClickRow: function (row) {
                _keyMgr.modifyPassword(row);
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
        C.createTable("#ipaccessListTable", Constants.SERVER_IP
            + AjaxUrl.accessHistoryList, settings);
    },
    refreshOperationHistoryTable :function () {
        $("#ipaccessListTable").bootstrapTable('refresh', {
            url: Constants.SERVER_IP + AjaxUrl.accessHistoryList
        });
    },

    /**
     *  设置操作历史表格
     */

    setDecodeHistoryTable: function () {
        var settings = {
            classes: 'table table-hover',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            // 全部勾选
            onClickRow: function (rows) {
            },
            onDblClickRow: function (row) {
                _keyMgr.modifyPassword(row);
            },

            queryParams: function (params) {
                var pageNumber = 1;
                if (params.limit != 0) {
                    pageNumber = params.offset / params.limit + 1;
                }
                params.pageSize = params.limit;
                params.pageNumber = pageNumber;
                params['condition_EQ_sysMethodName'] = 'decodePassword';
                return params;
            }
        }
        C.createTable("#decodeHistoryTable", Constants.SERVER_IP
            + AjaxUrl.accessHistoryList, settings);
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
                if($tab.hasClass("operation_history")){
                    serverTable.setOperationHistoryTable();
                }else if($tab.hasClass("decode_history")){
                    serverTable.setDecodeHistoryTable();
                }
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

    $("#user_sign_up").click(function () {
        _userModel.newSignUpLayer();
    });

    $("#user_sign_in").click(function () {
        _userModel.newSignInLayer();
    });

    $("#search_password").click(function () {
        serverTable.refreshTb();
    });

    _userModel.loginWithCookie();


}


var _keyMgr = {
    sitePasswordLayer: null,
    modifyLayer: null,
    newSitePasswordLayer: function () {
        initInputValue('.site_addingDialog_cls');
        _keyMgr.sitePasswordLayer = layer.open({
            type: 1,
            title: '新建加密密码',
            content: $("#site_addingDialog"),
            skin: 'layer-skin',
            area: ['500px', '384px'],
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
        $('.site_addingDialog_cls' + '  :input').each(function () {
            var key = $(this).attr('id');
            data[key] = $(this).val();
        })
        data['userId'] = $('#globalUserId').val();
        return data;
    },
    postSitePassword: function () {
        var data = this.getSitePassword();
        if (data) {
            $.ajax({
                type: "post",
                xhrFields: {withCredentials: true},
                crossDomain: true,
                dataType: "json",
                url: Constants.SERVER_IP + AjaxUrl.encryptPsw,
                data: data,
                success: function (param) {
                    if (param.success) {
                        layer.close(_keyMgr.sitePasswordLayer);
                        serverTable.refreshTb();
                    }
                    layer.msg(param.message);
                },
                error:function (data) {
                    layer.msg("网络错误，请检查网络！");
                }
            });
        }
    },
    modifyPassword: function (row) {
        initInputValue('.site_addingDialog_cls');
        if (row) {
            setInputValue('.site_addingDialog_cls', row);
        }
            $("#password").val('*******************');
        _keyMgr.modifyLayer = layer.open({
            type: 1,
            title: '修改密码',
            content: $("#site_addingDialog"),
            skin: 'layer-skin',
            area: ['500px', '384px'],
            btn: ['加密', '删除密码', '解密'],
            yes: function (index, layero) {
                _keyMgr.postSitePassword();
                return false;
            },
            btn2: function (index, layero) {
                _keyMgr.deleteSitePassword(row);
                return false;
            },
            btn3: function (index, layero) {
                // layer.close(_keyMgr.modifyLayer);
                _keyMgr.decodePassword(row);
                return false;
            }
        });
        $("#sitePasswordEncode").css("disable", true);
    },

    decodePassword:function (row) {
        if (row) {
            delete  row['lastDecodeTime'];
            delete  row['sitePasswordEncode'];
            $.ajax({
                type: "post",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                url: Constants.SERVER_IP + AjaxUrl.decodePassword,
                data: row,
                success: function (param) {
                    if (param.success) {
                        layer.msg('解密成功！');
                        $("#password").val(param.message);
                    }else {
                        layer.msg(param.message);

                    }
                },
                error:function (data) {
                    layer.msg("网络错误，请检查网络！");
                }
            });

        }
    },

    deleteSitePassword: function (row) {
        if (row) {
            delete  row['lastDecodeTime'];
            $.ajax({
                type: "post",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                url: Constants.SERVER_IP + AjaxUrl.deletePsw,
                data: row,
                success: function (param) {
                    if (param.success) {
                        layer.close(_keyMgr.modifyLayer);
                        serverTable.refreshTb();
                    }
                    layer.msg(param.message);
                },
                error:function (data) {
                    layer.msg("网络错误，请检查网络！");
                }
            });

        }
    }

}


var _userModel = {
    loginLayer: null,
    registLayer:null,
    newSignUpLayer: function () {
        initInputValue('.login_box_cls');
        _userModel.registLayer = layer.open({
            type: 1,
            title: '用户注册',
            content: $("#regist_box"),
            skin: 'layer-skin',
            area: ['500px', '384px'],
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                _userModel.userSignUp();
                return false;
            },
            btn2: function (index, layero) {
            }
        });
    },
    newSignInLayer:function () {
        initInputValue('.regist_box_cls');
        _userModel.loginLayer = layer.open({
            type: 1,
            title: '登录',
            content: $("#login_box"),
            skin: 'layer-skin',
            area: ['500px', '384px'],
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                _userModel.userSignIn();
                return false;
            },
            btn2: function (index, layero) {
            }
        });
    },
    userSignIn: function () {
        var data = getInputValueByName('.login_box_cls');
        $.ajax({
            type: "post",
            dataType: "json",
            crossDomain: true,
            xhrFields: {withCredentials: true},
            url: Constants.SERVER_IP + AjaxUrl.loginWithAccount,
            data:data,
            success: function (param) {
                if (param.success) {
                    _userModel.loginLayer && layer.close(_userModel.loginLayer);
                    _userModel.changeHeaderInfo(true, param.message);
                } else {
                    layer.msg(param.message);
                }
            },
            error:function (data) {
                layer.msg("网络错误，请检查网络！");
            }
        });
    },
    /**
     * 用户注册
     */
    userSignUp: function () {
        var data = getInputValue(".regist_box_cls");
        if (data) {
            $.ajax({
                type: "post",
                dataType: "json",
                crossDomain: true,
                xhrFields: {withCredentials: true},
                url: Constants.SERVER_IP + AjaxUrl.registerUrl,
                data: data,
                success: function (param) {
                    if (param.success) {
                        _userModel.registLayer && layer.close(_userModel.registLayer);
                        _userModel.changeHeaderInfo(true, param.message);
                    } else {
                        layer.msg(param.message);
                        _userModel.changeHeaderInfo(false);
                    }

                },
                error:function (data) {
                    layer.msg("网络错误，请检查网络！");
                }
            });
        }
    },
    changeHeaderInfo: function (info, userInfo) {
        if (info) {
            var str = '<i class="fa fa-github fa-fw fa-3x"></i>' + userInfo;
            $('.header_user_info').append(str);
            $('.head_user_ctrl').css("display", 'none');
            $('.header_user_info').css('display', 'inline-block');

        } else {
            $('.head_user_ctrl').css("display", 'inline-block');
            $('.header_user_info').css('display', 'none');
        }
    },
    loginWithCookie: function () {
        $.ajax({
            type: "post",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            url: Constants.SERVER_IP + AjaxUrl.loginWithToken,
            success: function (param) {
                if (param.success) {
                    _userModel.loginLayer && layer.close(_userModel.loginLayer);
                    _userModel.changeHeaderInfo(true, param.message);
                } else {
                    layer.msg(param.message);
                    // _userModel.newSignInLayer();
                }
            },
            error:function (data) {
                layer.msg("网络错误，请检查网络！");
            }
        });
    }


}

/**
 * 提交信息
 */
var _postData = {}

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

function getInputValue(parent_cls) {
    var data = {};
    $(parent_cls + '  :input').each(function () {
        var key = $(this).attr('name');
        data[key] = $(this).val();
    })
    return data;
}
function getInputValueByName(parent_cls) {
    var data = {};
    $(parent_cls + '  :input').each(function () {
        var key = $(this).attr('name');
        data[key] = $(this).val();
    })
    return data;
}
function setInputValue(parent_cls, data) {
    $(parent_cls + '  :input').each(function () {
        var key = $(this).attr('id');
        $(this).val(data[key]);
    });

}
function initInputValue(parent_cls) {
    $(parent_cls + '  :input').each(function () {
        $(this).val('');
    });
}


function numberFormatter(value, row, index) {
    return index + 1;
}
function typeFormatter(value, row, index) {
    switch (row.siteEncodeMethod) {
        case 1 :
            return 'RSA';
            break;
        case 2 :
            return 'AES';
            break;
        case 3 :
            return 'MD5+RSA';
            break;
        case 0 :
            return '保密';
            break;
    }

}