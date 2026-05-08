"use strict";
class Wire {
    constructor(outpin, inpin, direction = 1) {
        this.bent = false;
        this.bend = 1;
        this.outpin = outpin;
        outpin.wire = this;
        this.inpin = inpin;
        inpin.wire = this;
        this.direction = direction;
    }
    update(g, e) { }
    get hot() { return this.outpin.hot; }
    get xys() {
        let angltyp = Bend.angleType(this.outpin.hour, this.inpin.hour);
        //if(null==Wire.cout)return [];
        //let w=Wire.cout;
        //w.wl(`direction=${this.direction} ,bend=${this.bend} ,angletyp=${angltyp}`);
        if (90 == angltyp)
            return Bend.noBend(this.outpin, this.inpin);
        if (0 <= this.direction)
            return Bend.middle2(this.outpin, this.inpin, this.bend);
        let fwd = Bend.forward(this.outpin, this.inpin);
        let result = [];
        result.push(this.outpin.dot);
        result.push(this.inpin.dot);
        return result;
    }
    draw(g) {
        let color = 'blue';
        if (this.hot)
            color = 'red';
        g.draw(this.xys, color);
    }
    toString() { return `wire:[${this.hot}]`; }
    $(g) {
        return `Wire \r\n${this.outpin}\r\n${this.inpin}`;
    }
}
class SafeWire extends Wire {
    constructor(outpin, inpin, direction = 1) {
        super(outpin, inpin, direction);
        this._hot = false;
    }
    get hot() { return this._hot; }
    onMove(xy) { }
    draw(g) {
        let color = 'blue';
        if (this.hot)
            color = 'red';
        g.draw(this.xys, color);
    }
    update(g, e) {
        this._hot = false;
        if (null == this.outpin)
            return;
        this._hot = this.outpin.hot;
        this.inpin.set_inpin_hot(this._hot);
        //Cout.cout.wl(`1 outpin:${this.outpin.hot} ,this:${this.hot} ,inpin:${this.inpin.hot}`);
        this.draw(g);
    }
    toString() {
        return '{SafeWire hot=' + this.hot + '}';
    }
}
//# sourceMappingURL=Wire.js.map