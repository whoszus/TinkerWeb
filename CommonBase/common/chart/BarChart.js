/**
 * Created by skz on 2016/11/15 0015.
 */
define(['common/chart/Chart'],function (Chart) {

    var BarChart = Chart.extend({
        init: function(target,options){
            this._super(target,options)
        },
        getSeriesObj: function(seriesName,seriesData,seriesObject){
            var seriesStyle = {
                type:'bar',
//                markPoint: {
//                    data: [
//                        {type: 'max', name: '最大值'},
//                        {type: 'min', name: '最小值'}
//                    ]
//                },
//                markLine: {
//                    symbol: 'none',
//                    data: [
//                        {type: 'average', name: '平均值'}
//                    ],
//                    animation: false
//                },
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 0, 0]
                    }
                }
            };
            return this._super(seriesName,seriesData,$.extend(true,seriesStyle,seriesObject))
        }
    });
    return BarChart;
});