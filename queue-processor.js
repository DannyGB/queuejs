
window.queue = function(exports) {	

	var Queue = exports.q;
	var Types = exports.types;
	var TimeThrottle = exports.timethrottle;
	var Log = exports.log;
	
	function Processor(queue, registeredTypes, throttle, processInterval, log) {
		this.q = queue;	
		this.types = registeredTypes;
		this.throttle = throttle;
		this.processInterval = processInterval || 3000;		
		this.log = log;
		this.log.info('Processing every: ' + this.processInterval);	
		this.processors = {
			"time-throttle": this.throttle,
			"max-execution-throttle" : this.throttle
		};
	}
		
	Processor.prototype.start = function() {
		
		setInterval(function() {
			this.log.info('processor tick');			
			if(this.q.length() > 0) {	
				// Get first array item and remove it from the q			
				var item = this.q.splice(0,1)[0];			
				this.log.info('processing item: ' + item.name);
				this.actionItem(item);				
			}
		}.bind(this), this.processInterval);	
	}
	
	Processor.prototype.actionItem = function(item) {
		// decide whether this item should be actioned
		var itemType = this.getItemType(item);
		if(itemType.throttle) {
			// Type is throttled
			this.log.info('item type is throttled');			
			//this.throttle.actionItem(item, itemType);				
			this.processors[itemType.throttle].actionItem(item, itemType);
			return;
		}
		
		// Action anonymous work items directly
		if(!item.type) {
			item.action();
		}
	}	

	Processor.prototype.getItemType = function(item) {
		this.log.info('getting the items type');
		if(this.types) {
			var type = this.types.getTypeById(item.type);
			if(type) {
				return type;
			}
		}
		
		return { id: -1, throttle: false };
	}	
	
	Processor.prototype.addToQueue = function(item) {
		this.q.add(item);
	}
	
	Processor.prototype.registerType = function(item) {
		this.types.register(item);
	}	
		
	var log = new Log(true);
	var processor = new Processor(new Queue(), new Types(), new TimeThrottle(log), 1000, log);
	processor.start();
	
	exports.processor = processor;
	return exports;
	
}(window.queue)