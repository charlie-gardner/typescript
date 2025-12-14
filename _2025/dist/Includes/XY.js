"use strict";
//2025-03-20
//changed fillcar from '.' to ' ' //use:'_' never use '.' it puts decimal in number
class XY {
    static xy(e) {
        let el = e.target;
        let width = 0;
        let height = 0;
        if ('' + el == '[object HTMLCanvasElement]') {
            width = el.width;
            height = el.height;
        }
        if ('' + el == '[object HTMLVideoElement]') {
            width = el.width;
            height = el.height;
        }
        let fixX = width / el.clientWidth;
        let fixY = height / el.clientHeight;
        let result 
        //=[Math.round(e.offsetX*fixX),Math.round(e.offsetY*fixY)];
        = [e.offsetX * fixX, e.offsetY * fixY];
        return result;
    }
    //the x result is sometimes off a bit
    //its usually ok
    //i looked at it different ways
    static displayEvent(e) {
        let a = '';
        if (!A.ok(e))
            return a;
        let el = e.target;
        let width = 0;
        let height = 0;
        if ('' + el == '[object HTMLCanvasElement]') {
            width = el.width;
            height = el.height;
            a += `el:       [${width},${height}]`;
        }
        a += `\r\nel.client:[${el.clientWidth},${el.clientHeight}]`;
        a += `\r\ne.offset: [${A.$(e.offsetX, 7, 2)},${A.$(e.offsetY, 7, 2)}]`;
        a += `\r\ne.screen: [${A.$(e.screenX, 7, 2)},${A.$(e.screenY, 7, 2)}]`;
        let fixX = width / el.clientWidth;
        let fixY = height / el.clientHeight;
        a += `\r\nfix:      [${A.$(fixX, 5, 3)},${A.$(fixY, 5, 3)}]`;
        let result = [e.offsetX * fixX, e.offsetY * fixY];
        a += `\r\nresult:[${A.$(result[0], 7, 2)},${A.$(result[1], 7, 2)}]`;
        a += '\r\n';
        if (!A.ok(el))
            return a;
        try {
            let rectB = el.getBoundingClientRect();
            a += `\r\nrectB:[${A.$(rectB.left, 7, 2)},${A.$(rectB.top, 7, 2)}]`;
            a += `\r\nrectB:[${A.$(rectB.width, 7, 2)},${A.$(rectB.height, 7, 2)}]`;
            a += `\r\nclient:[${A.$(e.clientX, 7, 2)},${A.$(e.clientY, 7, 2)}]`;
            let actualX = e.clientX - rectB.left;
            let actualY = e.clientY - rectB.top;
            a += `\r\nactual:[${A.$(actualX, 7, 2)},${A.$(actualY, 7, 2)}]`;
        }
        catch { }
        finally { }
        return a;
    }
    static clone(xy) {
        let xy_ = [xy[0], xy[1]];
        return xy_;
    }
    static cloneEach(xys) {
        let xys_ = [];
        xys.forEach(xy => xys_.push(xy));
        return xys_;
    }
    static mulS(xy, value, value2 = value) {
        let result = [xy[0] * value, xy[1] * value2];
        return result;
    }
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
    static div(xy, origin, scale) {
        let xy2 = [0, 0];
        xy2[0] = xy[0] - origin[0];
        xy2[1] = -xy[1] + origin[1];
        let xy3 = [0, 0];
        xy3[0] = xy2[0] / scale[0];
        xy3[1] = xy2[1] / -scale[1];
        return xy3;
    }
    static add(xy, xy2) {
        let result = [xy[0], xy[1]];
        result[0] += xy2[0];
        result[1] += xy2[1];
        return result;
    }
    static neg(xy) {
        let result = [-xy[0], -xy[1]];
        return result;
    }
    static mix(v1, v2) {
        return [v1[0], v2[1]];
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
    static triArea(tri) {
        let x1 = tri[0][0];
        let y1 = tri[0][1];
        let x2 = tri[1][0];
        let y2 = tri[1][1];
        let x3 = tri[2][0];
        let y3 = tri[2][1];
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    }
    static triContainsXY(tri, xy) {
        if (!this.boxContainsXY(tri, xy))
            return false; //cheap trick
        let A = this.triArea(tri);
        let x = xy[0];
        let y = xy[1];
        let tri_ = [];
        tri_.push(xy);
        tri_.push(tri[1]);
        tri_.push(tri[2]);
        let A1 = this.triArea(tri_);
        tri_ = [];
        tri_.push(tri[0]);
        tri_.push(xy);
        tri_.push(tri[2]);
        let A2 = this.triArea(tri_);
        tri_ = [];
        tri_.push(tri[0]);
        tri_.push(tri[1]);
        tri_.push(xy);
        let A3 = this.triArea(tri_);
        return (A == A1 + A2 + A3);
    }
    //This WORKS!! because a rect can NOT be rotated
    //only 4 points can be rotated
    static rectContainsXY(rect, xy) {
        let x = rect[0];
        let y = rect[1];
        let width = rect[2];
        let height = rect[3];
        if (xy[0] < Math.min(x, x + width))
            return false;
        if (Math.max(x, x + width) < xy[0])
            return false;
        if (xy[1] < Math.min(y, y + height))
            return false;
        if (Math.max(y, y + height) < xy[1])
            return false;
        return true;
    }
    static rectangleContainsXY(xywh, xy) {
        let x = xywh[0][0];
        let y = xywh[0][1];
        let width = xywh[1][0];
        let height = xywh[1][1];
        if (xy[0] < Math.min(x, x + width))
            return false;
        if (Math.max(x, x + width) < xy[0])
            return false;
        if (xy[1] < Math.min(y, y + height))
            return false;
        if (Math.max(y, y + height) < xy[1])
            return false;
        return true;
    }
    static circleContainsXY(radius, x, y) {
        if (radius * radius < x * x + y * y)
            return false;
        return true;
    }
    static drawEach(ctx, XYs, xy = [0, 0], scale = [1, 1], angle = 0) {
        if (XYs.length < 1)
            return;
        let result = this.mulEach(XYs, xy, scale, angle);
        ctx.beginPath();
        ctx.moveTo(result[0][0], result[0][1]);
        for (let i = 1; i < result.length; ++i)
            ctx.lineTo(result[i][0], result[i][1]);
        ctx.stroke();
    }
    static round(item, decimals = 0) {
        let result0 = A.round(item[0], decimals);
        let result1 = A.round(item[1], decimals);
        return [result0, result1];
    }
    static hour(value) {
        return -value * Math.PI / 6;
    }
    static swap(xy) {
        let xy_ = [xy[1], xy[0]];
        return xy_;
    }
    static set br(value) {
        if (value)
            this._br = '<br/>';
        if (!value)
            this._br = ',';
    }
    static formatDeprecated(xy, width = 0, decimals = 0, fillchar = ' ') {
        return '['
            + A.round(xy[0], decimals).toString().padStart(width, fillchar)
            + '|'
            + A.round(xy[1], decimals).toString().padStart(width, fillchar)
            + ']';
    }
    static $(xy, width = 0, decimals = 0, fillchar = ' ') {
        return '['
            + `${xy[0].toFixed(decimals).padStart(width, ' ')}` + ','
            + `${xy[1].toFixed(decimals).padStart(width, ' ')}` + ']';
    }
    static format(xy, width = 0, decimals = 0, fillchar = ' ') {
        return this.$(xy, width, decimals, fillchar);
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
}
XY._br = '<br/>';
//# sourceMappingURL=XY.js.map