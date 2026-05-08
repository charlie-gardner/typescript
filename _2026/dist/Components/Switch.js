"use strict";
//2026-04-09
class Switch extends Chip {
    constructor(xy = [0, 0], size = [1, 1], hour = 0) {
        super();
        this.xy = xy;
        this.size = size;
        this.hour = hour;
        this._hot = false;
        this.fillStyle = 'midnightblue';
        this._hovering = false;
        let pinScale = [1, 1];
        this.rect = Ctx.rect(this.size);
        this.rect.push([Ctx.width(this.rect) / 2, Ctx.height(this.rect)]);
        this.rect.push([Ctx.width(this.rect) / 2, Ctx.height(this.rect) / 2]);
        this.xys = Ctx.center(this.rect, this.xy, [1, 1], this.hour);
        let try_ = [0, 0]; //dummy
        try_ = this.rect.pop();
        try_ = this.rect.pop();
        this.xyDot = Tricks.pop(this.xys);
        this.xyPin = Tricks.pop(this.xys);
        this.pin1 = this.addOutPin({
            xy: this.xyPin, scale: pinScale, hour: this.hour
        });
    }
    contains(xy) {
        return Ctx.contains(this.xys, xy);
    }
    hovering(xy) {
        return this._hovering = Ctx.contains(this.xys, xy);
    }
    tryToggle() {
        if (!this._hovering)
            return false;
        this.hot = !this.hot;
        return true;
    }
    set hot(value) {
        this._hot = value;
        this.enablePin(this.pin1, this.hot);
    }
    get hot() { return this._hot; }
    update(g, e) {
        let xy = g.xy(e);
        this.hovering(xy);
        this.tryToggle();
    }
    draw(g) {
        let lineWidth0 = 3;
        if (this._hovering)
            lineWidth0 = 5;
        let xys2 = g.centerDrawAt(this.rect, this.xy, [1, 1], this.hour, 'darkgray', 'lightgray', lineWidth0);
        let radius = this.size[0] / 3;
        let strokeStyle = 'DarkGray';
        this.fillStyle = 'MidnightBlue';
        let lineWidth = 3;
        if (this.hot) {
            strokeStyle = 'pink';
            this.fillStyle = 'red';
        }
        g.drawCircle(this.xyDot, strokeStyle, this.fillStyle, radius, lineWidth);
        this.pin1.draw(g);
    }
    toString() {
        let a = `{Switch[${this.xy}] ,size:[${this.size}] ,hour:[${this.hour}]`;
        a += `\r\nwidth:${Ctx.width(this.rect)} ,height:${Ctx.height(this.rect)}`;
        a += ` ,hovering:${this._hovering}`;
        a += `\r\nxy1:${XY.shiftMiddle(this.xy, this.size)} ,xy2:${XY.$(this.xyPin)}`;
        a += `\r\n${XY.$_(this.xys)}`;
        return a;
    }
}
//# sourceMappingURL=Switch.js.map