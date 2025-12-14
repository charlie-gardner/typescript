"use strict";
class AndGate {
    //solid:boolean;
    constructor(xy, hour = 0, inpincount = 2, extend = 0, inpin_wh = [1, 4]) {
        //this.l_=new  L([24,52]);
        this._xy = xy;
        this.hour = hour;
        this.inpincount = inpincount;
        let l2 = new L(inpin_wh);
        this.outpin = new OutPin(this, l2);
        this.inpins = [];
        this._drawbox = false;
        for (let i = 0; i < inpincount; ++i)
            this.inpins.push(new InPin(this, i, l2, extend));
    }
    get l_() { return new L([24, 52]); }
    get hot() {
        let rc = true;
        this.inpins.forEach(item => { if (!item.hot)
            rc = false; });
        return rc;
    }
    get_hot(index) { return this.hot; }
    get xy() {
        let xy_ = [this._xy[0], this._xy[1]];
        return xy_;
    }
    get wh() {
        let wh_ = [this.l_.wh[0], this.l_.wh[1]];
        return wh_;
    }
    get head() {
        let result = XY.mul(this.l_.head, this.xy, [1, 1], XY.hour(this.hour));
        return result;
    }
    get feet() {
        let count = this.inpincount + 1;
        let dx = 2 * this.l_.wh[0] / count;
        let start = -this.l_.wh[0];
        let result = [];
        for (let i = 1; i < count; ++i) {
            result.push([start + i * dx, 0]);
        }
        let result2 = XY.mulEach(result, this.xy, [1, 1], XY.hour(this.hour));
        return result2;
    }
    get name() { return 'And'; }
    toString() {
        let a = '';
        a += '{' + this.name + ' ' + XY.format(this.xy)
            + '\r\ninpincount=' + this.inpincount;
        this.inpins.forEach(value => a += value.toString());
        +'\r\noutpincount=' + this.outpincount;
        a += '\r\noutpin=' + this.outpin.toString();
        +'\r\nhour=' + this.hour
            + '\r\nhead=' + XY.round(this.head)
            + '\r\nhot=' + this.hot;
        //+'\r\nfeet';
        //this.feet.forEach(value=>a+='\r\n'+Tricks.round(value));
        return a + '';
    }
    get xys() { return GateData.and(this.wh); }
    get wxys() {
        let ans = XY.mulEach(this.xys, this.xy, [1, 1], XY.hour(this.hour));
        return ans;
    }
    contains(xy) {
        return L.boxContainsXY(this.wxys, xy);
        return false;
    }
    get outpincount() { return 1; }
    get strokeStyleHot() { return 'red'; }
    get strokeStyle() { return 'blue'; }
    get fillStyleHot() { return 'red'; }
    get fillStyle() { return ''; } //'blue'
    get lineWidth() { return 2; }
    get drawbox() { return this._drawbox; }
    set drawbox(value) { this._drawbox = value; }
    get strokeStyleBox() { return 'gray'; }
    get fillStyleBox() { return 'gray'; }
    get lineWidthBox() { return 1; }
    draw(g) {
        g.lineWidth = this.lineWidthBox;
        if (this.drawbox)
            g.drawAt(this.l_.box, this.xy, this.strokeStyleBox, this.fillStyleBox, [1, 1], XY.hour(this.hour));
        g.lineWidth = this.lineWidth;
        let color = this.strokeStyle;
        let filler = this.fillStyle;
        if (this.hot) {
            color = this.strokeStyleHot;
            filler = this.fillStyleHot;
        }
        g.closePath = true;
        g.draw(this.wxys, color, filler);
        if (0 < this.outpincount)
            this.outpin.draw(g);
        this.inpins.forEach(item => item.draw(g));
        g.resetCtx();
    }
}
//# sourceMappingURL=And.js.map