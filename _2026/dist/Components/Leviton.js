"use strict";
//2026-02-27
class Leviton {
    constructor(//image:HTMLImageElement
    xy = [0, 0], scale = [1, 1], hour = 0) {
        this._xy = xy;
        this.scale = scale;
        this.hour = hour;
        this._up = false;
        this.image1 = new Image();
        this.image2 = new Image();
        this._mask = Leviton.mask;
        this.xys = Ctx.center(this.mask, this._xy, this.scale, this.hour);
    }
    get hot() { return true; }
    get xy() { return this._xy; }
    get mask() {
        return this.get_mask(false);
    }
    get image() {
        if (this._up)
            return this.image2;
        return this.image1;
    }
    get_mask(flipY = false) {
        let fixXs = XY.addEachX(this._mask, -2);
        if (flipY)
            return XY.flipEachY(fixXs);
        return fixXs;
    }
    update(g, e) {
        let xy = g.xy(e);
        if (this.pad0Contains(xy))
            this._up = true;
        if (this.pad1Contains(xy))
            this._up = false;
        //alert(''+this._up);
    }
    draw(g) {
        let mask = this.mask;
        let xy = this.xy;
        let scale = this.scale;
        let hour = this.hour;
        g.centerImageAt(this.image, xy, scale, hour);
        let xys = this.xys;
        g.drawCrosshair(xys[0], 'blue', 16, 2);
        g.drawCrosshair(xys[1], 'blue', 16, 2);
        //g.drawCrosshair(xys[8],'black',16,2);
        g.drawCrosshair(this.dot1, 'red', 16, 2);
        //g.drawCrosshair(xys[6],'red',16,2);
        g.drawCrosshair(this.dot2, 'green', 16, 2);
        //g.drawCrosshair(xys[9],'red',16,2);
        g.drawCrosshair(this.dot3, 'magenta', 16, 2);
        //g.drawCrosshair(xys_[5],'yellow',16,2);
        //g.drawCrosshair(xys_[4],'magenta',16,2);
        //g.drawCrosshair(xys_[3],'green',16,2);
        //g.drawCrosshair(xys_[2],'blue',16,2);
        g.draw(this.pad0, 'black');
        g.draw(this.pad1, 'blue');
    }
    pad0Contains(xy) { return Ctx.contains(this.pad0, xy); }
    pad1Contains(xy) { return Ctx.contains(this.pad1, xy); }
    get pad0() {
        return this.pad(0);
    }
    get pad1() {
        return this.pad(1);
    }
    get up() {
        return this._up;
    }
    get dot1() {
        return this.xys[8];
    }
    get dot2() {
        return this.xys[6];
    }
    get dot3() {
        return this.xys[9];
    }
    pad(index) {
        let rt = this.mask[3];
        let lb = this.mask[2];
        if (0 == index) {
            rt = this.mask[5];
            lb = this.mask[4];
        }
        let rect0 = Tricks.rect(lb, rt, 11);
        let rect = Ctx.center(rect0, this.xy, this.scale, this.hour);
        return rect;
    }
    toString() {
        let mask$ = '[]';
        if (1 < this.mask.length)
            mask$ = XY.$_([this.mask[0], this.mask[1]]);
        let a = `{Leviton:[${this.xy}]`
            + ` ,scale=[${this.scale}] ,hour=[${this.hour}]${mask$}}`;
        return a;
    }
    $(g) {
        let mask$ = '[]';
        if (1 < this.mask.length)
            mask$ = XY.$_([this.mask[0], this.mask[1]]);
        let a = `{Leviton:[${this.xy}]`
            + ` ,scale=[${this.scale}] ,hour=[${this.hour}] ,up=[${this._up}] ,${mask$}`;
        let xys_ = g.centerAt(this.mask, this.xy, this.scale, this.hour);
        a += '\r\n' + XY.$_(xys_) + '}';
        return a;
    }
    static ok(value) {
        if (value === undefined)
            return false;
        if (value == null)
            return false;
        return true;
    }
}
Leviton.mask = [[4, 1], [62, 153], [14, 31], [50, 70], [14, 73], [51, 111], [6, 59], [6, 107], [58, 57], [59, 88]];
//# sourceMappingURL=Leviton.js.map