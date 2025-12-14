"use strict";
//2024-01-14
class L {
    constructor(wh) {
        this.wh = wh;
    }
    get w() { return this.wh[0]; }
    get h() { return this.wh[1]; }
    get head() { return [0, this.wh[1]]; }
    get xys() {
        let result = [];
        result.push([0, this.wh[1]]);
        result.push([0, 0]);
        result.push([this.wh[0], 0]);
        return result;
    }
    at(xy, scale = [1, 1], angle = 0) {
        let xys = this.xys;
        return XY.mulEach(xys, xy, scale, angle);
    }
    toString() {
        let br = XY.br;
        XY.br = false;
        let i = -1;
        let a = '{L wh=' + this.wh
            + '\r\nhead=' + this.head
            + '<br/>\r\n' + XY.$$(this.xys)
            + '}';
        XY.br = br;
        return a;
    }
    // -----------------------------
    // from gates
    get box() {
        let result = [];
        result.push([-this.wh[0], 0]);
        result.push([-this.wh[0], this.wh[1]]);
        result.push([this.wh[0], this.wh[1]]);
        result.push([this.wh[0], 0]);
        result.push([-this.wh[0], 0]);
        return result;
    }
    get led() {
        let ans = [];
        let m = 1;
        let h = 6 + this.wh[0] / 2;
        Tricks.arc(ans, [0, h], this.wh[0] - m, 0, 2 * Math.PI);
        return ans;
    }
    pin(extend = 0) {
        let result = [];
        result.push([-this.wh[0], -extend]);
        result.push([-this.wh[0], this.wh[1]]);
        result.push([this.wh[0], this.wh[1]]);
        result.push([this.wh[0], -extend]);
        return result;
    }
    static boundingBoxContainsXY(xys, xy) {
        if (xys.length < 1)
            return false;
        let minX = xys[0][0];
        let maxX = xys[0][0];
        let minY = xys[0][1];
        let maxY = xys[0][1];
        xys.forEach(item => {
            minX = Math.min(minX, item[0]);
            maxX = Math.max(maxX, item[0]);
            minY = Math.min(minY, item[1]);
            maxY = Math.max(maxY, item[1]);
        });
        if (xy[0] < minX)
            return false;
        if (xy[1] < minY)
            return false;
        if (maxX < xy[0])
            return false;
        if (maxY < xy[1])
            return false;
        return true;
    }
    static boxContainsXY(xys, xy) {
        return this.boundingBoxContainsXY(xys, xy);
    }
    static toLines(xys) {
        let lines = [];
        if (xys.length < 2)
            return lines;
        let i = 0;
        for (; i < xys.length - 1; ++i) {
            let line = new Line(xys[i], xys[i + 1]);
            lines.push(line);
        }
        if (i < 2)
            return lines;
        let line = new Line(xys[i], xys[0]);
        lines.push(line);
        return lines;
    }
    static containsXY(xys, xy) {
        let lines = this.toLines(xys);
        let count = 0;
        lines.forEach(line => {
            if (line.above(xy))
                ++count;
        });
        return count % 2 == 0 ? false : true;
    }
}
//# sourceMappingURL=L.js.map