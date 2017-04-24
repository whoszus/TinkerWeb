/**
 * Created by skz on 2016/11/7.
 */
define(function () {
    var InheritUtils = {};
    InheritUtils.createProtoMiddleWare = function(parent){
        function ProtoMiddleWare(){}
        ProtoMiddleWare.prototype = parent.prototype;
        ProtoMiddleWare.prototype.constructor = ProtoMiddleWare;
        return new ProtoMiddleWare();
    };
    /**
     * @description     继承方法
     * @param {Object} child     继承子类
     * @param {Object} parent    继承父类
     * @type {function}
     */
    InheritUtils.inheritance = function(child,parent){
        child.prototype = this.createProtoMiddleWare(parent);
        child.prototype.constructor = child;
    };
    function extend(child, parent) {
        InheritUtils.inheritance(child,parent);
    }
    return extend;
});