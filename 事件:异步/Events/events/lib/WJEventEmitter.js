const NEW_LISTENER = 'newListener';
const REMOVE_LISTENER = 'removeListener';
class WJEventEmitter {

    constructor() {
        this.hander = {
            NEW_LISTENER: [],
            REMOVE_LISTENER:[]
        };
    }
    on(eventName, listener) {
        let listeners = this.hander[eventName];
        if (!listeners) {
            listeners = [];
            this.hander[eventName] = listeners;
        }
        listeners.push(listener);

        this.emit(NEW_LISTENER, listener);
    }
    off(eventName, listener) {
        let listeners = this.hander[eventName] || [];
        let index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }

        this.emit(REMOVE_LISTENER, listener);
    }
    emit(eventName, ...args) {
        const listeners = this.hander[eventName] || [];
        listeners.forEach(listener => {
            listener.call(this, ...args);
        })
    }
}


module.exports = WJEventEmitter;
