/**
 * Created by skz on 2016/11/16 0016.
 */
define(['common/chart/Chart'],function (Chart) {

    var PieChart = Chart.extend({
        init: function(target,options){
            var pieOptions = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                xAxis:  null,
                yAxis: null,
                legend: {
                    x : 'center',
                    y: 'bottom'
                },
                calculable : true,
                grid: null
            };
            this._super(target,$.extend(true,{},pieOptions,options))
        },
        getSeriesObj: function(seriesName,seriesData,seriesObject){
            // 饼图 Series 样式
            var seriesStyle = {
                type: 'pie',
                color: ['#6FC71E','#F46C68','#4FA8FA','#F09601','#4AC2EF'],
                radius : '55%',
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            };
            return this._super(seriesName,seriesData,$.extend(true,seriesStyle,seriesObject))
        }
    });
    return PieChart;
});