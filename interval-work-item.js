var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

window.queue = function(_super, exports) {		

	__extends(IntervalWorkItem, _super);
	
	function IntervalWorkItem(name, type, action, checkContinue) {				
		_super.call(this, name, type, action);
		this.checkContinue = checkContinue;
	}	
	
	exports.intervalworkitem = IntervalWorkItem;
	return exports; 

}(window.queue.workitem, window.queue || {})