/**
 * Created by skz on 2016/11/9.
 */
define(['niceValidator-zh-CN'],function () {
    function Validator(target,settings) {
        this.target = $(target.indexOf('#') != -1 ? target : '#'+target);
        this.settings = $.extend(true,this.defaults,settings);
        this.validator = this.init();
    }
    Validator.prototype = {
        defaults : {
            showOk: "",
            validClass: "has-success",
            invalidClass: "has-error",
            bindClassTo: ".label-content",
            stopOnError: true,
            msgClass: 'n-right n-bubble',
            fields: {
                's1': 'required;',
                "s2" : 'required;',
                "s3" : 'required;'
            },
            rules: {
                isTimeRangeValid: function(element, param, field){
                    var startTime,endTime,flag = 0;
                    if(element.id =='startTime' || element.id =='startTime1'){
                        startTime = element.value;
                       // endTime = $($($(element).parents('.grid')[0]).next('.grid')[0]).find('#endTime,#endTime1').val();
                    }else if(element.id == 'endTime' || element.id =='endTime2'){
                        startTime = $($($(element).parents('.grid')[0]).prev('.grid')[0]).find('#startTime,#startTime1').val();
                       // endTime = element.value;
                    }
                    //(startTime && endTime) && (flag = DateUtil.getWeekGap(endTime,startTime));
                    //return flag <= ConstantsUtil.flag || {"error":ConstantsUtil.errorMsg};
                }
            }
        },
        init: function () {
            this.target.validator(this.settings);
            return this.target.data('validator');
        },
        getValidator: function () {
            return this.validator;
        },
        // 表单验证通过
        valid: function (callback) {
            this.target.on('valid.form', function(e, form){
                typeof callback == 'function' && callback(e, form);
            });
        },
        // 表单不合法
        invalid: function (callback) {
            this.target.on('invalid.form', function(e, form){
                typeof callback == 'function' && callback(e, form);
            });
        },
        // 发布
        publish: function () {
            this.target.trigger("validate");
            return this;
        },
        // 订阅
        subscribe: function (callback) {
            this.target.on('validation', function(e, current){
                // this 表示 form
                typeof callback == 'function' && callback(e, current,this);

//                if(this.isValid){
//                    callback(e,this);
//                }

            });
        },
        
        // instance
        cleanUp: function () {
            this.validator.cleanUp();
        },
        destroy: function () {
            this.validator.destroy();
        }
    };

    return Validator;
});