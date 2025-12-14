"use strict";
//2025-12-13
class InPin {
    constructor(igate, index, l_, extend) {
        this.pindata = [];
        this._igate = igate;
        this._l = l_;
        this._index = index;
        this.wire = null;
        this._extend = extend;
        this.mode = 0;
    } //0 normal //1 Leviton
    get hot() {
        if (null == this.wire)
            return false;
        return this.wire.hot;
    }
    get xy() {
        return this._igate.feet[this._index];
    }
    get head() {
        let result = XY.mul(this._l.head, this.xy, [1, 1], XY.hour(this.hour));
        if (1 == this.mode || 2 == this.mode) {
            result = this.right;
            if (this.pindata[0][0] < 0)
                result = this.left;
        }
        return result;
    }
    get hour() {
        if (1 == this.mode)
            return 3;
        return this._igate.hour + 6;
    }
    get xys() {
        let dots = XY.mulEach(this._l.pin(this._extend), this.xy, [1, 1], XY.hour(this.hour));
        return dots;
    }
    draw(g) {
        if (null == this.wire)
            return;
        let color = InPin.color;
        if (this.wire.hot)
            color = "red";
        if (0 == this.mode)
            g.draw(this.xys, color);
        else if (1 == this.mode || 2 == this.mode) //leviton
            InPin.drawRect(g, this._igate.xy, this.pindata[0], this.pindata[1], color);
        g.resetCtx();
    }
    static drawRect(g, igateXY, xy, wh, color, solid = false) {
        let xy_ = XY.mul(igateXY, xy);
        g.drawRect(xy_, wh, color, solid);
    }
    get right() {
        let rslt = Tricks.rectangle(this._igate.xy, this.pindata);
        let h = rslt[1][1] / 2;
        return [rslt[0][0] + rslt[1][0], rslt[0][1] + h];
    }
    get left() {
        let rslt = Tricks.rectangle(this._igate.xy, this.pindata);
        let h = rslt[1][1] / 2;
        return [rslt[0][0], rslt[0][1] + h];
    }
    get name() { return 'InPin'; }
    toString() {
        let a = '';
        a += '{' + this.name + '\r\n'
            + XY.round(this.xy)
            + '\r\nhour=' + this.hour
            + '\r\nindex=' + this._index
            + '\r\npindata=';
        this.pindata.forEach(item => a += '[' + item + ']');
        a += ''
            + '\r\nmode=' + this.mode
            + '\r\nhot=' + this.hot + '}';
        return a;
    }
}
InPin.color = 'blue';
// /////////////////////////////////////////////////////
class OutPin {
    constructor(igate, l_) {
        this.pindata = [];
        this._igate = igate;
        this._l = l_;
        this.wire = null;
        this.mode = 0;
        this._index = 0;
    }
    get index() {
        return this._index;
    }
    set index(value) { this._index = value; }
    get hot() {
        if (0 == this.mode)
            return this._igate.hot;
        else if (1 == this.mode)
            return this._igate.get_hot(this.index);
        else if (2 == this.mode)
            return this._igate.hot;
        return false;
    }
    get xy() {
        return this._igate.head;
    }
    get right() {
        let rslt = Tricks.rectangle(this._igate.xy, this.pindata);
        let h = rslt[1][1] / 2;
        return [rslt[0][0] + rslt[1][0], rslt[0][1] + h];
    }
    get left() {
        let rslt = Tricks.rectangle(this._igate.xy, this.pindata);
        let h = rslt[1][1] / 2;
        return [rslt[0][0], rslt[0][1] + h];
    }
    get head() {
        let result = XY.mul(this._l.head, this.xy, [1, 1], XY.hour(this.hour));
        if (1 == this.mode || 2 == this.mode) {
            result = this.right;
            if (this.pindata[0][0] < 0)
                result = this.left;
        }
        return result;
    }
    get hour() { return this._igate.hour; }
    get xys() {
        let dots = XY.mulEach(this._l.box, this.xy, [1, 1], XY.hour(this.hour));
        return dots;
    }
    draw(g) {
        let color = InPin.color;
        if (this.hot)
            color = "red";
        if (0 == this.mode)
            g.draw(this.xys, color);
        else if (1 == this.mode || 2 == this.mode) //leviton
            InPin.drawRect(g, this._igate.xy, this.pindata[0], this.pindata[1], color);
        g.resetCtx();
    }
    get name() { return 'OutPin'; }
    toString() {
        let a = '';
        a += '{' + this.name + '\r\n'
            + XY.round(this.xy)
            + '\r\nhour=' + this.hour
            + '\r\nindex=' + this._index
            + '\r\npindata=';
        this.pindata.forEach(item => a += '[' + item + ']');
        a += ''
            + '\r\nmode=' + this.mode
            + '\r\nhot=' + this.hot + '}';
        return a;
    }
}
//# sourceMappingURL=OutPin.js.map