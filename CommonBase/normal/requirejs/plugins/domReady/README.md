# Page Load Event Support/DOM Ready
It is possible when using RequireJS to load scripts quickly enough that they complete before the DOM is ready. Any work that tries to interact with the DOM should wait for the DOM to be ready. For modern browsers, this is done by waiting for the DOMContentLoaded event.
However, not all browsers in use support DOMContentLoaded. The domReady module implements a cross-browser method to determine when the DOM is ready. Download the module and use it in your project like so:

	```javascript
	require(['domReady'], function (domReady) {
	  domReady(function () {
	    //This function is called once the DOM is ready.
	    //It will be safe to query the DOM and manipulate
	    //DOM nodes in this function.
	  });
	});
	```

Since DOM ready is a common application need, ideally the nested functions in the API above could be avoided. The domReady module also implements the Loader Plugin API, so you can use the loader plugin syntax (notice the ! in the domReady dependency) to force the require() callback function to wait for the DOM to be ready before executing.
```domReady```
will return the current document when used as a loader plugin:

	```
	require(['domReady!'], function (doc) {
	    //This function is called once the DOM is ready,
	    //notice the value for 'domReady!' is the current
	    //document.
	});
	```
Note: If the document takes a while to load (maybe it is a very large document, or has HTML script tags loading large JS files that block DOM completion until they are done), using domReady as a loader plugin may result in a RequireJS "timeout" error. If this is a problem either increase the waitSeconds configuration, or just use domReady as a module and call domReady() inside the require() callback.