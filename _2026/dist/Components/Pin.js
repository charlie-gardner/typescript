"use strict";
//2026-03-10
// /////////////////////
class BasePin {
    //constructor(protected readonly _source: PinState){
    constructor(_source) {
        this._source = _source;
        this.growIn = 0;
        this.grow = 0;
        this.wire = null;
    }
    set_inpin_hot(value) { this._source.hot = value; } //for SafeWire
    set Wire(wire) { this.wire = wire; }
    get Wire() { return this.wire; }
    get topleft() { return BasePin.mask()[1]; }
    get dot() {
        let toHour = (value) => -value * Math.PI / 6;
        let topleft = this.topleft;
        topleft[1] += this.grow;
        let xy_ = XY.mul(topleft, this.xy, this.scale, toHour(this.hour));
        return xy_;
    }
    static mask(plant = 0, grow = 0) {
        let width = 2;
        let height = 8;
        let mask;
        return [[0, -plant], [0, height + grow], [width, height + grow], [width, -plant], [0, -plant]];
    }
    get xy() { return this._source.xy; }
    set xy(value) { this._source.xy = value; }
    get scale() { return this._source.scale; }
    get hour() { return this._source.hour % 12; }
    get class() { return 'BasePin'; }
    toString() {
        let a = '';
        //a+='mask:'+XY.$_(BasePin.mask(this.growIn,this.grow));
        a += `{${this.class}:[${XY.$(this.xy)}]`;
        a += ` ,scale:[${this.scale}]`;
        a += ` ,hour:[${this.hour}]`;
        a += ` ,dot:${XY.$(this.dot)}`;
        a += ` ,topleft:[${this.topleft}]`;
        a += `\r\ngrowIn:[${this.growIn}]`;
        a += ` ,grow:[${this.grow}]`;
        //a+=` ,hot:[${this.hot}]`;
        //a+=` ,${this.wire}`;
        return a;
    }
}
// ////////////////////////////////////
class OutPin extends BasePin {
    get hot() { return this._source.hot; }
    get class() { return 'OutPin'; }
    draw(g) {
        let rad = Ctx.toRadians(this.hour);
        g.ctx.save();
        let color = 'blue';
        if (this.hot)
            color = 'red';
        g.ctx.strokeStyle = color;
        g.ctx.fillStyle = color;
        g.centerDrawAt(BasePin.mask(this.growIn, this.grow), this.xy, this.scale, this.hour, color, color);
        //g.drawCrosshair(this.dot);
        g.ctx.restore();
    }
}
// ////////////////////////////
class InPin extends BasePin {
    get hot() {
        if (null != this.wire)
            return this.wire.hot;
        return false;
    }
    get class() { return 'InPin'; }
    draw(g) {
        let rad = Ctx.toRadians(this.hour);
        g.ctx.save();
        let color = 'blue';
        if (this.hot)
            color = 'red';
        //alert(`InPin.draw[${this.hot}]`);
        g.ctx.strokeStyle = color;
        g.ctx.fillStyle = color;
        g.centerDrawAt(BasePin.mask(this.growIn, this.grow), this.xy, this.scale, this.hour, color, color);
        //g.drawCrosshair(this.dot);
        g.ctx.restore();
    }
}
//# sourceMappingURL=Pin.js.map