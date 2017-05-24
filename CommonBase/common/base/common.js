window.C = window.common = (function () {

    /**
     * 构建表格
     * @param id    选择器
     * @param url    请求URL
     * @param obj    {}
     * @returns
     */
    var _createTable = function (id, url, obj) {
        var settings = {
            url: url,
            type: "post",
            classes: 'table table-hover table-condensed',
            undefinedText: '暂无',
            dataType: "json",
            crossDomain: true,
            xhrFields: {withCredentials: true},
            sidePagination: 'server',
            pagination: true,
            cache: false,
            valign: 'middle',
            formatLoadingMessage: function () {
                return '加载中, 请稍等…';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                return ' 总共 <b class="total-row">' + totalRows + '</b> 条记录';
            },
            formatRecordsPerPage: function (pageNumber) {
                return '每页显示 ' + pageNumber + ' 条';
            },
            paginationPreText: "<i class='glyphicon glyphicon-menu-left'></i>",
            paginationNextText: "<i class='glyphicon glyphicon-menu-right'></i>",

            queryParams: function (params) {
                return params;
            },
            responseHandler: function (res) {
                return res ? {"rows": res.content, "total": res.totalElements} : {"rows": [], "total": 0};
            }
        };
        $.extend(settings, obj || {});

        return $(id).bootstrapTable(settings);

    };

    var _createBootstrapSuggest = function (id, url, obj) {

        var settings = {
            indexId: 2,
            indexKey: 1, //data.value 的第几个数据，作为input输入框的内容
            url: url,
            idField: "id", //每组数据的哪个字段作为 data-id，优先级高于 indexId 设置（推荐）
            keyField: "name",
            effectiveFields: ['name'],
            processData: function (json) {     // url 获取数据时，对数据的处理，作为 getData 的回调函数
                var i, len, data = {value: []};

                if (!json || json.length == 0) {
                    return false;
                }

                len = json.length;

                for (i = 0; i < len; i++) {
                    data.value.push({
                        "id": json[i].id,
                        "name": json[i].fieldName
                    });
                }
                return data;
            }
        }

        $.extend(settings, obj || {});

        return $(id).bsSuggest(settings);


    }


    return {
        createTable: _createTable,
        createBootstrapSuggest: _createBootstrapSuggest
    };

})();

/**
 * 组织结构树设置
 */
var orgZtree = {
    /**
     * 参数设置
     */
    setting: {
        view: {
            selectedMulti: true,
            showIcon: true,
            dblClickExpand: false,
            showLine: true
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    },
    /**
     * 组织机构数据属性
     */
    zNodes: function () {
        var treeData;
        $.ajax({
            url: Constants.CONTEXT_PATH + '/device/getDomainTree.do',
            dataType: 'json',
            async: false,
            success: function (data) {
                treeData = data;
            },
            error: function () {
                $.gmsg({contentHtml: '请求区域树失败!', theme: 'danger'});
            }
        });
        return treeData;
    },
    /**
     * 平台机构树属性
     */
    ptNodes: function (platInfo, callback) {
        treecallback = callback;
        var treeData;
        jQuery.support.cors = true;
        var request = $.ajax({
            dataType: 'jsonp',
            async: false,
            timeout: 1000,
            type: "get",
            data: {
                'user.loginName': platInfo.loginName,
                'user.password': platInfo.loginPwd
            },
            jsonpCallback: 'onQueryTreeCallBack',
            url: 'http://' + platInfo.servURL + '/cecs/open/showAllDeviceTree.action',
            success: function (data) {
                treeData = data;
            },
            error: function () {
                $.gmsg({contentHtml: '请求设备树失败!', theme: 'danger'});
            }
        });
        return treeData;
    }
    /*[
     {name:"test1", open:true,children:[{name:"test1_1"}, {name:"test1_2"}]},
     {name:"test2", open:true, children:[{name:"test2_1"}, {name:"test2_2"}]}
     ],*/
}

var treecallback = null;
function onQueryTreeCallBack(data) {
    treecallback.call(null, data);
}
function showURLDialog(url) {
    var win = top.layer.open({
        type: 2,
        title: '处理',
        shadeClose: false,
        area: ['700px', '500px'],
        btn: ['提交', '取消'],
        content: url,
        yes: function (index, layero) {
            //询问框
            top.layer.confirm('确认信息无误？', {
                btn: ['是', '否'] //按钮
            }, function (index) {
                top.layer.close(index);
                var iframeNode = top.window[layero.find('iframe')[0]['name']];
                if (iframeNode.validator.isPass()) {
                    iframeNode.postData.postAciton();
                    setTimeout(function () {
                        top.layer.close(win)
                    }, 1000);
                } else {
                    return false;
                }
            }, function () {

            });

        },
        cancel: function (index) {

        },
        success: function (layero, index) {
            top.hasShowHandWin = true;
        },
        end: function () {
            top.hasShowHandWin = false;
        }
    });
}


$.ajaxSettings.cache = false;
