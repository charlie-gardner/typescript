"use strict";
//2026-04-05
class Chip {
    constructor() {
        //TypeScript Map preserves insertion order.
        //TypeScript Map =~ C# Dictionary<TKey, TValue>
        this.outStates = new Map();
        this.inStates = new Map();
    }
    addOutPin(initial) {
        const state = { hot: initial.hot ?? false,
            xy: initial.xy,
            scale: initial.scale,
            hour: initial.hour };
        const pin = new OutPin(state);
        this.outStates.set(pin, state);
        return pin;
    }
    addInPin(initial) {
        const state = { hot: initial.hot ?? false,
            xy: initial.xy,
            scale: initial.scale,
            hour: initial.hour };
        const pin = new InPin(state);
        this.inStates.set(pin, state);
        return pin;
    }
    // OUTPIN mutation (parent → pin)
    enablePin(pin, hot) {
        let pin_ = this.outStates.get(pin);
        if (null == pin_)
            return false;
        pin_.hot = hot;
        return true;
    }
    // INPIN mutation (pin → parent)
    receiveInPinHot(pin, hot) {
        this.inStates.get(pin).hot = hot;
    }
}
//# sourceMappingURL=Chip.js.map