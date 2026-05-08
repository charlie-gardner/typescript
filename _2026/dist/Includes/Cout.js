"use strict";
class Cout {
    constructor(ctx) {
        this.ctx = ctx;
        this.font = '18px Consolas, monospace';
        this.data = [];
        this.fillStyle = 'navy';
        this.spacing = 18;
        this._disable = false;
    }
    clear() { this.data = []; }
    //static create(ctx:CanvasRenderingContext2D):void{
    //this.cout= new Cout(ctx);}
    get disable() { return this._disable = true; }
    get enable() { return this._disable = false; }
    wl(value = '', value2 = '', value3 = '') {
        if (this._disable)
            return;
        let text = value.toString()
            + value2.toString() + value3.toString();
        //alert(value.toString());
        let lines = text.split('\r\n');
        lines.forEach(line => this.data.push(line));
    }
    wlEach(text = '', xys, count = 99999) {
        let i = 0;
        xys.forEach(xy => {
            if (count < ++i)
                return;
            this.data.push('[' + i + ']' + text + Cout.round(xy));
        });
    }
    wls(count = 0, value = '', value2 = '', value3 = '') {
        for (let i = 0; i < count; ++i)
            this.wl(value, value2, value3);
    }
    //just leave till you fix all pgms using fill
    fill(at = [20, 20]) {
        if (this._disable)
            return;
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = this.fillStyle;
        at[1] -= this.spacing;
        ctx.font = this.font;
        this.data.forEach(item => {
            ctx.fillText(item, at[0], at[1] += this.spacing);
        });
        ctx.restore();
    }
    static round(item, decimals = 0) {
        let result0 = this.round1(item[0], decimals);
        let result1 = this.round1(item[1], decimals);
        return [result0, result1];
    }
    static round1(value, decimals = 0) {
        let result = value * Math.pow(10, decimals);
        return Math.round(result) / Math.pow(10, decimals);
    }
    toString() {
        return '{Cout ' //keep='+Cout.keep
            + "'" + this.font + "'" + '}';
    }
}
//# sourceMappingURL=Cout.js.map