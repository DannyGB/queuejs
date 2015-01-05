/* Queue */

window.queue = function(exports) {	

	function Queue() {
		this.q = [];
	}
	
	Queue.prototype.add = function(item) {	
		// Add new item to end of array
		this.q.push(item);
	}
	
	Queue.prototype.length = function(item) {	
		// return length of array
		return this.q.length;
	}
	
	Queue.prototype.splice = function(index, howmany) {	
		// splice array
		return this.q.splice(index, howmany);
	}
	
	exports.q = Queue;
	return exports; 

}(window.queue || {})