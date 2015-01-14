var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

window.queue = function(_super, exports) {		

	__extends(MaxExecutionThrottleType, _super);
	
	function MaxExecutionThrottleType(id, throttle, interval, maxExecutions) {				
		_super.call(this, id, throttle, interval);
		this.maxExecutions = maxExecutions;
	}	
	
	exports.maxexecutionthrottletype = MaxExecutionThrottleType;
	return exports; 

}(window.queue.throttletype, window.queue || {})