export interface Listener {
    (...args: any[]): void;
}
declare const observable: {
    (worker: Worker & {
        port?: any;
    }): void;
    addEventListener(type: string, fn: Listener): void;
    removeEventListener(type: string, fn: Listener): void;
    dispatchEvent(...args: any[]): void;
};
export default observable;
//# sourceMappingURL=index.d.ts.map