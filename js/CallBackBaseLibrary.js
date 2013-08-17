// ***********
// CALLBACK BASE LIBRARY
// @author Willem Mulder
// ***********

var CallBackBaseLibrary = (function() {

	var callbacks = {};

	return {

		// Callback functions
		on : function(callbackName, callback) {
			callbacks[callbackName] = callbacks[callbackName] || [];
			callbacks[callbackName].push(callback);
		},

		off : function(callbackName, callback) {
			// Remove specific callback
			if (callbackName && callback) {
				if (callbacks[callbackName]) {
					var index = callbacks[callbackName].indexOf(callback);
					if (index > -1) {
						delete callbacks[callbackName][index];
					}
				}
			// Remove all callbacks under this callbackName
			} else if (callbackName) {
				if (callbacks[callbackName]) {
					delete callbacks[callbackName];
				}
			}
		},

		trigger : function(callbackName) {
			if (callbacks[callbackName]) {
				for(var index in callbacks[callbackName]) {
					if (callbacks[callbackName].hasOwnProperty(index)) {
						var callback = callbacks[callbackName][index];
						callback.apply(this, Array.prototype.slice.call(arguments,1));
					}
				}
			}
		},

		returnPublicProperties : function(lib, properties) {
			if (!lib.changed) {
				function Intermediate() {
					for(var index in properties) {
						this[index] = properties[index];
					}
				}
				Intermediate.prototype = lib.prototype;
				lib.prototype = new Intermediate();
				lib.changed = true;
				return new lib(); // Return an instance where the prototype chain is set correctly
			} else {
				return true;
			}
		}
	};
});