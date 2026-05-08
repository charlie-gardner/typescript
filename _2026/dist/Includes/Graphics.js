"use strict";
//2026-03-13
//Graphics works totally different with models and lines
//Lines work just normal
//Models have origin Middle Bottom
//so we have 2 sets of Methods
class Graphics {
    constructor(ctx, origin, scale) {
        this.closePath = false;
        this._ctx = ctx;
        this._origin = origin;
        this._scale = scale;
    }
    centerImageAt(image, xy = [0, 0], scale = [1, 1], hour = 0) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        let scaleW = this._scale[0] * scale[0];
        let scaleH = this._scale[1] * scale[1];
        Ctx.centerImage(this._ctx, image, xy_, [scaleW, scaleH], hour);
    }
    //return xys we always work in xys !!!Never! pxs
    centerAt(xys, at = [0, 0], scale = [1, 1], hour = 0, strokeStyle = 'blue', fillStyle = 'transparent', lineWidth = 1) {
        let xys_ = Ctx.center(xys, at, scale, hour);
        return xys_;
    }
    //# center middle bottom
    //return xys we always work in xys !!!Never! pxs
    centerDrawAt(xys, at = [0, 0], scale = [1, 1], hour = 0, strokeStyle = 'blue', fillStyle = 'transparent', lineWidth = 1) {
        let xys_ = Ctx.center(xys, at, scale, hour);
        let xys2 = XY.mulEach(xys_, this.origin, this.scale, 0);
        this.ctxDraw(xys2, strokeStyle, fillStyle, lineWidth);
        return xys_;
    }
    //# center middle bottom
    centerDraw(xys, strokeStyle = 'blue', fillStyle = 'transparent', lineWidth = 1) {
        this.centerDrawAt(xys, [0, 0], [1, 1], 0, strokeStyle, fillStyle, lineWidth);
    }
    centerSignAt(size, xy = [0, 0], scale = [1, 1], hour = 0) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        let scaleW = this._scale[0] * scale[0];
        let scaleH = this._scale[1] * scale[1];
        Tricks.centerSignAt(this._ctx, size, xy_, [scaleW, scaleH], hour);
    }
    drawAt(xys, at = [0, 0], scale = [1, 1], hour = 0, strokeStyle = 'blue', fillStyle = 'transparent', lineWidth = 2, closePath = false) {
        let radians = Ctx.toRadians(hour);
        let xys_ = XY.mulEach(xys, at, scale, radians);
        let xys2 = XY.mulEach(xys_, this.origin, this.scale, 0);
        this._ctx.save();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillStyle = fillStyle;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        Ctx.draw(this.ctx, xys2);
        if (closePath) {
            this._ctx.closePath();
            this._ctx.fill();
        }
        this.ctx.stroke();
        this._ctx.restore();
        return xys2;
    }
    draw(xys, strokeStyle = 'blue', lineWidth = 2) {
        let xys2 = XY.mulEach(xys, this.origin, this.scale, 0);
        this.ctx.save();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        Ctx.draw(this.ctx, xys2);
        this.ctx.stroke();
        this._ctx.restore();
        return xys2;
    }
    drawCircle(xy, strokeStyle = 'black', fillStyle = 'transparent', radius = 12, lineWidth = 1) {
        let xy2 = XY.mul(xy, this.origin, this.scale, 0);
        Ctx.drawCircle(this.ctx, xy2, strokeStyle, fillStyle, radius, lineWidth);
    }
    drawCrosshair(xy, color = 'green', radius = 12, lineWidth = 1) {
        let xy2 = XY.mul(xy, this.origin, this.scale, 0);
        Ctx.drawCrosshair(this.ctx, xy2, color, radius, lineWidth);
    }
    drawCrosshairs(xys, color = 'green', radius = 12, lineWidth = 1) {
        xys.forEach(xy => this.drawCrosshair(xy, color, radius, lineWidth));
    }
    drawTag(text, xy, hour = 3, length = 6, color = 'blue') {
        let ctx = this._ctx;
        let p = XY.mul(xy, this.origin, this.scale);
        let radians = (hour - 3) * Math.PI / 6;
        length *= this.scale[0];
        let linex = p[0] + length * Math.cos(radians);
        let liney = p[1] + length * Math.sin(radians);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(linex, liney);
        ctx.closePath();
        ctx.textAlign = "left";
        if (6 < hour && hour < 12)
            ctx.textAlign = "right";
        ctx.fillText(text, linex, liney);
        ctx.stroke();
        ctx.restore();
    }
    ctxDraw(xys, strokeStyle = 'blue', fillStyle = 'yellow', lineWidth = 1) {
        this.ctx.save();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillStyle = fillStyle;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        Ctx.draw(this.ctx, xys);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this._ctx.restore();
    }
    drawArrow(xy1, xy2, color = 'blue', lineWidth = 2, headLength = 10, sharpness = 10) {
        let xy1_ = XY.mul(xy1, this._origin, this._scale);
        let xy2_ = XY.mul(xy2, this._origin, this._scale);
        Ctx.drawArrow(this._ctx, xy1_, xy2_, color, lineWidth, headLength, sharpness);
    }
    drawArrows(text, xy1, xy2, split = .45, color = 'blue', lineWidth = 2, headLength = 10, sharpness = 10) {
        let line = XY.split(xy1, xy2, .25, split, .75);
        let p2 = line[2];
        this.drawArrow(line[1], xy1, color, lineWidth, headLength, sharpness);
        this.drawArrow(line[3], xy2, color, lineWidth, headLength, sharpness);
        let radians = XY.atan2(xy1, xy2);
        let hour = -Ctx.toHour(radians);
        hour += 3;
        let metrics = this.ctx.measureText(text);
        let fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        let scale = Math.abs(this.scale[1]);
        let lower = fontHeight / (2 * scale);
        let lowerX = lower * Math.sin(radians); //not sin^2 because of - sign
        let lowerY = lower * Math.cos(radians); //not cos^2 because of - sign
        p2[0] -= lowerX; // lower text p3 doesnt rotate
        p2[1] -= lowerY; //lower text p3 doesnt rotate
        this.fillText(text, p2, 'blue', hour);
    }
    fillText_(text, xy, fillStyle = 'midnightblue', font = '24px Consolas, monospace') {
        this._ctx.save();
        this._ctx.fillStyle = fillStyle;
        this._ctx.font = font;
        let xy_ = XY.mul(xy, this._origin, this._scale);
        this._ctx.fillText(text.toString(), xy_[0], xy_[1]);
        this._ctx.restore();
    }
    fillText(text, xy, fillStyle = 'midnightblue', hour = 3, font = '24px Consolas, monospace') {
        this._ctx.save();
        this._ctx.fillStyle = fillStyle;
        this._ctx.font = font;
        let xy_ = XY.mul(xy, this._origin, this._scale);
        this.rotateWorld(xy, 3 - hour);
        this._ctx.fillText(text.toString(), 0, 0);
        this._ctx.restore();
    }
    //legacy from 5 keep till fix fillText KEEP always works
    fillTextUp(text, xy, hour = 0) {
        this.ctx.save();
        this.rotateWorld(xy, 3 - hour);
        this._ctx.fillText(text.toString(), 0, 0);
        this.ctx.restore();
    }
    xy(e) {
        let px = Ctx.toPixel(e);
        return Ctx.xy(e, this.origin, this.scale);
    }
    window(e, fixY = 0, show = true) {
        let px = Ctx.toPixel(e);
        Ctx.drawCrosshair(this.ctx, px);
        let botright = [this.ctx.canvas.width - 200, this.ctx.canvas.height - 28];
        if (show)
            this.ctx.fillText('_px:' + XY.$(px), botright[0], -fixY + botright[1]);
        let _xy = Ctx.xy(e, this.origin, this.scale);
        if (show)
            this.ctx.fillText('_xy:' + XY.$(_xy), botright[0], -fixY + 20 + botright[1]);
        return _xy;
    }
    //does all the math in one spot
    model_pxs(xys, at, scale, hour) {
        let xys_ = Ctx.center(xys, at, scale, hour);
        return XY.mulEach(xys_, this.origin, this.scale, 0);
    }
    get ctx() { return this._ctx; }
    get origin() { return this._origin; }
    get scale() { return this._scale; }
    toString() {
        let a = '';
        a += "{Graphics:[" + this.origin
            + "] ,scale:[" + this.scale[0] + ',' + this.scale[1] + "]";
        a += "}";
        return a;
    }
    //Nasty from 2025
    rotateWorld(xy, hour) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        this._ctx.translate(xy_[0], xy_[1]);
        this._ctx.rotate(Ctx.toRadians(hour));
    }
}
//# sourceMappingURL=Graphics.js.map