/**
 * requirejs 配置文件
 * @author skz
 * @date 2016年9月5日
 * @time 下午4:52:06
 */
require.config({
    baseUrl: Constants.CONTEXT_PATH + '',
    //enforceDefine: true,
    //waitSeconds: 15,
    //IESelectorLimit: true,

    // clean cache for producing  'bust=' + (new Date()).getTime(),
    urlArgs: function (id, url) {
        var reload = false;
        var args = "";
        if (/bootstrapTable|artDialog|autocompleter|zTree|WdatePicker/i.test(url)) {
            reload = true;
            args = "v=" + (new Date()).getTime();
        }
        return reload ? (url.indexOf('?') === -1 ? '?' : '&') + args : args;
    },
    // urlArgs: 'bust=' + (new Date()).getTime(),
    paths: {
        //'css': 'normal/requirejs/plugins/require-css/css',
        "jquery": "normal/jquery/jquery-1.11.2.min",
        "bootstrap": "normal/bootstrap/js/bootstrap.min",
        "artDialog": "normal/artDialog/js/dialog-plus-min",
        "bootstrapTable": "normal/bootstrapTable/ext/bootstrap-table-ext",
        'bootstrap-table': "normal/bootstrapTable/ext/bootstrap-table-ext",
        'bootstrap-select': "normal/bootstrap-select-1.12.2/dist/js/bootstrap-select",
        'select2': "raw/select2-4.0.2/dist/js/select2",
        "autocompleter": "normal/autocompleter/ext/jquery.autocompleter.ext",
        "ztree": "normal/zTree/js/jquery.ztree.all-3.5.min",
        "WdatePicker": "normal/My97DatePicker/WdatePicker",
        "placeholder": 'normal/placeholder/jquery.placeholder.min',
        "jqueryUI": "normal/jquery-ui-1.12.1.custom/jquery-ui",

        "layer": "/CommonBase/normal/layer/layer",

        //"validator": "normal/nice-validator/local/zh_CN",
        "validator": "normal/nice-validator-1.0.9/dist/jquery.validator",
        "niceValidator": "normal/nice-validator-1.0.9/dist/local/zh-CN",
        "niceValidator-zh-CN": "normal/nice-validator-1.0.9/dist/local/zh-CN",

        "ajaxform": "normal/jquery.ajax.form/jquery-form",
        "webuploader": "normal/webupload/webuploader.min",
        "webuploader-fis": "normal/webupload/webuploader.fis",
        "jqzoom": "normal/jqzoom-master/js/jquery.jqzoom-core.pack",
        "unslider": "normal/unslider-master/dist/js/unslider-min",
        "swiper": "normal/Swipe-master/dist/js/swiper.jquery.umd",
        "arttemplate": "normal/artTemplate-master/dist/template",
        "underscore": "normal/underscore/underscore-min",
        "pagination": "normal/paginationjs/dist/pagination.min",
        "kindeditor": "raw/kindeditor/kindeditor-min",
        "Gsui": "gsui/source/Gsui.amd",
        "commonPath": "../js/common/base/commonPath",
        'dateUtil': "../js/common/base/dateUtil",
        'IDCardUtil': "../js/common/base/IDCardUtil",

        "uploadify": 'normal/uploadify/jquery.uploadify',

        // for fullcalendar 
        "moment": "normal/fullcalendar/2.0.2/lib/moment.min",
        "fullcalendar": "normal/fullcalendar/2.0.2/fullcalendar",
        "fullcalendar-zh-cn": "normal/fullcalendar/2.0.2/lang/zh-cn",

        'lazyload': 'normal/jquery.lazyload/jquery.lazyload',
        'slimscroll': 'normal/slimScroll/jquery.slimscroll.min',
        'draggabilly': 'raw/draggabilly/dist/draggabilly.pkgd',

        // 模拟数据
        "mock": "normal/mock/mock",
        // echart
        'echarts3': 'normal/echarts-3/echarts',
        // require text plugin
        'text': 'normal/requirejs/plugins/text/text',

        // uilibs's sibling directory 'js'
        "js": "../js",
        "jqlayout": "normal/jqlayout/jquery.layout-latest",
        "raphael": "normal/raphael/raphael-min",
        "json2": "normal/json2/json2",
        "gmsg": "gsui/gmsg/gmsg",
        "util": "../js/common/tools/Util",
        "fwin": "../js/common/ocx/frameWindow",
        "fancybox": "normal/fancyBox/source/jquery.fancybox",
        "mousewheel": "raw/fancyBox/lib/jquery.mousewheel-3.0.6.pack",
        "print": "normal/print/jQuery.print"

    },
    map: {
        '*': {
            'css': 'normal/requirejs/plugins/require-css/css'
        }
    },
    // setting dependency
    shim: {
        "bootstrap": ["jquery"],
        //"artDialog": ["jquery"],
        //"bootstrapTable": ["jquery","bootstrap"],
        //"autocompleter": ["jquery"],
        //"ztree": ["jquery"],
        //"WdatePicker": ["jquery"],
        "Gsui": ["jquery"],
        "validator": ["jquery"],
        //"niceValidator": ['../content/uilibs/normal/nice-validator-1.0.9/dist/jquery.validator.js?css'],
        "niceValidator-zh-CN": ["../content/uilibs/normal/nice-validator-1.0.9/dist/jquery.validator.js?css"],
        "unslider": ["jquery"],
        "swiper": ["jquery"],
        "arttemplate": ["jquery"],
        "pagination": ["jquery"],
        "ajaxform": ['jquery'],
        "kindeditor": ['jquery'],
        "webuploader": ['jquery'],
        "webuploader-fis": ['jquery'],
        "bootstrap": ["jquery"],
        "gmsg": ['jquery'],

        "uploadify": ['jquery'],
        "mousewheel": ['jquery'],
        "fancybox": ['jquery', 'mousewheel'],
        "print": ['jquery'],
        'lazyload': ['jquery'],
        "select2": ['jquery'],
        "slimscroll": ['jquery'],
        //"draggabilly": ['jquery'],


        // "moment": ['jquery'],
        // "zh-cn": ["fullcalendar"],

        "mock": ['jquery'],

        "jqzoom": ['jquery'],

        // calendar
        "moment": ['jquery'],
        "fullcalendar-zh-cn": {
            deps: [
                "jquery", "fullcalendar",
                'css!normal/fullcalendar/2.0.2/fullcalendar.css'
            ]
        },

        // 为了使页面加载时就呈现页面布局效果，基本布局样式最好不要动态加载
//        "bootstrap": {
//          deps: [ 
//            "jquery",
//            'css!normal/bootstrap/css/bootstrap.css' 
//          ] 
//        },
        "artDialog": {
            deps: [
                "jquery",
                'css!normal/artDialog/css/ui-dialog-ext.css'
            ]
        },
        "bootstrapTable": {
            deps: [
                "jquery", "bootstrap",
                'css!normal/bootstrapTable/css/bootstrap-table-ext.css'
            ]
        },
        "bootstrap-table": {
            deps: [
                "jquery", "bootstrap",
                'css!normal/bootstrapTable/css/bootstrap-table-ext.css'
            ]
        },
        "bootstrap-select": {
            deps: [
                "jquery", "bootstrap"
            ],
            exports: "bootstrap-select"
        },
        "autocompleter": {
            deps: [
                'jquery',
                'css!normal/autocompleter/ext/jquery.autocompleter.ext.css'
            ]
        },
        'WdatePicker': {
            deps: ["jquery"],
            exports: "WdatePicker"
        },
        'placeholder': {
            deps: ["jquery"],
            exports: "placeholder"
        },
        'ztree': {
            deps: [
                'jquery',
                'css!normal/zTree/css/zTreeStyle/zTreeStyle-ext.css'
            ]
        },

        "underscore": {
            deps: ["jquery"],
            exports: "_"
        },
        "jqueryUI": {
            deps: ["jquery"],
            exports: "jqueryUI"
        }
    },

    // Packages
    packages: [{ // 公共脚本 包路径
        name: 'common',
        location: '../js/common'
    }, {		// 强制措施提醒 包路径
        name: 'coermeasure',
        location: '../js/coermeasure'
    }, {	// 首页 包路径
        name: 'home',
        location: '../js/home/modules'
    }, {
        name: 'basepkg',
        location: '.././js/common/base',
        main: 'main'
    }, {	// 法规法案 包路径
        name: 'lawslib',
        location: '../js/lawslib',
        main: 'lawslib'
    }, {	// 案件管理 包路径
        name: 'casemanage',
        location: '../js/casemanage',
        main: 'casemanage'
    }, {	// 权限配置 包路径
        name: 'authority',
        location: '../js/authority',
        main: 'authority'
    }, {	// 办案区域 包路径
        name: 'casearea',
        location: '../js/casearea',
        main: 'invesunit'
    }, {	// 归档刻录 包路径
        name: 'lineburn',
        location: '../js/lineburn',
        main: 'lineburn'
    }, {	// 质量考核 包路径
        name: 'qualityassess',
        location: '../js/qualityassess',
        main: 'qualityassess'
    }, {	// 法规法案搜索 包路径
        name: 'lawslibsearch',
        location: '../js/workclassFlow',
        main: 'lawslibsearch'
    }, {		// 组件 包路径
        name: 'components',
        location: 'components'
    }, {	// 录入综合信息 包路径
        name: 'personinfo',
        location: '../js/casearea/personinfo/personinfo',
        main: 'personinfo'
    }, {// 系统配置
        name: 'system',
        location: '../js/system'
    }
    ]
});

/*requirejs.onError = function (err) {
 console.log(err.requireType);
 if (err.requireType === 'timeout') {
 console.log('modules: ' + err.requireModules);
 var failedId = err.requireModules && err.requireModules[0];
 console.log(failedId);
 console.log(err.message);
 }

 throw err;
 };*/