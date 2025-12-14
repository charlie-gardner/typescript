"use strict";
//2025-05-06 Moved drawCrosshair from: Tricks to Graphics
//2025-04-20 arrowhead sharpness
class Tricks {
    static add(array1, array2) {
        return array1.map((num, index) => num + (array2[index] || 0));
    }
    static addC(b, array) {
        return array.map(num => b + num);
    }
    static get2D(id) {
        let canvas = A.getElement(id);
        let ctx = canvas.getContext("2d");
        return ctx;
    }
    //2025-05-06 Moved drawCrosshair from: Tricks to Graphics
    static arc(xys, at, radius, startAngle, endAngle, count = 9, counterclockwise = false) {
        if (endAngle <= startAngle)
            endAngle += 2 * Math.PI;
        let dx = (endAngle - startAngle) / count;
        //cout.wl('dx='+A.round(dx,2));
        let xy = [radius * Math.cos(startAngle), radius * Math.sin(startAngle)];
        xys.push(XY.mul(xy, at));
        for (let i = 0; i < count; ++i) {
            xy = [radius * Math.cos(startAngle + i * dx), radius * Math.sin(startAngle + i * dx)];
            xys.push(XY.mul(xy, at));
        }
        xy = [radius * Math.cos(endAngle), radius * Math.sin(endAngle)];
        xys.push(XY.mul(xy, at));
    }
    static drawArrow(ctx, xy1, xy2, headLength = 10, sharpness = 10) {
        ctx.beginPath();
        ctx.moveTo(xy1[0], xy1[1]);
        ctx.lineTo(xy2[0], xy2[1]);
        ctx.stroke();
        this.drawArrowhead(ctx, xy1, xy2), headLength, sharpness;
    }
    static drawArrowhead(ctx, xy1, xy2, headLength = 10, sharpness = 10) {
        let x1 = xy1[0];
        let y1 = xy1[1];
        let x2 = xy2[0];
        let y2 = xy2[1];
        let angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / sharpness), y2 - headLength * Math.sin(angle - Math.PI / sharpness));
        ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / sharpness), y2 - headLength * Math.sin(angle + Math.PI / sharpness));
        ctx.closePath();
        ctx.fill();
    }
    //-----------------------------------
    //needed for gates
    static rectangle(parentXY, xywh) {
        let xy_ = XY.mul(parentXY, xywh[0]);
        return [xy_, xywh[1]];
    }
    //----------------------------------
    // from Plotter
    static func1(xs, dx, func) {
        let x0 = xs[0];
        let x1 = xs[1];
        let xys = []; //xys.pop();
        for (let i = x0; i <= x1; i += dx)
            xys.push([i, func(i)]);
        return xys;
    }
    static func2(xs, dx, func, value) {
        let x0 = xs[0];
        let x1 = xs[1];
        let xys = []; //xys.pop();
        for (let i = x0; i <= x1; i += dx)
            xys.push([i, func(value, i)]);
        return xys;
    }
    //Python
    static arange(first, last, dx = 1) {
        let ans = [];
        for (let i = first; i < last; i += dx)
            ans.push(i);
        return ans;
    }
}
//# sourceMappingURL=Tricks.js.map