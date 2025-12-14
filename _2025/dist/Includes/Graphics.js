"use strict";
//2025-05-06 Moved drawCrosshair from: Tricks to Graphics
//2025-04-20 arrowhead sharpness
class Graphics {
    constructor(ctx, origin, scale) {
        this._errid_ = 0;
        this.color = '';
        this.closePath = false;
        this._ctx = ctx;
        this._origin = origin;
        this._scale = scale;
        this._ctxStrokeStyle = ctx.strokeStyle;
        this._ctxLineWidth = ctx.lineWidth;
        this._ctxFillStyle = ctx.strokeStyle;
        this._spacing = 20;
        this._fill = false;
        this.resetCtx();
    }
    get ctx() { return this._ctx; }
    set fill(value) { this._fill = value; }
    get fill() { return this._fill; }
    set spacing(value) { this._spacing = value; }
    get spacing() { return this._spacing; }
    resetCtx() {
        this._ctx.strokeStyle = this._ctxStrokeStyle;
        this._ctx.fillStyle = this._ctxFillStyle;
        this._ctx.lineWidth = this._ctxLineWidth;
        this.closePath = false; //usually never want to close graph!! careful then?
        this._ctx.setLineDash([]);
    } //reset line to solid makes sense
    get origin() { return this._origin; }
    get scale() { return this._scale; }
    static get_font(ctx) {
        return ctx.font;
    }
    static set_font(ctx, font) {
        ctx.font = font;
    }
    get font() { return this._ctx.font; }
    set font(value) { this._ctx.font = value; }
    get fontFamily() {
        return Graphics.getFontFamily(this._ctx.font);
    }
    get fontSize() {
        return Graphics.getFontSize(this._ctx.font);
    }
    set fontSize(value) {
        this._ctx.font = Graphics.setFontSize(this._ctx.font, value);
    }
    static setFontSize(font, newSize) {
        return font.replace(/(\d+(?:\.\d+)?)(px|em|rem|pt|%)\b/, (_, _oldSize, unit) => `${newSize}${unit}`);
    }
    set fontFamily(value) {
        this._ctx.font = Graphics.setFontFamily(this._ctx.font, value);
    }
    static setFontFamily(font, newFamily) {
        let sizeMatch = font.match(/\d+(?:\.\d+)?(px|em|rem|pt|%)\b/);
        if (!sizeMatch)
            return font; // No size found, return original
        let sizeIndex = font.indexOf(sizeMatch[0]);
        let afterSize = font.slice(sizeIndex + sizeMatch[0].length).trim();
        return font.slice(0, sizeIndex + sizeMatch[0].length) + ' ' + newFamily;
    }
    get fontUnit() {
        return Graphics.getFontUnit(this._ctx.font);
    }
    static getFontFamily(font) {
        let parts = font.split(/\s+/);
        const sizeIndex = parts.findIndex(part => /\d+(px|em|rem|pt|%)$/.test(part));
        if (sizeIndex === -1 || sizeIndex === parts.length - 1)
            throw new Error("Invalid font string: missing font family");
        let familyParts = parts.slice(sizeIndex + 1);
        return familyParts.join(" ");
    }
    static getFontSize(font) {
        const match = font.match(/(\d+(?:\.\d+)?)(px|em|rem|pt|%)\b/);
        return match ? parseFloat(match[1]) : 0;
    }
    static getFontUnit(font) {
        const match = font.match(/\d+(?:\.\d+)?(px|em|rem|pt|%)\b/);
        return match ? match[1] : '';
    }
    //fromTop
    t(x, y) {
        let height = this._ctx.canvas.height / this._scale[1];
        return [x, -height - y];
    }
    o(x, y) {
        return [x, y];
    }
    _(xy) {
        return this.o(xy[0], xy[1]);
    }
    get lineWidth() { return this._ctx.lineWidth; }
    set lineWidth(value) { this._ctx.lineWidth = value; }
    setLineDash(segments) {
        this._ctx.setLineDash(segments);
    }
    rectangle(xy, wh) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        let w = wh[0] * this._scale[0];
        let h = wh[1] * this._scale[1];
        return [xy_, [w, h]];
    }
    drawRectangle(xywh, color = 'blue', solid = false) {
        this.drawRect(xywh[0], xywh[1], color, solid);
    }
    drawRect(xy, wh, color, solid = false) {
        let ctx = this._ctx;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        //Demo3way.cout.wl(`color=[${color}]`);
        ctx.beginPath();
        let rec = this.rectangle(xy, wh);
        ctx.rect(rec[0][0], rec[0][1], rec[1][0], rec[1][1]);
        if (solid)
            ctx.fillRect(rec[0][0], rec[0][1], rec[1][0], rec[1][1]);
        ctx.stroke();
        this.resetCtx();
    }
    eachAt(xys, xy, scale = [1, 1], angle = 0) {
        let xys_ = XY.mulEach(xys, xy, scale, angle);
        return XY.mulEach(xys_, this._origin, this._scale);
    }
    at(xy_, xy, scale = [1, 1], angle = 0) {
        let xy2 = XY.mul(xy_, xy, scale, angle);
        return XY.mul(xy2, this._origin, this._scale);
    }
    moveTo(item) {
        this._ctx.moveTo(item[0], item[1]);
    }
    lineTo(item) {
        this._ctx.lineTo(item[0], item[1]);
    }
    ////ctx.arcTo(200, 130, 50, 20, 40);
    arcTo(xy0, xy1, radius) {
        this._ctx.arcTo(xy0[0], xy0[1], xy1[0], xy1[1], radius);
    }
    drawLine(xy0, xy1) {
        let xys = [];
        xys.push(xy0);
        xys.push(xy1);
        this.closePath = false;
        this.draw(xys);
    }
    // Dont be bempted to put this in draw, BAD IDEA!!!
    drawAt(xys, xy, color, fillColor = '', scale = [1, 1], angle = 0) {
        let xys_ = XY.mulEach(xys, xy, scale, angle);
        this.draw(xys_, color, fillColor);
    }
    draw(xys, strokeColor = 'blue', fillColor = '') {
        if (xys.length < 1)
            return;
        let ctx = this._ctx;
        ctx.strokeStyle = strokeColor;
        if (0 < fillColor.length)
            ctx.fillStyle = fillColor;
        let xys_ = XY.mulEach(xys, this._origin, this._scale);
        ctx.beginPath();
        this.moveTo(xys_[0]);
        xys_.forEach(item => { this.lineTo(item); });
        if (this.closePath)
            ctx.closePath();
        ctx.stroke();
        if (0 < fillColor.length)
            ctx.fill();
        this.resetCtx();
    }
    drawArc(xy, radius = 64, startAngle, endAngle, color = 'black') {
        let xys_ = [];
        let xy_ = XY.mul(xy, this._origin, this._scale);
        let ctx = this._ctx;
        ctx.beginPath();
        ctx.arc(xy_[0], xy_[1], radius, startAngle, endAngle);
        ctx.stroke();
    }
    //draws at origin
    drawCrosshair(xy, color = 'green', radius = 12, lineWidth = 1) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        Graphics.drawCrosshair(this._ctx, xy_, color, radius, lineWidth);
    }
    drawDot(xy, color = 'midnightblue', radius = 4) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        Graphics.drawDot(this._ctx, xy_, color, radius);
    }
    drawDots(XYs, color = 'midnightblue', radius = 4) {
        XYs.forEach(xy => this.drawDot(xy, color, radius));
    }
    drawCrosshairs(XYs, color = 'midnightblue', radius = 12, lineWidth = 1) {
        XYs.forEach(xy => this.drawCrosshair(xy, color, radius, lineWidth));
    }
    drawArrow(xy1, xy2, headLength = 10, sharpness = 10) {
        let xy1_ = XY.mul(xy1, this._origin, this._scale);
        let xy2_ = XY.mul(xy2, this._origin, this._scale);
        Tricks.drawArrow(this._ctx, xy1_, xy2_, headLength, sharpness);
    }
    drawImage(image, dx, dy, dWidth, dHeight) {
        this._ctx.drawImage(image, dx, dy, dWidth, dHeight);
    }
    drawLabel(text, xy, hour, length = 1, color = 'blue') {
        let ctx = this._ctx;
        let p = XY.mul(xy, this.origin, this.scale);
        let angle = (hour - 3) * Math.PI / 6;
        length *= this.scale[0];
        let linex = p[0] + length * Math.cos(angle);
        let liney = p[1] + length * Math.sin(angle);
        let strokeStyle_ = ctx.strokeStyle;
        let fillStyle_ = ctx.fillStyle;
        let lineWidth = ctx.lineWidth;
        let textAlign = ctx.textAlign;
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
        ctx.strokeStyle = strokeStyle_;
        ctx.fillStyle = fillStyle_;
        ctx.textAlign = textAlign;
        ctx.lineWidth = lineWidth;
    }
    fillTextboxAt(xy = [0, 0], at = [0, 0], textbox, color = 'blue') {
        let ctx = this._ctx;
        let xy1 = XY.mul(xy, at);
        let xy_ = XY.mul(xy1, this._origin, this._scale);
        let spacing = this.spacing;
        ;
        ctx.fillStyle = color;
        textbox.forEach(item => ctx.fillText(item, 4 + xy_[0], xy_[1] += spacing));
        this.resetCtx();
    }
    fillText(text, xy, color = 'blue', maxWidth = undefined) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        this._ctx.fillStyle = color;
        this._ctx.fillText(text, xy_[0], xy_[1], maxWidth);
        this.resetCtx();
    }
    fillTextUp(text, xy, angle = 0) {
        this.rotateWorld(xy, angle);
        this._ctx.fillText(text.toString(), 0, 0);
        this.rotateWorldI(xy, angle);
    }
    fillTextUpCC(text, xy, angle = 0) {
        this.rotateWorld(xy, -angle);
        this._ctx.fillText(text.toString(), 0, 0);
        this.rotateWorldI(xy, -angle);
    }
    toString() {
        let a = '';
        a += "{Graphics:[" + this.origin
            + "] ,scale:[" + this.scale[0] + ',' + this.scale[1] + "] ,color='" + this.color;
        a += "'}";
        return a;
    }
    //draws using ctx origin
    static drawCrosshair(ctx, xy, color = 'green', radius = 12, lineWidth = 1) {
        let strokeStyle = ctx.strokeStyle;
        ctx.strokeStyle = color;
        let lineWidth_ = ctx.lineWidth;
        ctx.lineWidth = lineWidth;
        let line = radius * 1.1;
        let target = 2;
        let x = xy[0];
        let y = xy[1];
        ctx.beginPath();
        ctx.arc(x, y, radius - 3, 0, 2 * Math.PI);
        ctx.moveTo(x, y + target);
        ctx.lineTo(x, y + line);
        ctx.moveTo(x, y - target);
        ctx.lineTo(x, y - line);
        ctx.moveTo(x + target, y);
        ctx.lineTo(x + line, y);
        ctx.moveTo(x - target, y);
        ctx.lineTo(x - line, y);
        ctx.moveTo(x, y);
        ctx.stroke();
        ctx.lineWidth = lineWidth_;
        ctx.strokeStyle = strokeStyle;
    }
    static drawDot(ctx, xy, color = 'midnightblue', radius = 12) {
        let strokeStyle = ctx.strokeStyle;
        let fillStyle = ctx.fillStyle;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        let lineWidth = ctx.lineWidth;
        ctx.lineWidth = 1;
        let line = radius * 1.1;
        let target = 2;
        let x = xy[0];
        let y = xy[1];
        ctx.beginPath();
        ctx.arc(x, y, radius - 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = fillStyle;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
    }
    //Nasty
    rotateWorld(xy, angle) {
        let xy_ = XY.mul(xy, this._origin, this._scale);
        this._ctx.translate(xy_[0], xy_[1]);
        this._ctx.rotate(angle);
    }
    rotateWorldI(xy, angle) {
        this._ctx.rotate(-angle);
        let xy_ = XY.mul(xy, this._origin, this._scale);
        this._ctx.translate(-xy_[0], -xy_[1]);
    }
}
//# sourceMappingURL=Graphics.js.map