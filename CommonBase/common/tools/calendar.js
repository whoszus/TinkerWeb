/**
 * Created by skz on 2016/11/7.
 */
define(['fullcalendar-zh-cn','bootstrap'],function () {

    /**
     *
     * @param target    日历容器ID
     * @param url       数据请求URL
     * @param post      请求参数
     * @param settings  日历配置
     * @constructor
     */
    function Calendar(target,url,post,settings) {
        this.target = $(target.indexOf('#') != -1 ? target : '#'+target);
        this.url = url;
        this.post = post || {};

        var defaults = {
            height: 650,
            buttonHtml : {
                prev : '<i class="fa fa-chevron-left"></i>',
                next : '<i class="fa fa-chevron-right"></i>'
            },
            header : {
                left : 'prev,next,today',
                center : 'title',
                right: 'month,basicWeek,agendaDay'
            },
            events: {
                url: this.url,
                type: 'POST',
                data: this.post,
                success: function (result) {

                },
                error: function(e) {

                }
            },
            editable : false,
            selectable : true,
            eventRender: function(event, element) {
                $(element).popover({
                    content: event.title,
                    trigger: 'hover',
                    placement: 'top'
                });
            }
        };

        this.settings = $.extend(true,{},defaults,settings);
        this.calendar = this.init();
    }
    Calendar.prototype = {

        /**
         *
         * @param param  url or post
         * @returns {*}
         */
        init: function (param) {
            var events = {};
            var args = Array.prototype.slice.call(arguments,1);
            if(param && typeof param == "string"){
                events.url = param;
                events.data = args.length ? args[0] : this.getPost();
            }else if(param && typeof param == 'object'){
                events.data = param;
            }

            if(!$.isEmptyObject(events)) {
                this.settings = $.extend(true,{},this.settings,{events: events});
            }else{
                this.settings = $.extend(true,{},this.settings,{events: {data: this.getPost()}});
            }
            return this.target.fullCalendar(this.settings);
        },
        getCalendar: function () {
            return this.calendar;
        },
        getEventsSource: function () {
            return this.target.fullCalendar('getEventSources');
        },
        setOption: function (name,value) {
            this.target.fullCalendar('option', name, value);
        },
        setPost: function (post) {
            this.post = post;
        },
        getPost: function () {
            return this.post;
        },
        destroy: function () {
            this.target.fullCalendar('destroy');
        },
        render: function () {
            this.target.fullCalendar('render');
        },
        /**
         * 在已有的resource下追加数据
         * @param resource
         * @param scroll   滚动到新添加的数据
         */
        addResource: function (resource, scroll) {
            this.target.fullCalendar( 'addResource', resource, scroll )
        },
        refetchEventSources: function (source) {
            this.target.fullCalendar( 'refetchEventSources',source );
        },
        refetchEvents: function () {
            this.target.fullCalendar('refetchEvents')
        }
    };

    return Calendar;
});