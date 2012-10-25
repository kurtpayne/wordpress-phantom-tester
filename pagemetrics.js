/**
 * Page metrics class
 * Measure all the things
 */
var PageMetrics = function( o ) {
	
	/**
	 * Reference to this that won't be overriden in closures
	 * @var object
	 */
	var that            = this;
	
	/**
	 * URL of the page to measure
	 * @var string
	 */
	this.url            = o.url;
	
	/**
	 * The user role (if any) required before the page can be logged into
	 * @var string
	 */
	this.role           = o.role;
	
	/**
	 * The WebPage object used to "browse" the page
	 * @var object
	 */
	this.page           = null;
	
	/**
	 * Are we done yet?
	 * @var bool
	 */
	this.finished       = true;
	
	/**
	 * Number of requests this page took
	 * @var int
	 */
	this.num_requests   = 0;
	
	/**
	 * Number of bytes this page took
	 * @var int
	 */
	this.num_bytes      = 0;

	/**
	 * When the request started
	 * @var object
	 */
	this.start_time     = null;
	
	/**
	 * When the request finished
	 * @var object
	 */
	this.end_time       = null;

	/**
	 * Load time
	 * @var float
	 */
	this.load_time      = 0.0;
	
	/**
	 * What to do when we're done measuring
	 * @var callback
	 */
	this.callback       = null;

	/**
	 * Callback for received data event
	 * @param object res
	 */
	this.onResourceReceived = function( res ) {
		if ( "start" === res.stage ) {
			that.num_bytes += res.bodySize;
			logger.debug( "[<--]" + res.url + " [" + res.bodySize + " bytes]");
		}
	};

	/**
	 * Callback for requested data event
	 * @param object req
	 */
	this.onResourceRequested = function( req ) {
		that.num_requests++;
		logger.debug("[-->] " + req.url);
	};
	
	/**
	 * Calcluate a difference (in seconds) between two dates
	 * @param Date date1
	 * @param Date date2
	 * @return float
	 */
	this.diff_in_seconds = function( date1, date2 ) {
		return ( date1.getTime() - date2.getTime() ) / 1000;
	};

	/**
	 * Finish measuring
	 */
	 this.finish_measuring = function() {

		// Page object -- this is the browser
		this.page = Config.getPageObject();

		// These aren't reliable yet ...
		// it appears to be related to a bug in phantom and 304 (or non-200??) statuses
		// https://groups.google.com/forum/?fromgroups=#!searchin/phantomjs/304/phantomjs/yPdrsS3KOJ4/U1eNRy4_yKwJ
		this.page.onResourceRequested = that.onResourceRequested;
		this.page.onResourceReceived  = that.onResourceReceived;

		// Open the page
		this.start_time = new Date();
		this.num_bytes = 0.0;
		this.num_requests = 0;
		logger.debug( "[REQUEST] Opening " + this.url );
		this.page.onUrlChanged = function(url) {
			logger.error("[REQUEST] URL unexpectedly changed: " + url);
		}
		
		this.page.open( this.url, function( status ) {
			
			// Page is done
			that.end_time = new Date();

			// Screenshot
			if ( "success" === status ) {
				if (Config.save_screenshots) {
					logger.debug( "[SCREENSHOT] Saving screenshot for " + that.url + " to " + Config.screenshots_dir + "/" + CryptoJS.SHA1( that.url ) + ".png" );
					that.page.render( Config.screenshots_dir + "/" +  CryptoJS.SHA1( that.url ) + ".png" );
				}
			} else {
				logger.error( "[REQUEST] " + that.url + " returned status " + status );
			}

			// Display the metrics
			that.load_time = that.diff_in_seconds( that.end_time, that.start_time );
			logger.debug( "[METRICS] URL: " + that.url + " Requests: " + that.num_requests + ", Bytes: " + that.num_bytes + ", Load time: " + that.load_time );

			// Done -- we're killable now
			that.finished = true;

			// Callback
			that.callback.call( that.callback, {
				'url'          : that.url,
				'load_time'    : that.load_time,
				'num_bytes'    : that.num_bytes,
				'num_requests' : that.num_requests,
				'screenshot'   : ( Config.save_screenshots ? Config.screenshots_dir + "/" + CryptoJS.SHA1( that.url ) + ".png" : "")
			});
		});
	 };

	/**
	 * Wire up the callbacks, start the browser
	 */
	this.measure = function( callback ) {

		// Mark the request as busy so the main loop doesn't die until we're finished
		this.finished = false;

		// Save the callback ref
		this.callback = callback;

		// Login first
		if ( undefined !== this.role && null !== this.role ) {
			var login = new Login( this.role, function ( )  {
				logger.debug( "[REQUEST] Login complete." );
				that.finish_measuring();
			} );

		// Or just measure
		} else {
			this.finish_measuring();
		}
	};
};
