"use strict";
//2026-03-02
class OutPin00 {
    constructor(source, xy, not = false, scale = [1, 1], hour = 12) {
        this._source = source;
        this._xy = xy;
        this._not = not;
        this._scale = scale;
        this.hour = hour;
        this.size = [10, 40];
        this._size = [10, 40];
        this._shape = Tricks.Rect(this._size);
        this.color = 'blue';
    }
    get hot() {
        if (this._not)
            return !this._source.hot;
        return this._source.hot;
    }
    get size() { return this._size; }
    set size(value) {
        this._size = value;
        this._shape = Tricks.Rect(this._size);
    }
    get length() { return this._size[1]; }
    set length(value) {
        let xy = [this.size[0], value];
        this.size = xy;
    }
    get xy() { return this._xy; }
    get shape() { return this._shape; }
    draw(g) {
        let rad = Tricks.hour(this.hour);
        let shape_ = XY.rotateEach(this.shape, rad);
        g.drawAt(shape_, this.xy, [1, 1]);
    }
    toString() {
        let a = '';
        a += `{OutPin00:[${this.xy}]`;
        a += ` size:[${this._size}] , hour:[${this.hour}]`;
        a += `<br/>${XY.$_(this.shape)}}}`;
        return a;
    }
}
class HasHot {
    constructor(xy) {
        this._xy = xy;
    }
    get hot() { return true; }
    get xy() { return this._xy; }
}
//# sourceMappingURL=OutPin.js.map