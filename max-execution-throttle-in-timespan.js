var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

window.queue = function(_super, exports) {	

	var Log = exports.log;
	
	__extends(MaxExecutionThrottleInTimeSpan, _super);
		
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
		
	exports.maxexecutionthrottleintimespan = MaxExecutionThrottleInTimeSpan;
	return exports;

}(window.queue.timethrottle, window.queue || {})