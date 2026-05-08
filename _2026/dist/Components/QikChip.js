"use strict";
class QikChip extends Chip {
    constructor(xy = [0, 0], size = [1, 1], hour = 0) {
        super();
        this.xy = xy;
        this.size = size;
        this.hour = hour;
        this.rect = Ctx.rect(this.size);
        this.xys = Ctx.center(this.rect, this.xy, [1, 1], this.hour);
        let pinScale = [1, 1];
        let xy1 = this.xys[0];
        this.pin1 = this.addInPin({
            xy: xy1, scale: pinScale, hour: this.hour + 9
        });
        let xy2 = this.xys[2];
        this.xy2 = xy2;
        this.pin2 = this.addOutPin({
            xy: xy2, scale: pinScale, hour: this.hour + 3
        });
    }
    draw(g) {
        let xys2 = g.centerDrawAt(this.rect, this.xy, [1, 1], this.hour, 'magenta', 'yellow');
        this.pin1.draw(g);
        this.pin2.draw(g);
    }
    contains(xy) { return Ctx.contains(this.xys, xy); }
    toString() {
        let a = `{QikChip[${this.xy}] ,size:[${this.size}] ,hour:[${this.hour}]`;
        a += `\r\nxy1:${XY.shiftMiddle(this.xy, this.size)} ,xy2:${XY.$(this.xy2)}`;
        a += `\r\n${XY.$_(this.xys)}`;
        return a;
    }
}
//# sourceMappingURL=QikChip.js.map