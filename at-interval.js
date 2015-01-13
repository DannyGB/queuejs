window.queue = function(exports) {	

	var Log = exports.log;
	
	function AtInterval(log) {
		if(!log) {
			throw Error("a logger must be supplied");
		}
		this.log = log;
	}
	
	AtInterval.prototype.actionItem = function(item, itemType) {
		var intervalid = setInterval(function() {
			if(item.checkContinue()) {
				item.action();
				this.log.info('item type is at interval, interval is: ' + itemType.interval);
			} else {
				clearTimeout(intervalid);
				this.log.info('item checkContinue returned: false, stopping');				
			}
		}.bind(this), itemType.interval);	
	}		
	
	exports.atinterval = AtInterval;
	return exports; 

}(window.queue || {})
