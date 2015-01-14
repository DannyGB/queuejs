var __extends = this.__extends || function (d, b) {
	for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	function __() { this.constructor = d; }
	__.prototype = b.prototype;
	d.prototype = new __();
};
	
window.queue = function(_super, exports) {	

	__extends(Types, _super);
	
	function Types() {		
	}
	
	Types.prototype.register = function(item) {	
		// Add new item to end of array		
		var isExistingType = this.map(function(type) {
			return type.id === item.id;
		}).indexOf(true);
		
		if(isExistingType >= 0) {
			throw Error('A type with this id is already registered: ' + item.id);
		}
				
		this.push(item);
	}
	
	Types.prototype.getTypeById = function(id) {		
		for(var i=0;i<this.length;i++) {				
			if(this[i].id === id) {								
				return this[i];
			}
		}
		
		return null;
	}
	
	exports.types = Types;
	return exports; 

}(Array, window.queue || {})