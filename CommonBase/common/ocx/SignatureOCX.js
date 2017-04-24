/**
 * 签名 OCX 控件操作
 * Created by skz on 2017/1/16 0016.
 */
define(['common/ocx/Class'],function(Class){
    /**
     * @class
     * @classdesc DOM工具类
     * @constructor
     */
    var DomUtil = {
        /**
         * @description 构建DOM对象
         * @param {String} id
         * @param {String} classId
         * @returns {HTMLElement}
         */
        createIDCardDom : function(id,classId){
            var $IDCardDom = window.document.createElement("object");
            try {
                $IDCardDom.style.width = '0';
                $IDCardDom.style.height = '0';
                $IDCardDom.classid = classId;
                $IDCardDom.id = id;
                $IDCardDom.appendChild(this.createObjParam("wmode","transparent"));
            } catch (e) {}
            return $IDCardDom;
        },
        /**
         * @description 构建Object DOM对象的Param参数
         * @param {String} key      参数key
         * @param {String} value    参数值
         * @returns {HTMLElement}
         */
        createObjParam : function(key,value){
            var $param = document.createElement("param");
            $param.name = key;
            $param.value = value;
            return $param;
        }
    };

    /**
     * @class
     * @classdesc SignatureOCX
     * @description SignatureOCX
     * @constructor
     */
    var SignatureOCX = Class.extend({
        /**
         * @private
         * @description 构造初始函数
         * @param ocx
         */
        init: function(ocx){
            this.ocx = ocx;
        },
        initial: function () {
            var paramJson,ret;
            if(!this.ocx){
                throw new Error("OCX对象尚未初始化");
            }
            paramJson = this.generateOcxParamJson("Init");
            ret = this.sysFunc(paramJson);
            return ret;
        },
        unInitial: function () {
            var paramJson,ret;
            if(!this.ocx){
                throw new Error("OCX对象尚未初始化");
            }
            paramJson = this.generateOcxParamJson("UnInit");
            ret = this.sysFunc(paramJson);
            return ret;
        },
        isIE : function(){
            return !!window.ActiveXObject || "ActiveXObject" in window
        },
        isIE8 : function(){
            return this.ieLessThan(9);
        },
        ieLessThan : function(ver){
            var ua = navigator.userAgent,
                isIE = ua.indexOf('MSIE') > -1,
                v = isIE ? /\d+/.exec(ua.split(';')[1]) : 0;
            return !isIE ? false : parseInt(v) < ver;
        },
        generateOcxParamJson: function(action,params){
            var data = {},paramJson;
            if(!action){
                throw new Error("参数错误，请确认参数传递正确！");
            }
            data.action = action;
            data.arguments = params || {};

            paramJson = JSON.stringify(data);
            if(this.isIE8()){
                eval("paramJson = '"+JSON.stringify(data)+"';");
            }
            return paramJson;
        },
        sysFunc: function (paramJson) {
            var result;
            if(!this.isIE()) return;
            try{
                result = this.ocx.GS_SysFunc(paramJson);
                result = JSON.parse(result);
            }catch (e){
                throw new Error("sysFunc Error! "+e,result);
            }
            return result;
        },
        registerCallback : function(callbackFunc){
            this.ocx.RegJsFunctionCallback(callbackFunc);
        }

    });

    /**
     * @class
     * @classdesc Signature
     * @description Signature SignatureOCX，可自定义方法
     * @constructor
     * @extends SignatureOCX @see {@link SignatureOCX}
     */
    var Signature = SignatureOCX.extend({
        /**
         * @private
         * @param id
         * @param target
         * @param classId
         */
        init: function(id,target,classId){
            /**
             * @private
             * @description OCX ID
             * @member {String}
             */
            this.id = id || "signature_ocx";
            /**
             * @private
             * @description OCX 父级标签ID
             * @member {String}
             */
            this.target = target || "#signature_wrapper";
            /**
             * @private
             * @description OCX ClassID
             * @member {String}
             */
            this.classId = classId || "clsid:9EA1E271-3DB5-4933-B267-6F6548CB1141";

            /**
             * @private
             * @description 是否安装了 OCX
             * @member {Boolean}
             */
            this.hasOCX = false;

            try {
                /**
                 * @private
                 * @description OCX 对象
                 * @member {object}
                 */
                this.ocxDom = DomUtil.createIDCardDom(this.id,this.classId);

                if(!$(this.target).length){
                    $('<div id="'+this.target.replace("#","")+'"></div>').appendTo($('body'));
                }
                $(this.target).prepend(this.ocxDom);
                this.hasOCX = true;
                this._super(this.ocxDom);
            }catch (e){
                this.hasOCX = false;
            }
        },
        registerOcxEventProxy: function (callback) {
            this.registerCallback(callback);
        }
    });

    return Signature;
});