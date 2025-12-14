"use strict";
//2024-11-03
class Wire {
    constructor(outpin, inpin) {
        this.bend = -1;
        this.outpin = outpin;
        this.outpin.wire = this;
        this.inpin = inpin;
        this.inpin.wire = this;
    }
    get hot() {
        if (null == this.outpin)
            return false;
        return this.outpin.hot;
    }
    draw(g) {
        g.lineWidth = 2;
        g.closePath = false;
        g.fill = false;
        let color = Wire.color;
        if (this.hot)
            color = 'red';
        g.draw(this.xys, color); //here
        g.resetCtx();
    }
    static angleType(angle1, angle2) {
        let diff = Math.max(angle1, angle2) - Math.min(angle1, angle2);
        //if(0==diff) return 180;if(6==diff) return 180;
        if (3 == diff)
            return 90;
        if (9 == diff)
            return 90;
        return 180;
    }
    static vertical(angle) {
        if (12 == angle)
            return true;
        if (6 == angle)
            return true;
        if (0 == angle)
            return true;
        return false;
    }
    static forward(outpin, inpin) {
        let angle = outpin.hour; //both angles same
        if (0 == angle || 12 == angle) //facing up
            if (inpin.xy[1] < outpin.xy[1])
                return false;
        if (6 == angle) //facing down
            if (outpin.xy[1] < inpin.xy[1])
                return false;
        if (3 == angle) //facing left
            if (inpin.xy[0] < outpin.xy[0])
                return false;
        if (9 == angle) //facing left
            if (outpin.xy[0] < inpin.xy[0])
                return false;
        return true;
    }
    static middle_xy(outpin, inpin) {
        let result = [0, 0];
        var atype = Wire.angleType(outpin.hour, inpin.hour);
        result = [inpin.head[0], outpin.head[1]];
        if (Wire.vertical(outpin.hour))
            result = [outpin.head[0], inpin.head[1]];
        return result;
    }
    static noBend(outpin, inpin) {
        let result = [];
        result.push(outpin.head);
        result.push(this.middle_xy(outpin, inpin));
        result.push(inpin.head);
        return result;
    }
    static _middle2(outpin, inpin, bend) {
        var dx = inpin.head[0] - outpin.head[0];
        var dy = inpin.head[1] - outpin.head[1];
        let result = [[0, 0], [0, 0]];
        result[0] = [outpin.head[0] + dx * bend, outpin.head[1]];
        result[1] = [outpin.head[0] + dx * bend, inpin.head[1]];
        let fwd = Wire.forward(outpin, inpin);
        if (!fwd)
            if (3 == outpin.hour) {
                result[0] = [outpin.head[0], outpin.head[1] + dy * bend];
                result[1] = [inpin.head[0], outpin.head[1] + dy * bend];
                return result;
            }
        if (!fwd)
            if (9 == outpin.hour) {
                result[0] = [outpin.head[0], outpin.head[1] + dy * bend];
                result[1] = [inpin.head[0], outpin.head[1] + dy * bend];
                return result;
            }
        if (fwd)
            if (6 == outpin.hour) {
                result[0] = [outpin.head[0], outpin.head[1] + dy * bend];
                result[1] = [inpin.head[0], outpin.head[1] + dy * bend];
                return result;
            }
        if (fwd)
            if (12 == outpin.hour) {
                result[0] = [outpin.head[0], outpin.head[1] + dy * bend];
                result[1] = [inpin.head[0], outpin.head[1] + dy * bend];
                return result;
            }
        return result;
    }
    static middle2(outpin, inpin, bend) {
        let result = [];
        result.push(outpin.head);
        let m2 = Wire._middle2(outpin, inpin, bend);
        result.push(m2[0]);
        result.push(m2[1]);
        result.push(inpin.head);
        return result;
    }
    get xys() {
        let angltyp = Wire.angleType(this.outpin.hour, this.inpin.hour);
        if (90 == angltyp)
            return Wire.noBend(this.outpin, this.inpin);
        if (0 <= this.bend)
            return Wire.middle2(this.outpin, this.inpin, this.bend);
        let fwd = Wire.forward(this.outpin, this.inpin);
        let result = [];
        result.push(this.outpin.head);
        result.push(this.inpin.head);
        return result;
    }
    toString() {
        return '{Wire hot=' + this.hot + '}';
    }
}
Wire.color = 'blue';
// ////////////////////////////////////////////////
class SafeWire extends Wire {
    constructor() {
        super(...arguments);
        this._hot = false;
    }
    get hot() { return this._hot; }
    onMove(xy) { }
    onClick(xy) {
        if (null == this.outpin)
            return;
        this._hot = this.outpin.hot;
    }
    toString() {
        return '{SafeWire hot=' + this.hot + '}';
    }
}
//# sourceMappingURL=Wire.js.map