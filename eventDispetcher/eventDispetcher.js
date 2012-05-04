var eventHandler = function(handler) {
    this.event = handler.event;
    this.callback = handler.callback;
    this.key = handler.key;
};

var eventDispetcher = function() {
    this.handlers = {};
};

eventDispetcher.prototype.addHandler = function(handler) {
    if (!this.handlers[handler.event]) {
        this.handlers[handler.event] = {};
    }
    this.handlers[handler.event][handler.key] = handler;
};

eventDispetcher.prototype.registerEvent = function(event) {
    if (this.handlers[event]) {
        for (key in this.handlers[event]) {
            setTimeout(this.handlers[event][key].callback, 0);
        }
    }
};