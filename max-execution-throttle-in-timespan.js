window.queue = function(exports) {	

	var Log = exports.log;
	
	// This is a combination of time-throttle and max-execution-throttle and is an ideal candidate for inheritance
	function MaxExecutionThrottleInTimeSpan(log) {
		if(!log) {
			throw Error("a logger must be supplied");
		}
		this.log = log;
	}
	
	MaxExecutionThrottleInTimeSpan.prototype.actionItem = function(item, itemType) {
	
		if(!itemType.maxExecutions
			|| itemType.maxExecutions <= 0
			|| !itemType.interval
			|| itemType.interval <= 0 ) {
			throw Error("MaxExecutionThrottleInTimeSpan must have properties maxExecutions & interval & they must be positive integers");
		}
		
		if(!itemType.executions) {
			itemType.executions = 0;
		}
		
		if(!itemType.lastExecuteTime) {
			itemType.lastExecuteTime = new Date();
		}
	
		if(itemType.executions < itemType.maxExecutions
			&& !this.hasThrottleTimeElapsed(itemType)) {
			this.log.info('Execution limit not reached and timespan has not expired so execute');	
			item.action();			
			itemType.executions++;
			itemType.lastExecuteTime = new Date();
		} else if(itemType.executions >= itemType.maxExecutions
			&& this.hasThrottleTimeElapsed(itemType)) {
			
			this.log.info('Execution limit is reached but timespan expired so execute');	
			
			item.action();			
			itemType.executions = 1;
			itemType.lastExecuteTime = new Date();
			
		} else {
			this.log.info('item type is max-execution-throttle-in-timespan throttled & has reached the maximum excution limit within the timespan');
		}
	}
	
	MaxExecutionThrottleInTimeSpan.prototype.hasThrottleTimeElapsed = function(itemType) {		
		var lastExecuteTime = itemType.lastExecuteTime,
			today = new Date(),
			diff = today.getTime() - lastExecuteTime.getTime(),
			days = Math.floor(diff / (1000 * 60 * 60 * 24)),
			hours,
			mins,
			seconds,
			result;
			
		diff -=  days * (1000 * 60 * 60 * 24);
		hours = Math.floor(diff / (1000 * 60 * 60));
		diff -= hours * (1000 * 60 * 60);
		mins = Math.floor(diff / (1000 * 60));
		diff -= mins * (1000 * 60);
		seconds = Math.floor(diff / (1000));
		diff -= seconds * (1000);

		result = ((seconds * 1000) > itemType.interval);
		this.log.info('elapsed milliseconds: ' + (seconds * 1000) + " interval milliseconds: " + itemType.interval);
		this.log.info('hasThrottleTimeElapsed returning: ' + result);

		return result;
	}	
	
	exports.maxexecutionthrottleintimespan = MaxExecutionThrottleInTimeSpan;
	return exports;

}(window.queue || {})