/**
 * Created by skz on 2016/11/17 0017.
 */
define(function () {

    return {
        hasStyle: function(id){
            var head = document.getElementsByTagName('head')[0];
            var style = head.getElementsByTagName('style');
            for(var i = 0, len = style.length; i < len; i++){
                if(style[i].id === id){
                    return true;
                }
            }
        },
        getStyle: function(id,text,callback){
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.id = id;
            style.textContent = text;

           /* var done = false;
            // Attach handlers for all browsers
            style.onload = style.onreadystatechange = function() {
                if (!done && (!this.readyState ||
                    this.readyState == 'loaded' || this.readyState == 'complete')) {
                    done = true;
                    if (callback)
                        callback();
                    // Handle memory leak in IE
                    style.onload = style.onreadystatechange = null;
                    console.log(done)
                }

            };*/
            head.appendChild(style);
            // We handle everything using the style element injection
            return undefined;
        },
        getStyleLink: function(url,callback){
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.href = url;
            style.rel="stylesheet";

            var done = false;
            // Attach handlers for all browsers
            style.onload = style.onreadystatechange = function() {
                if (!done && (!this.readyState ||
                    this.readyState == 'loaded' || this.readyState == 'complete')) {
                    done = true;
                    if (callback)
                        callback();
                    // Handle memory leak in IE
                    style.onload = style.onreadystatechange = null;
                }
            };
            head.appendChild(style);
            // We handle everything using the style element injection
            return undefined;
        }
    };
});