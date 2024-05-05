import { action } from 'mobx';

class RoutingStore {
    constructor(hub, history) {
        this.hub = hub;
        this.history = history;
    }

    @action
    go = (...args) => {
        this.history.go(...args);
    }
}

export default RoutingStore;