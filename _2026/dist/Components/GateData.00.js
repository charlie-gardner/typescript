"use strict";
class GateData00 {
    static and(wh) {
        let ans = [];
        let h = wh[1] - wh[0];
        ans.push([wh[0], 0]);
        ans.push([wh[0], h]);
        this.arc(ans, [0, h], wh[0], 0, Math.PI);
        ans.push([-wh[0], h]);
        ans.push([-wh[0], 0]);
        ans.push([wh[0], 0]);
        return ans;
    }
    static nand(wh) {
        let radius = wh[0] / 4;
        let ans = [];
        let h = wh[1] - (wh[0] + 2 * radius);
        ans.push([wh[0], 0]);
        ans.push([wh[0], h]);
        this.arc(ans, [0, h], wh[0], 0, Math.PI / 2);
        this.arc(ans, [0, h + wh[0] + radius], radius, Math.PI * 3 / 2, Math.PI * 3 / 2);
        this.arc(ans, [0, h], wh[0], Math.PI / 2, Math.PI);
        ans.push([-wh[0], h]);
        ans.push([-wh[0], 0]);
        ans.push([wh[0], 0]);
        return ans;
    }
    static nor(wh) {
        let width = 2 * wh[0];
        let height = wh[1];
        let divide = 3.5;
        let a = Math.PI / divide;
        let icos = 1 / Math.cos(a);
        let radius = width * icos / 2;
        let center = -radius * Math.sin(a);
        let x = radius * Math.cos(a);
        let radius2 = (width / 2) / 4;
        let fix = 2;
        let x10 = .95 * x;
        let y10 = (height - fix * radius2) / 3;
        let x11 = .72 * x;
        let y11 = (height - fix * radius2) * 2 / 3;
        let x12 = .52 * x;
        let y12 = (height - fix * radius2) * 4 / 5;
        let x13 = .45 * x;
        let y13 = (height - fix * radius2) * 5 / 6;
        let ans = [];
        this.arc(ans, [0, center], radius, a, (divide - 1) * a);
        ans.push([-x, 0]);
        ans.push([-x10, y10]);
        ans.push([-x11, y11]);
        ans.push([-x12, y12]);
        ans.push([-x13, y13]);
        ans.push([0, height - fix * radius2]);
        this.arc(ans, [0, height - radius2], radius2, Math.PI * 3 / 2, Math.PI * 3 / 2);
        ans.push([0, height - fix * radius2]);
        ans.push([x13, y13]);
        ans.push([x12, y12]);
        ans.push([x11, y11]);
        ans.push([x10, y10]);
        ans.push([x, 0]);
        return ans;
    }
    static not(wh) {
        let radius = wh[0] / 4;
        let h = wh[1] - 2 * radius;
        let ans = [];
        ans.push([wh[0], 0]);
        ans.push([-wh[0], 0]);
        ans.push([0, h]);
        this.arc(ans, [0, h + radius], radius, Math.PI * 3 / 2, Math.PI * 3 / 2);
        ans.push([wh[0], 0]);
        return ans;
    }
    static or(wh) {
        let width = 2 * wh[0];
        let height = wh[1];
        let divide = 3.5;
        let a = Math.PI / divide;
        let icos = 1 / Math.cos(a);
        let radius = width * icos / 2;
        let center = -radius * Math.sin(a);
        let x = radius * Math.cos(a);
        let radius2 = (width / 2) / 4;
        let fix = 0;
        let x10 = .95 * x;
        let y10 = (height - fix * radius2) / 3;
        let x11 = .72 * x;
        let y11 = (height - fix * radius2) * 2 / 3;
        let x12 = .52 * x;
        let y12 = (height - fix * radius2) * 4 / 5;
        let x13 = .45 * x;
        let y13 = (height - fix * radius2) * 5 / 6;
        let ans = [];
        this.arc(ans, [0, center], radius, a, (divide - 1) * a);
        ans.push([-x, 0]);
        ans.push([-x10, y10]);
        ans.push([-x11, y11]);
        ans.push([-x12, y12]);
        ans.push([-x13, y13]);
        ans.push([0, height - fix * radius2]);
        ans.push([0, height - fix * radius2]);
        ans.push([x13, y13]);
        ans.push([x12, y12]);
        ans.push([x11, y11]);
        ans.push([x10, y10]);
        ans.push([x, 0]);
        return ans;
    }
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
}
//# sourceMappingURL=GateData.00.js.map