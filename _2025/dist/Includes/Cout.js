"use strict";
//2025-03-07
class Cout {
    constructor(ctx, origin, scale) {
        this._ctx = ctx;
        this._font = '10px sans-serif';
        this._origin = origin;
        this._scale = scale;
        this._data = [];
        this.fillStyle = 'navy';
        this.spacing = 12;
    }
    set font(value) { this._font = value; }
    get font() { return this._font; }
    set fontSize(value) {
        this.font = Cout.setFontSize(this.font, value);
    }
    static setFontSize(font, newSize) {
        return font.replace(/(\d+(?:\.\d+)?)(px|em|rem|pt|%)\b/, (_, _oldSize, unit) => `${newSize}${unit}`);
    }
    set fontFamily(value) {
        this.font = Cout.setFontFamily(this.font, value);
    }
    static setFontFamily(font, newFamily) {
        let sizeMatch = font.match(/\d+(?:\.\d+)?(px|em|rem|pt|%)\b/);
        if (!sizeMatch)
            return font; // No size found, return original
        let sizeIndex = font.indexOf(sizeMatch[0]);
        let afterSize = font.slice(sizeIndex + sizeMatch[0].length).trim();
        return font.slice(0, sizeIndex + sizeMatch[0].length) + ' ' + newFamily;
    }
    clear() { this._data = []; }
    w(value = '', value2 = '', value3 = '') {
        let text = value.toString()
            + value2.toString() + value3.toString();
        this._data.push(text);
    }
    wl(value = '', value2 = '', value3 = '') {
        let text = value.toString()
            + value2.toString() + value3.toString();
        let lines = text.split('\r\n');
        lines.forEach(line => this._data.push(line));
    }
    wlEach(text = '', xys, count = 99999) {
        let i = 0;
        xys.forEach(xy => {
            if (count < ++i)
                return;
            this._data.push('[' + i + ']' + text + Cout.round(xy));
        });
    }
    wls(count = 0, value = '', value2 = '', value3 = '') {
        for (let i = 0; i < count; ++i)
            this.wl(value, value2, value3);
    }
    //just leave till you fix all pgms using fill
    fill(xy = [0, 32]) {
        let at = XY.mul(xy, this._origin, this._scale);
        let ctx = this._ctx;
        let fillStyle_ = ctx.fillStyle;
        ctx.fillStyle = this.fillStyle;
        at[1] -= this.spacing;
        let font_ = ctx.font;
        ctx.font = this._font;
        this._data.forEach(item => {
            ctx.fillText(item, at[0], at[1] += this.spacing);
        });
        ctx.font = font_;
        ctx.fillStyle = fillStyle_;
    }
    fromtop(xy) {
        let height = this._ctx.canvas.height / this._scale[1];
        return [xy[0], -height - xy[1]];
    }
    static round(item, decimals = 0) {
        let result0 = A.round(item[0], decimals);
        let result1 = A.round(item[1], decimals);
        return [result0, result1];
    }
    toString() {
        return '{Cout ' //keep='+Cout.keep
            + "'" + this._font + "'" + '}';
    }
}
/*
ctx.canvas.style.fontWeight = 'bold';

static Fontnames: string[] =
["Arial"        //not monospace
,"Courier New"  //classic
,"Consolas"     //pre-installed with Windows
,"Fira Code"    //useless//ligatures readable
,"Inconsolata"  //useless elegant easy on the eyes
,"Monaco"];     //useless popular for macOS users
*/ 
//# sourceMappingURL=Cout.js.map