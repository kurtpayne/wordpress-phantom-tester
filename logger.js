/**
 * Output log messages
 */
var Logger = function() {

	/**
	 * DEBUG constant
	 * @var int
	 */
	this.DEBUG   = 0;

	/**
	 * WARNING constant
	 * @var int
	 */
	this.WARNING = 1;
	
	/**
	 * ERROR constant
	 * @var int
	 */
	this.ERROR   = 2;
	
	/**
	 * MESSAGE constant
	 * @var int
	 */
	this.MESSAGE = 3;

	/**
	 * Message
	 * @param string message
	 */
	this.message = function( string ) {
		this.log( this.MESSAGE, string );
	};

	/**
	 * Error
	 * @param string message
	 */
	this.error = function( string ) {
		this.log( this.ERROR, string );
	};

	/**
	 * Warn
	 * @param string message
	 */
	this.warn = function( string ) {
		this.log( this.WARNING, string );
	};

	/**
	 * Debug
	 * @param string message
	 */
	this.debug = function( string ) {
		this.log( this.DEBUG, string );
	};

	/**
	 * Log a message
	 * @param string level
	 * @param string message
	 */
	this.log = function( level, message ) {
		var levels = {
			0 : "DEBUG",
			1 : "WARNING",
			2 : "ERROR",
			3 : "MESSAGE"
		},
		d = new Date();
		if ( level < Config.log_level ) {
			return;
		}
		console.log( "[ " + d.toDateString() + " " + levels[ level ] + " ]: " + message );
	};
};
