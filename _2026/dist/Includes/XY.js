"use strict";
//2026-03-20
class XY {
    static mul(xy, at, scale = [1, 1], b = 0) {
        let result = [0, 0];
        result[0] = scale[0] * (Math.cos(b) * xy[0] - Math.sin(b) * xy[1]);
        result[1] = scale[1] * (Math.cos(b) * xy[1] + Math.sin(b) * xy[0]);
        result[0] += at[0];
        result[1] += at[1];
        return result;
    }
    static mulEach(XYs, xy, scale = [1, 1], angle = 0) {
        let result = []; //result.pop();
        XYs.forEach((item) => result.push(this.mul(item, xy, scale, angle)));
        return result;
    }
    static $(xy, width = 0, decimals = 0, fillchar = ' ') {
        return '['
            + `${xy[0].toFixed(decimals).padStart(width, ' ')}` + ','
            + `${xy[1].toFixed(decimals).padStart(width, ' ')}` + ']';
    }
    static $$(xys, width = 0, decimals = 0, fillchar = ' ') {
        let a = '';
        let br = '';
        xys.forEach(item => { a += br + this.$(item, width, decimals); br = this._br + ''; });
        return a;
    }
    static $_(xys, width = 0, decimals = 0, sep = ',') {
        let a = '[';
        let sep_ = '';
        xys.forEach(item => { a += sep_ + this.$(item, width, decimals); sep_ = sep; });
        return a + ']';
    }
    static add(xy1, xy2) {
        return [xy1[0] + xy2[0], xy1[1] + xy2[1]];
    }
    static subtract(xy1, xy2) {
        return [xy1[0] - xy2[0], xy1[1] - xy2[1]];
    }
    static addEach(XYs, xy) {
        let result = []; //result.pop();
        XYs.forEach((item) => result.push(this.add(item, xy)));
        return result;
    }
    static times(xy1, xy2) {
        return [xy1[0] * xy2[0], xy1[1] * xy2[1]];
    }
    static rotate(xy, b = 0) {
        let result = [0, 0];
        result[0] = Math.cos(b) * xy[0] - Math.sin(b) * xy[1];
        result[1] = Math.cos(b) * xy[1] + Math.sin(b) * xy[0];
        return result;
    }
    static rotateEach(XYs, angle = 0) {
        let result = []; //result.pop();
        XYs.forEach((item) => result.push(this.rotate(item, angle)));
        return result;
    }
    static px_to_xy(xy, at, scale) {
        return this.div(xy, at, scale);
    }
    static div(xy, at, scale) {
        let xy2 = [0, 0];
        xy2[0] = xy[0] - at[0];
        xy2[1] = -xy[1] + at[1];
        let xy3 = [0, 0];
        xy3[0] = xy2[0] / scale[0];
        xy3[1] = xy2[1] / -scale[1];
        return xy3;
    }
    static divEach(XYs, xy, scale = [1, 1], angle = 0) {
        let result = []; //result.pop();
        XYs.forEach((item) => result.push(this.div(item, xy, scale)));
        return result;
    }
    static ys(points) {
        return points.map(([_, y]) => y);
    }
    static replaceEachY(xys, ys) {
        return xys.map(([x], i) => [x, ys[i]]);
    }
    //2026-03-02 matches C# mask to an Image IF required
    //the boundingbox is from max and min
    static flipEach_y(ys) {
        const max = Math.max(...ys);
        const min = Math.min(...ys);
        let length = max - min;
        const result = [...ys];
        for (let i = 2; i < ys.length; ++i)
            result[i] = length - ys[i];
        return result;
    }
    //2026-03-02 matches C# mask to an Image IF required
    //C# masks can be upside down see my expanation wherever
    static flipEachY(xys) {
        let ys = XY.ys(xys);
        let flipY = this.flipEach_y(ys);
        let result = XY.replaceEachY(xys, flipY);
        return result;
    }
    static addEachX(xys, value) {
        return xys.map(([x, y]) => [x + value, y]);
    }
    static size(xys) {
        let xs = xys.map(([x]) => x);
        let ys = xys.map(([, y]) => y);
        let x = Math.max(...xs) - Math.min(...xs);
        let y = Math.max(...ys) - Math.min(...ys);
        return [x, y];
    }
    static shiftMiddle(xy, size) {
        let half = size[0] / 2;
        return [xy[0] - half, xy[1]];
    }
    static round(item, decimals = 0) {
        let result0 = this.round1(item[0], decimals);
        let result1 = this.round1(item[1], decimals);
        return [result0, result1];
    }
    static round1(value, decimals = 0) {
        let result = value * Math.pow(10, decimals);
        return Math.round(result) / Math.pow(10, decimals);
    }
    static swap(xy) {
        let xy_ = [xy[1], xy[0]];
        return xy_;
    }
    static len(xy1, xy2) {
        let lenX = xy2[0] - xy1[0];
        let lenY = xy2[1] - xy1[1];
        return Math.sqrt(lenX * lenX + lenY * lenY);
    }
    ;
    static atan2(a, b) {
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        return -Math.atan2(dy, dx);
    }
    static split1(xy1, xy2, split = .5) {
        let d = this.subtract(xy2, xy1);
        let xy = [d[0] * split, d[1] * split];
        return this.add(xy1, xy);
    }
    static split(xy1, xy2, ...splits) {
        const rslt = [];
        rslt.push(xy1);
        for (const s of splits)
            if (s !== 0)
                rslt.push(this.split1(xy1, xy2, s));
        rslt.push(xy2);
        return rslt;
    }
}
XY._br = '<br/>';
//# sourceMappingURL=XY.js.map