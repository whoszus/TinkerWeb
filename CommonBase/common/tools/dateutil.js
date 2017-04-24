/**
 * Created by skz on 2016/11/8.
 */
define(['moment'],function (moment) {

    var format = 'YYYY-MM-DD HH:mm:ss';

    return {
        getToday: function (fmt) {
            return moment().format(fmt || format);
        },
        getYesterday: function (fmt) {
          return moment().subtract(1,'days').format(fmt || format);
        },
        getTomorrow: function (fmt) {
            return moment().add(1,'days').format(fmt || format);
        },
        getLastThirdDay: function (fmt) {
            return moment().subtract(3,'days').format(fmt || format);
        },
        getLastWeek: function (fmt) {
            return moment().subtract(1,'week').format(fmt || format);
        },
        getLastMonth: function (fmt) {
            return moment().subtract(1,'month').format(fmt || format);
        }
    };
});