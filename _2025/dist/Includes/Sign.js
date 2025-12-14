"use strict";
//2025-01-12
class Sign {
    constructor(xy, wh, hour, length = 20) {
        this.length = length;
        this.xy = xy;
        this._wh = wh;
        this.height = this.wh[1] + this.length;
        this.hour = hour;
        this.textbox = [];
        this._left = 1;
        this._xys = this.xys;
    }
    get wh() {
        if ((2 < this.hour && this.hour < 4)
            || (8 < this.hour && this.hour < 10))
            return XY.swap(this._wh);
        return this._wh;
    }
    static get poleColor() { return Sign.strokeStyle; }
    static set poleColor(value) { Sign.strokeStyle = value; }
    static set fontSize(value) {
        Sign.font = this.setFontSize(Sign.font, value);
    }
    static setFontSize(font, newSize) {
        return font.replace(/(\d+(?:\.\d+)?)(px|em|rem|pt|%)\b/, (_, _oldSize, unit) => `${newSize}${unit}`);
    }
    static set fontFamily(value) {
        this.font = this.setFontFamily(this.font, value);
    }
    static setFontFamily(font, newFamily) {
        let sizeMatch = font.match(/\d+(?:\.\d+)?(px|em|rem|pt|%)\b/);
        if (!sizeMatch)
            return font; // No size found, return original
        let sizeIndex = font.indexOf(sizeMatch[0]);
        let afterSize = font.slice(sizeIndex + sizeMatch[0].length).trim();
        return font.slice(0, sizeIndex + sizeMatch[0].length) + ' ' + newFamily;
    }
    set lefty(value) {
        if (value == true)
            this._left = -1;
        if (value == false)
            this._left = 1;
        this._xys = this.xys;
    }
    get lefty() {
        if (this._left < 0)
            return true;
        return false;
    }
    tl(hour) {
        if (!this.lefty) {
            if (12 == hour)
                return this._xys[1];
            if (3 == hour)
                return this._xys[4];
            if (6 == hour)
                return this._xys[3];
            if (9 == hour)
                return this._xys[2];
        }
        if (0 == hour)
            return this._xys[2];
        if (12 == hour)
            return this._xys[2];
        if (3 == hour)
            return this._xys[3];
        if (6 == hour)
            return this._xys[4];
        if (9 == hour)
            return this._xys[1];
        return this._xys[1];
    }
    draw(g) {
        g.lineWidth = Sign.lineWidth;
        let lt = this.tl(this.hour);
        g.fill = true;
        g.drawAt(this._xys, this.xy, Sign.poleColor, Sign.bgcolor);
        let font = g.font;
        g.font = Sign.font;
        g.spacing = Sign.spacing;
        g.fillTextboxAt(lt, this.xy, this.textbox, 'blue');
        g.resetCtx();
        g.font = font;
    }
    get xys() {
        let width = this.wh[0];
        let height = this.wh[1] + this.length;
        let dots = [];
        dots.push([0, 0]);
        dots.push([0, height]);
        dots.push([this._left * width, height]);
        dots.push([this._left * width, this.length]);
        dots.push([0, this.length]);
        let angle = XY.hour(this.hour);
        dots = XY.mulEach(dots, [0, 0], [1, 1], angle);
        return dots;
    }
    toString() {
        let a = '{Sign ';
        a += 'len=' + this.length;
        a += '\r\nxy=' + XY.format(this.xy, 2);
        a += '\r\nwh=[' + this.wh + ']';
        a += '\r\nhour=' + this.hour + '}';
        return a;
    }
}
Sign.font = '10px sans-serif';
Sign.spacing = 20;
Sign.lineWidth = 2;
Sign.strokeStyle = 'red';
Sign.fillStyle = 'blue';
Sign.bgcolor = 'yellow';
//# sourceMappingURL=Sign.js.map