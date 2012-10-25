/**
 * Page metrics class
 * Measure all the things
 */
var Login = function( role, callback ) {
	
	// Local vars
	var that            = this;
	this.url            = Config.base_url + "/wp-admin";
	this.role           = role;
	this.callback       = callback;
	this.page           = null;
	this.loading        = false;

	// Exit
	this.done = function() {
		this.callback.call( this.callback );
	};

	// Wire up the callbacks
	logger.debug( "[LOGIN] Login requested for " + ( "" === this.role ? "[empty]" : this.role ) + " role" );

	// Check the cookie cache
	if ( undefined !== currentRole && null !== currentRole && "" !== currentRole && role === currentRole ) {
		logger.debug( "[LOGIN] User is already logged in as " + this.role );
		this.done();
	} else {
		this.page = Config.getPageObject();

		this.page.onUrlChanged = function(url) {
			logger.debug("[LOGIN] URL changed: " + url);
		}

		// Get the user
		var user = {};
		if ( "" === role ) {
			logger.debug( "[LOGIN] Just logging out first " );
		} else {
			user = Config.getUserByRole( that.role );
			logger.debug( "[LOGIN] Username / password for " + that.role + " is " + user.username + "/" + user.password  );
		}

		// Pounce on the login page when it's ready
		var logged_out = false,
		    intervalId = setInterval( function() {
			if ( logged_out ) {
				clearInterval( intervalId );
				
				if ( "" === role ) {
					logger.debug( "[LOGIN] Skipping login, calling callback");
					that.done();
					return;
				}

				// Log in
				that.page.open( that.url, function( status ) {

					// Get the page URL
					var url = that.page.evaluate( function() {
						return location.href;
					} );
					logger.debug( "[LOGIN] page.open( " + url + " )" );

					// Page.evaluate will block until it's complete,
					// So this can be executed serially
					that.page.onLoadFinished = function() {
						logger.debug( "[LOGIN] Done, calling callback" );
						that.done();
					};

					// Fill out the login form
					that.page.evaluate( function( username, password ) {

						// Log in
						if ( location.href.indexOf( "wp-login.php" ) > -1 ) {
							var user_input = document.getElementById("user_login"),
							    pass_input = document.getElementById("user_pass"),
							    submit     = document.getElementById("wp-submit");

							user_input.value = username;
							pass_input.value = password;				
							submit.click();
						}
					}, user.username, user.password );
				});
			}
		}, 250 );

		// Log out first
		this.page.open( this.url, function( status ) {

			// Get the page URL
			var url = that.page.evaluate( function() {
				return location.href;
			} );
			logger.debug( "[LOGIN] page.open( " + url + " )" );
			
			// Log out if we're logged in
			logged_out = that.page.evaluate( function() {
				var logout = document.getElementById("wp-admin-bar-logout");
				if ( undefined !== logout && null !== logout ) {

					// Log out first
					location.href = logout.getElementsByTagName("a")[0].getAttribute( "href" );
					return false;
				}
				return true;
			} );
		} );
	}
};
