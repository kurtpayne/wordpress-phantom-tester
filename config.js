/**
 * Configuration
 */
var Config = {

	// Base WordPress URL ... all other URLs *can* be built from this
	base_url          : system.args[ 1 ],
	
	// Save a screenshot of each page?  This is slow
	save_screenshots  : true,
	screenshots_dir   : "./screenshots",
	
	// What to output to the console
	// Values are logger.DEBUG, logger.WARNING, logger.ERROR, logger.MESSAGE
	// lower levels are inclusive of higher levels
	log_level         : logger.DEBUG,
	
	// How big the screen?  What user agent?
	// Tweak these to emulate mobile and test responsive designs
	viewPort          : {
		width  : 1024,
		height : 768
	},
	userAgent         : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.79 Safari/537.1"',
	
	// Is your site behind .htaccess protection?
	username          : "",
	password          : "",
	
	// Admin user.  This list may grow to include other user roles
	// in the future, too
	users             : [
		{
			"username" : system.args[ 2 ],
			"password" : system.args[ 3 ],
			"role"     : 'administrator'
		}
	],
	
	// Which URLs to visit.  Include [base_url]/index.php as the first part of the URL
	// to have the main loop replace it with Config.base_url above
	// If the URL requires a logged in user, just pass in a role and
	// The user will be logged in first
	urls          : [
		//*
		{
			"url"  : "[base_url]/index.php/sample-page/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2012/08/hello-world/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/06/post-format-test-gallery/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/06/post-format-test-chat/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/05/14/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/05/many-categories/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/05/many-tags/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/04/test-with-secret-password/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/03/comment-test/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/2008/03/many-trackbacks/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/index.php/level-1/level-2/level-3/",
			"role" : ""
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/options-permalink.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/themes.php?page=theme_options",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/widgets.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/nav-menus.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/theme-install.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/themes.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/plugin-editor.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/plugin-install.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/plugins.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/profile.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/user-new.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/users.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/tools.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/options-general.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/options-writing.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/options-reading.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/options-discussion.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/options-media.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/options-privacy.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/theme-editor.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/edit-comments.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/edit-tags.php?taxonomy=category",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/edit-tags.php?taxonomy=post_tag",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/index.php",
			"role" : "administrator"
		},
		//*/

		//*
		{
			"url"  : "[base_url]/wp-admin/update-core.php",
			"role" : "administrator"
		},
		//*/

		/** Phantom doesn't like these ... flash? **/

		/*
		{
			"url"  : "[base_url]/wp-admin/edit.php",
			"role" : "administrator"
		},
		//*/
		
		/*
		{
			"url"  : "[base_url]/wp-admin/edit.php?post_type=page",
			"role" : "administrator"
		},
		//*/

		/*
		{
			"url"  : "[base_url]/wp-admin/post-new.php?post_type=page",
			"role" : "administrator"
		},
		//*/

		/*
		{
			"url"  : "[base_url]/wp-admin/upload.php",
			"role" : "administrator"
		},
		//*/

		/*
		{
			"url"  : "[base_url]/wp-admin/media-new.php",
			"role" : "administrator"
		},
		//*/
		
		/*
		{
			"url"  : "[base_url]/wp-admin/post-new.php",
			"role" : "administrator"
		},
		//*/
	],
	
	// webpage object
	page: null,

	/**
	 * Reset the page object
	 */
	resetPage: function() {
		if ( undefined !== Config.page && null !== Config.page ) {
			Config.page.release();
			Config.page = null;
		}
	},

	/**
	 * Get the phantom webpage object consistently
	 * @return object
	 */
	getPageObject: function() {
		if ( undefined === Config.page || null === Config.page ) {
			var page = require( "webpage" ).create();
			page.viewportSize = {
				width  : Config.viewPort.width,
				height : Config.viewPort.height
			};
			page.settings.userAgent = Config.userAgent;
			page.settings.localToRemoteUrlAccessEnabled = true;
			page.settings.loadImages = true;
			page.settings.javascriptEnabled = true;
			page.settings.XSSAuditingEnabled = false;
			page.settings.webSecurityEnabled = false;

			// Lisen for console messages
			page.onConsoleMessage = function (msg, line, source) {
				logger.warn( "[PAGE] [" + page.evaluate(function() { return location.href;} ) + "] " + JSON.stringify({
					message: msg,
					lineNumber: line,
					source: source
				}, null, 4));
			};

			// Listen for errors
			page.onError = 	function ( message, trace ) {		
				logger.error( "[PAGE] [" + page.evaluate(function() { return location.href;} ) + "] " + message + "\n" + JSON.stringify( trace, undefined, 4 ) );
			};

			// Turn on accept-encoding: gzip
			// .... this doesn't seem to work so well
			// jQuery and other scripts fail to load
			/*
			page.customHeaders = {
				'Accept-encoding' : 'gzip'
			};
			*/

			// .htaccess protection
			if ( "" !== Config.username || "" !== Config.password ) {
				page.settings.userName  = Config.username;
				page.settings.userwame  = Config.password;
			}
			
			Config.page = page;
		}
		return Config.page;
	},
	
	/**
	 * Get a user for a specific role
	 * @param string role (e.g. administrator)
	 * @return object
	 */
	getUserByRole: function( role ) {
		var i = 0;		
		logger.debug( "[CONFIG] Finding a user for " + role );		
		for ( i = 0 ; i < Config.users.length ; i++ ) {
			if ( undefined !== Config.users[ i ].role && null !== Config.users[ i ].role && role === Config.users[ i ]['role'] ) {
				logger.debug( "[CONFIG] User " + Config.users[ i ].username + " is acceptable" );
				return Config.users[ i ];
			}
		}
		logger.debug( "[CONFIG] No users found for " + role );
		return {};
	}
};
