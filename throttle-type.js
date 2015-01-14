window.queue = function(exports) {	

	//{ id: 1, throttle: "time-throttle", interval: 100 }

	function ThrottleType(id, throttle, interval) {
		this.id = id;
		this.throttle = throttle;
		this.interval = interval;
	}	
	
	exports.throttletype = ThrottleType;
	return exports; 

}(window.queue || {})