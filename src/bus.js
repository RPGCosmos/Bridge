
class EventBus {
	constructor() {
		this.listeners = {};
	}
	addEventListener(type, callback, scope) {
		console.log("EventBus: addEventListener")
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		}
		args = args.length > 3 ? args.splice(3, args.length-1) : [];
		if(typeof this.listeners[type] != "undefined") {
			this.listeners[type].push({scope, callback, args});
		} else {
			this.listeners[type] = [{scope, callback, args}];
		}
	}
	removeEventListener(type, callback, scope) {
		console.log("EventBus: removeEventListener")
		if(typeof this.listeners[type] != "undefined") {
			var numOfCallbacks = this.listeners[type].length;
			var newArray = [];
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				if(listener.scope == scope && listener.callback == callback) {

				} else {
					newArray.push(listener);
				}
			}
			this.listeners[type] = newArray;
		}
	}

	hasEventListener(type, callback, scope) {
		console.log("EventBus: hasEventListener")
		if(typeof this.listeners[type] != "undefined") {
			var numOfCallbacks = this.listeners[type].length;
			if(callback === undefined && scope === undefined){
				return numOfCallbacks > 0;
			}
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				if((scope ? listener.scope == scope : true) && listener.callback == callback) {
					return true;
				}
			}
		}
		return false;
	}
	dispatchEvent(type, target) {
		console.log(`EventBus: dispatchEvent(${type}, ${target})`)
		var event = {
			type: type,
			target: target
		};
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		};
		args = args.length > 2 ? args.splice(2, args.length-1) : [];
		args = [event].concat(args);


		if(typeof this.listeners[type] != "undefined") {
			var listeners = this.listeners[type].slice();
			var numOfCallbacks = listeners.length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = listeners[i];
				if(listener && listener.callback) {
					var concatArgs = args.concat(listener.args);
					listener.callback.apply(listener.scope, concatArgs);
				}
			}
		}
	}

	getEvents() {
		var str = "";
		for(var type in this.listeners) {
			var numOfCallbacks = this.listeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
				str += " listen for '" + type + "'\n";
			}
		}
		return str;
	}
}

export default new EventBus;