/*jslint plusplus: true, sloppy: true, white: true, devel: true */

// Check args
var fs = require("fs"),
    system = require("system");
if ( system.args.length < 5 ) {
    console.log("Usage: wordpress.js <base_url> <admin_username> <admin_password> <output.csv>");
    phantom.exit(1);
}

// Libraries
phantom.injectJs('./sha1.js');
phantom.injectJs('./logger.js');
phantom.injectJs('./pagemetrics.js');
phantom.injectJs('./login.js');

// Logger
var logger = new Logger();

// Config
phantom.injectJs('./config.js');

// Currently logged in user
var currentRole = "";

// Watch for everyting to die
window.setInterval( function() {
	var i = 0;
	for ( i = 0 ; i < metrics.length ; i++ ) {
		if ( !metrics[ i ].finished ) {
			logger.debug( "[REAPER] Still waiting on a page to complete ... " + metrics[i].url );
			return true;
		}
	}
	logger.debug( "[REAPER] All done ..." );
	Config.page.release();
	phantom.exit( 1 );
}, 2000 );

// Add all the pages to the stack
var i       = 0
    metrics = [];
for ( i = 0 ; i < Config.urls.length ; i++ ) {
	

	// Fudge the [base_url] bit
	var o = Config.urls[ i ];
	o.url = o.url.replace( /^\[base_url\]/, Config.base_url );

	// Measure it
	logger.debug( "[MAIN LOOP] Adding " + o.url + " to be measured " );

	// Take multiple measurements
	for ( j = 0 ; j < Config.measurements ; j++ ) {
		metrics.push( new PageMetrics( o ) );
	}
}

// Measure them one-by-one
i = 0 ;
function next( res ) {
	if ( undefined !== res ) {
		try {
			f = fs.open( system.args[ 4 ], "a" );
			f.writeLine( '"' + res.url.replace(/"/g, '""') + '","' + res.load_time + '","' + res.num_requests + '","' + res.num_bytes + '","' + res.screenshot + '"' );
			f.close();
		} catch (e) {
			logger.error("[METRICS] Cannot write to: " + system.args[ 4 ] + " Exception: " + e );
		}
		logger.message( "[METRICS] URL: " + res.url + " :: " + res.load_time + " seconds :: " + res.num_requests + " requests :: " + res.num_bytes + " :: bytes" );
	}
	if ( i < metrics.length ) {
		Config.resetPage();
		metrics[i++].measure(next);		
	}
}
f = fs.open( system.args[ 4 ], "w" );
f.writeLine( '"URL","LOAD TIME","REQUESTS","BYTES","SCREENSHOT"' );
f.close();
next();
