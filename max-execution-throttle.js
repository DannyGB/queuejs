window.queue = function(exports) {	

	var Log = exports.log;
	
	function MaxExecutionThrottle(log) {
		if(!log) {
			throw Error("a logger must be supplied");
		}
		this.log = log;
	}
	
	MaxExecutionThrottle.prototype.actionItem = function(item, itemType) {
			
	}
	
	MaxExecutionThrottle.prototype.isExecutionLimitReached = function(itemType) {
		

		return result;
	}		
	
	exports.maxexecutionthrottle = MaxExecutionThrottle;
	return exports; 

}(window.queue || {})