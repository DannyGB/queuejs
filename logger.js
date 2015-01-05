window.queue = function(exports) {	

	function Logger(log) {		
		this.loggingEnabled = log || false;	
	}
	
	Logger.prototype.info = function(text) {
		if(this.loggingEnabled) {
			console.log("info: " + text);
		}
	}		
	
	exports.log = Logger;
	return exports; 

}(window.queue || {})