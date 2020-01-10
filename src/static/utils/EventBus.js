/* const events = {};

const on = (name, self, callback) => {
    let tuple = [self, callback];
    let callbacks = events[name];
    if (_.isArray(callbacks)) {
        callbacks.push(tuple);
    } else {
        events[name] = [tuple];
    }
}

const remove = (name, self) => {
    let callbacks = events[name];
    if (_.isArray(callbacks)) {
        events[name] = callbacks.filter((tuple) => {
            return tuple[0] != self;
        })
    }
}

const emit = (name, data) => {
    let callbacks = events[name];
    if (_.isArray(callbacks)) {
        callbacks.map((tuple) => {
            let self = tuple[0];
            let callback = tuple[1];
            callback.call(self, data);
        })
    }
}

export default {
    on: on,
    remove: remove,
    emit: emit,
}; */


const {
    _
} = window;

const events = {};
const on = (name, callback) => {
    let callbacks = events[name];
    if (_.isArray(callbacks)) {
        callbacks.push(callback);
    } else {
        events[name] = callback;
    }
}

const remove = (name, self) => {
    delete events[name];
}

const emit = (name, data) => {
    let callbacks = events[name];
    if (_.isArray(callbacks)) {
        callbacks.map((tuple) => {
            callback(data);
        })
    } else if (_.isFunction(callbacks)) {
        callbacks(data)
    }
}

export default {
    on: on,
    remove: remove,
    emit: emit,
};