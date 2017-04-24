/**
 * Created by skz on 2016/11/13.
 */
define(['jquery','echarts3','common/tools/Class'],function ($,ec,Class) {

    var Chart = Class.extend({
        init: function(target,options){
            this.target = target;
            this.options = $.extend(true,{},this.getSettings(),options);
        },
        /**
         * 初始化
         * @param options  配置项
         */
        initial: function(options){
            var chart = ec.init(document.getElementById(this.target));
            chart.setOption(options);
        },
        /**
         * 获取默认配置项
         * @returns {{title: {text: string, subtext: string}, tooltip: {trigger: string}, legend: {x: string, y: string, left: number, itemWidth: number, itemHeight: number, data: Array}, grid: {left: string, right: string, bottom: string, containLabel: boolean}, xAxis: {type: string, boundaryGap: boolean, data: Array}, yAxis: {type: string}, series: Array}}
         */
        getSettings: function(){
            return {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x : 'left',
                    y: 'bottom',
                    left: 10,
                    itemWidth: 16,
                    itemHeight: 16,
                    data:[]
                },
                calculable : true,
                /*toolbox: {
                 show: true,
                 feature: {
                 magicType: {type: ['line', 'bar']},
                 restore: {}
                 }
                 },*/
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top: '2%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'category',
                    //boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            }
        },
        /**
         * 获取 Series 对象
         * @param {string} seriesName
         * @param {array} seriesData
         * @param {object} seriesObject
         * @returns {{name: string, type: string, data: Array, symbol: string, markPoint: {data: {type: string, name: string}[]}, markLine: {symbol: string, data: {type: string, name: string}[], animation: boolean}, itemStyle: {normal: {barBorderRadius: number[]}}}}
         */
        getSeriesObj: function(seriesName,seriesData,seriesObject){
            var args = Array.prototype.slice.call(arguments);
            var argumentSize = args.length;
            var Obj = {
                name: '',
                type:'line',
                data: []
            };

            if(argumentSize === 1 && $.type(args[0]) === 'object'){
                Obj = $.extend(true,{},Obj,args[0]);
            }else if(argumentSize === 2 && $.type(args[0]) === 'string' && $.type(args[1]) === 'array'){
                Obj.name = args[0];
                Obj.data = args[1]
            }else if(argumentSize === 3){
                Obj.name = args[0];
                Obj.data = args[1];
                Obj = $.extend(true,{},Obj,args[2]);
            }else {
                throw new Error('arguments error')
            }

            return Obj;
        },
        /**
         * 设置Series
         * @param {object} seriesObject
         * @returns {*}
         */
        setSeries: function(seriesObject){
            if($.type(seriesObject) === 'array'){
                this.options.series = seriesObject;
            }else{
                this.options.series.push(seriesObject);
            }
            return this.options;
        },
        /**
         * 设置 横坐标数据
         * @param {array} data
         * @returns {*}
         */
        setxAxisData: function(data){
            this.options.xAxis.data = data || [];
            return this.options;
        },
        /**
         * 设置 lengend
         * @param {object} legend  legend 对象
         * @returns {*}
         */
        setLegend: function(legend){
            legend = $.extend(true,{},this.options.legend,legend);
            this.options.legend = legend;
            return this.options;
        },
        /**
         * 设置legend data
         * @param {array} legend  legend data 数据
         * @returns {*}
         */
        setLegendData: function(legend){
            this.options.legend.data = legend || [];
            return this.options;
        },
        /**
         * 设置title
         * @param {string} text    标题
         * @param {string} subtext 副标题
         * @param {object} titleObject  title 对象
         * @returns {*}
         */
        setTitle: function(text,subtext,titleObject){
            var args = Array.prototype.slice.call(arguments);
            var argumentSize = args.length;

            if(argumentSize === 1 && $.type(args[0]) === 'object'){
                this.options.title = $.extend(true,{},this.options.title,args[0]);
            }else if(argumentSize === 1 && $.type(args[0]) === 'string'){
                this.options.title.text = args[0];
            }else if(argumentSize === 2 && $.type(args[0]) === 'string' && $.type(args[1]) === 'string'){
                this.options.title.text = args[0];
                this.options.title.subtext = args[1]
            }else if(argumentSize === 3){
                this.options.title.text = args[0];
                this.options.title.subtext = args[1];
                this.options.title = $.extend(true,{},this.options.title,args[2]);
            }else {
                throw new Error('arguments error')
            }
            return this.options;
        },
        /**
         * 设置option
         * @param options
         */
        setOptions: function(options){
            this.options = $.extend(true,this.options,options);
        },
        /**
         * 获取option
         * @returns {*}
         */
        getOptions: function(){
            return this.options;
        }
    });
    return Chart;
});