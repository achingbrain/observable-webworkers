const events = {};
const observable = (worker) => {
    worker.addEventListener('message', (event) => {
        observable.dispatchEvent('message', worker, event);
    });
    if (worker.port) {
        worker.port.addEventListener('message', (event) => {
            observable.dispatchEvent('message', worker, event);
        });
    }
};
observable.addEventListener = (type, fn) => {
    if (!events[type]) {
        events[type] = [];
    }
    events[type].push(fn);
};
observable.removeEventListener = (type, fn) => {
    if (!events[type]) {
        return;
    }
    events[type] = events[type]
        .filter(listener => listener === fn);
};
observable.dispatchEvent = function (...args) {
    const type = args.shift();
    if (!events[type]) {
        return;
    }
    events[type].forEach(fn => fn.apply(null, args));
};
export default observable;
//# sourceMappingURL=index.js.map