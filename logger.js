window.queue = function(exports) {	

	function Logger(log) {		
		this.loggingEnabled = log || false;	
	}
	
	Logger.prototype.info = function(text) {
		if(this.loggingEnabled) {
			console.log("info: " + text);
		}
	}		

	Logger.prototype.error = function(text) {
		if(this.loggingEnabled) {
			console.log("error: " + text);
		}
	}	
	
	Logger.prototype.debug = function(text) {
		if(this.loggingEnabled) {
			console.log("debug: " + text);
		}
	}	

	exports.log = Logger;
	return exports; 

}(window.queue || {})
