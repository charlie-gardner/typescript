"use strict";
//2026-03-12
class LevitonChip extends Chip {
    constructor(pic1, pic2, xy = [0, 0], scale = [1, 1]) {
        super();
        this.leviton = new Leviton(xy, scale);
        this.leviton.image1.src = pic1;
        this.leviton.image2.src = pic2;
        let lev = this.leviton;
        let pinScale = [1, 1];
        this.pin1 = this.addInPin({
            xy: lev.dot1, scale: pinScale, hour: 3
        });
        this.pin2 = this.addOutPin({
            xy: lev.dot2, scale: pinScale, hour: 9
        });
        this.pin3 = this.addOutPin({
            xy: lev.dot3, scale: pinScale, hour: 3
        });
    }
    update(g, e) {
        this.leviton.update(g, e); //sets up
        let hot2 = false;
        if (this.pin1.hot)
            if (!this.leviton.up)
                hot2 = true;
        this.enablePin(this.pin2, hot2);
        let hot3 = false;
        if (this.pin1.hot)
            if (this.leviton.up)
                hot3 = true;
        this.enablePin(this.pin3, hot3);
    }
    draw(g) {
        g.centerImageAt(this.leviton.image, this.leviton.xy, this.leviton.scale, 0);
        this.pin1.draw(g);
        this.pin2.draw(g);
        this.pin3.draw(g);
    }
}
//# sourceMappingURL=LevitonChip.js.map