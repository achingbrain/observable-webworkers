import observe from '../src/index.js';
describe('observable-webworkers', () => {
    it('should spawn a worker', (done) => {
        var myblob = URL.createObjectURL(new Blob(['postMessage("ok")'], {
            type: 'text/plain'
        }));
        const worker = new Worker(myblob);
        observe(worker);
        observe.addEventListener('message', (worker, event) => {
            worker.terminate();
            done();
        });
    });
});
//# sourceMappingURL=test.js.map