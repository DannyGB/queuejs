window.queue = function(exports) {		
	
	function AnonWorkItem(name, action) {						
		this.name = name;		
		this.action = action;
	}	
	
	exports.anonworkitem = AnonWorkItem;
	return exports; 

}(window.queue || {})