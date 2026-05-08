"use strict";
//2026-04-10
class LevitonB extends Chip {
    constructor(pic1, pic2, xy = [0, 0], scale = [1, 1]) {
        super();
        this.leviton = new Leviton(xy, scale);
        this.leviton.image1.src = pic1;
        this.leviton.image2.src = pic2;
        let lev = this.leviton;
        let pinScale = [1, 1];
        this.pin1 = this.addOutPin({
            xy: lev.dot1, scale: pinScale, hour: 3
        });
        this.pin2 = this.addInPin({
            xy: lev.dot2, scale: pinScale, hour: 9
        });
        this.pin3 = this.addInPin({
            xy: lev.dot3, scale: pinScale, hour: 3
        });
    }
    update(g, e) {
        this.leviton.update(g, e); //sets up
        this.refresh();
    }
    refresh() {
        let hot1 = false;
        if (this.pin2.hot)
            if (!this.leviton.up)
                hot1 = true;
        if (this.pin3.hot)
            if (this.leviton.up)
                hot1 = true;
        this.enablePin(this.pin1, hot1);
    }
    draw(g) {
        g.centerImageAt(this.leviton.image, this.leviton.xy, this.leviton.scale, 0);
        this.pin1.draw(g);
        this.pin2.draw(g);
        this.pin3.draw(g);
    }
}
//# sourceMappingURL=LevitonB.js.map