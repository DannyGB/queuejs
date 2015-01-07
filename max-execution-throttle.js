window.queue = function(exports) {	

	var Log = exports.log;
	
	function MaxExecutionThrottle(log) {
		if(!log) {
			throw Error("a logger must be supplied");
		}
		this.log = log;
	}
	
	MaxExecutionThrottle.prototype.actionItem = function(item, itemType) {
	
		if(!itemType.maxExecutions
		|| itemType.maxExecutions <= 0) {
			throw Error("MaxExecutionThrottle must have property maxExecutions & be a positive integer");
		}
		
		if(!itemType.executions) {
			itemType.executions = 0;
		}
	
		if(!itemType.executions 
		|| itemType.executions < itemType.maxExecutions ) {
			item.action();			
			itemType.executions++;		
		} else {
			this.log.info('item type is max-execution throttled & has reached the maximum excution limit');				
		}
	}
	
	exports.maxexecutionthrottle = MaxExecutionThrottle;
	return exports; 

}(window.queue || {})