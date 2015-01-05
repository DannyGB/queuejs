window.queue = function(exports) {	

	function Types() {
		this.types = [];
	}
	
	Types.prototype.register = function(item) {	
		// Add new item to end of array
		this.types.push(item);
	}
	
	Types.prototype.getTypeById = function(id) {
		for(var i=0;i<this.types.length;i++) {
			if(this.types[i].id === id) {				
				return this.types[i];
			}
		}
		
		return null;
	}
	
	/*Types.prototype.remove = function(item) {	
		// Add new item to end of array
		this.types.push(item);
	}*/
	
	exports.types = Types;
	return exports; 

}(window.queue || {})