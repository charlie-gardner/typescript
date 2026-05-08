"use strict";
//2026-04-09
class Led extends Chip {
    constructor(xy = [0, 0], size = [1, 1], hour = 12) {
        super();
        this.xy = xy;
        this.size = size;
        this.hour = hour;
        let pinScale = [1, 1];
        this.rect = Ctx.rect(this.size);
        this.rect.push([Ctx.width(this.rect) / 2, 0]);
        this.rect.push([Ctx.width(this.rect) / 2, Ctx.height(this.rect) / 2]);
        this.xys = Ctx.center(this.rect, this.xy, [1, 1], this.hour);
        let try_ = [0, 0]; //dummy
        try_ = this.rect.pop();
        try_ = this.rect.pop();
        this.xyDot = Tricks.pop(this.xys);
        this.xyPin = Tricks.pop(this.xys);
        this.pin1 = this.addInPin({
            xy: this.xyPin, scale: pinScale, hour: this.hour + 6
        });
    }
    update(g, e) {
        this.draw(g);
    }
    draw(g) {
        let lineWidth0 = 3;
        //if (this.hovering)lineWidth0=5;
        let xys2 = g.centerDrawAt(this.rect, this.xy, [1, 1], this.hour, 'lightblue', 'lightgray', lineWidth0);
        let radius = this.size[0] / 3;
        let strokeStyle = 'gray';
        let fillStyle = 'darkslategray';
        let lineWidth = 3;
        if (this.pin1.hot) {
            strokeStyle = 'red';
            fillStyle = 'yellow';
        }
        g.drawCircle(this.xyDot, strokeStyle, fillStyle, radius, lineWidth);
        this.pin1.draw(g);
    }
    //contains(xy:[number,number]):boolean{return Ctx.contains(this.xys,xy);}
    toString() {
        let a = `{Led[${this.xy}] ,size:[${this.size}] ,hour:[${this.hour}]`;
        a += `\r\nxy1:${XY.shiftMiddle(this.xy, this.size)} ,xyPin:${XY.$(this.xyPin)}`;
        a += `\r\n${XY.$_(this.xys)}`;
        return a;
    }
}
//# sourceMappingURL=Led.js.map