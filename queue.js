/* Queue */

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

window.queue = function(_super, exports) {	

	__extends(Queue, _super);
	
	function Queue() {
	}
	
	Queue.prototype.add = function(item) {	
		// Add new item to end of array
		this.push(item);
	}	
	
	exports.q = Queue;
	return exports; 

}(Array, window.queue || {})