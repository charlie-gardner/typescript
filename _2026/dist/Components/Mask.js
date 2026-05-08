"use strict";
//2026-03-21
//as low level as possible to check mask vs image
class Mask {
    constructor(ctx, origin, scale = [1, -1], hour = 0) {
        this.ctx = ctx;
        this.origin = origin;
        this.scale = scale;
        this.hour = hour;
    }
    centerXys(xys, cheat, xy = [0, 0]) {
        let radians = -this.hour * Math.PI / 6;
        let xys0 = XY.addEach(xys, [-cheat, 0]);
        //let origin=XY.mul(this.origin,[0,0]);
        let xys_ = XY.mulEach(xys0, this.origin, this.scale, radians);
        return xys_;
    }
    centerImage(img, xy) {
        let radians = this.hour * Math.PI / 6;
        let size = [img.width * this.scale[0], img.height * this.scale[1]];
        let [px, py] = this.origin;
        let [w, h] = size;
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(radians);
        ctx.drawImage(img, -w / 2, 0, w, h);
        ctx.restore();
    }
    drawCrosshairs(xys, color = 'midnightblue', radius = 12, lineWidth = 1) {
        Ctx.drawCrosshairs(this.ctx, xys, color, radius, lineWidth);
    }
    static width(xys) {
        if (xys.length === 0)
            return 0;
        let minX = xys[0][0];
        let maxX = xys[0][0];
        for (const [x] of xys) {
            if (x < minX)
                minX = x;
            if (x > maxX)
                maxX = x;
        }
        return maxX - minX;
    }
}
//# sourceMappingURL=Mask.js.map