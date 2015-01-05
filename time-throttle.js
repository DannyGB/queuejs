window.queue = function(exports) {	

	var Log = exports.log;
	
	function TimeThrottle(log) {
		if(!log) {
			throw Error("a logger must be supplied");
		}
		this.log = log;
	}
	
	TimeThrottle.prototype.actionItem = function(item, itemType) {
	
		if(!itemType.lastExecuteTime) {
			item.action();
			itemType.lastExecuteTime = new Date();				
		} else if(this.hasThrottleTimeElapsed(itemType, this.log)) {
			this.log.info('item type is throttled but outside interval');
			item.action();
			itemType.lastExecuteTime = new Date();				
		} else {
			this.log.info('item type is throttled && inside interval');				
		}
	}
	
	TimeThrottle.prototype.hasThrottleTimeElapsed = function(itemType) {
		// This may be off-loaded elsewhere
		var lastExecuteTime = itemType.lastExecuteTime;
		var today = new Date();

		var diff = today.getTime() - lastExecuteTime.getTime();

		var days = Math.floor(diff / (1000 * 60 * 60 * 24));
		diff -=  days * (1000 * 60 * 60 * 24);

		var hours = Math.floor(diff / (1000 * 60 * 60));
		diff -= hours * (1000 * 60 * 60);

		var mins = Math.floor(diff / (1000 * 60));
		diff -= mins * (1000 * 60);

		var seconds = Math.floor(diff / (1000));
		diff -= seconds * (1000);

		var result = ((seconds * 1000) > itemType.interval);
		this.log.info('elapsed milliseconds: ' + (seconds * 1000) + " interval milliseconds: " + itemType.interval);
		this.log.info('hasThrottleTimeElapsed returning: ' + result);

		return result;
	}		
	
	exports.timethrottle = TimeThrottle;
	return exports; 

}(window.queue || {})