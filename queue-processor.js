
window.queue = function(exports) {	

	var Queue = exports.q,
		Types = exports.types,
		TimeThrottle = exports.timethrottle,
		MaxExecuteThrottle = exports.maxexecutionthrottle,
		MaxExecuteThrottleInTimeSpan = exports.maxexecutionthrottleintimespan,
		AtInterval = exports.atinterval,
		Log = exports.log;
	
	function Processor(queue, registeredTypes, throttles, processInterval, log) {
	
		this.availableStates = { 
			"stopped" : "stopped",
			"running" : "running"
		};
		
		this.q = queue;	
		this.types = registeredTypes;		
		this.processInterval = processInterval || 3000;		
		this.log = log;
		this.log.info('Processing every: ' + this.processInterval);	
		this.processors = {
			"time-throttle": throttles["time-throttle"],
			"max-execution-throttle" : throttles["max-execution-throttle"],
			"max-execution-throttle-in-timespan": throttles["max-execution-throttle-in-timespan"],
			"at-interval" : throttles["at-interval"]
		};
		this.intervalId;
		this.startedHandlers = [];
		this.stoppedHandlers = [];

		this._fireStopHandlers = function() {
			this._fireHandlers(this.stoppedHandlers);
		}

		this._fireStartHandlers = function() {
			this._fireHandlers(this.startedHandlers);
		}

		this._fireHandlers = function(handlers) {
			// Could we use a setInterval here to process the requests?
			for(var i=0;i<handlers.length;i++) {
				handlers[i]();
			}
		}
	}
		
	Processor.prototype.start = function() {
		
		this.state = this.availableStates.running;
		this.intervalId = setInterval(function() {
			this.log.info('processor tick');			
			if(this.q.length() > 0) {	
				// Get first array item and remove it from the q			
				var item = this.q.splice(0,1)[0];			
				this.log.info('processing item: ' + item.name);
				this._actionItem(item);

				if(this.q.length() <= 0) {
					this.stop();
					this.log.info('No work, stop stopping the processor, this.state: ' + this.state);					
				}
			}
		}.bind(this), this.processInterval);

		this._fireStartHandlers();
	}

        Processor.prototype.stop = function() {
		if(this.intervalId && this.state === this.availableStates.running) {
			this.state = this.availableStates.stopped;
			clearInterval(this.intervalId);		
			this._fireStopHandlers();			
			this.log.info('Received stop request, this.state: ' + this.state);	
		}		
	}	

	Processor.prototype._actionItem = function(item) {
		// decide whether this item should be actioned
		var itemType = this.getItemType(item);
		if(itemType.throttle) {
			this.log.info('item type is throttled');			
	
			if(!this.processors[itemType.throttle]) {
				throw Error("Attempting to use unknown throttle processor: " + itemType.throttle);
			}
						
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
		
		// Return anonymous throttle type
		return { id: -1, throttle: false };
	}	
	
	Processor.prototype.addToQueue = function(item) {
		this.q.add(item);
		if(this.state === this.availableStates.stopped) {
			this.start();
		}
	}
	
	Processor.prototype.registerType = function(item) {
		this.types.register(item);
	}	

	Processor.prototype.stopped = function(callback) {
		this.stoppedHandlers.push(callback);
	}

	Processor.prototype.started = function(callback) {
		this.startedHandlers.push(callback);
	}
		
	var log = new Log(true);
	var processor = new Processor(new Queue(), new Types(), 
		{ 
			"time-throttle": new TimeThrottle(log), 
			"max-execution-throttle" : new MaxExecuteThrottle(log), 
			"max-execution-throttle-in-timespan": new MaxExecuteThrottleInTimeSpan(log),
			"at-interval": new AtInterval(log)
		}, 
		1000, log);
		
	processor.start();
	
	exports.processor = processor;
	return exports;
	
}(window.queue)
