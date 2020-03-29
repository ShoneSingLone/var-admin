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

const events = {};

const on = (name, callback) => {
    events[name] = events[name] || [];
    events[name].push(callback);
};

const off = (name) => {
    delete events[name];
};

const trigger = (name, data) => {
    let callbacks = events[name] || [];
    callbacks.map(callback => {
        callback(data);
    });
};

export default {
    on,
    off,
    trigger
};