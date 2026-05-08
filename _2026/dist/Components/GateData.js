"use strict";
//2026-04-13 moved origin to [0,0] not [w/2,0] to match image
class GateData {
    static and(size) {
        let ans = [];
        let w = size[0];
        let r = w / 2;
        let h = size[1] - r;
        ans.push([w, 0]);
        ans.push([w, h]);
        this.arc(ans, [r, h], r, 0, Math.PI);
        ans.push([0, h]);
        ans.push([0, 0]);
        ans.push([w, 0]);
        return ans;
    }
    static nand(size) {
        let w = size[0];
        let r = w / 2;
        let r2 = w / 8;
        let h = size[1] - (r + 2 * r2);
        let ans = [];
        ans.push([w, 0]);
        ans.push([w, h]);
        this.arc(ans, [r, h], r, 0, Math.PI / 2);
        this.arc(ans, [r, h + r + r2], r2, Math.PI * 3 / 2, Math.PI * 3 / 2);
        this.arc(ans, [r, h], r, Math.PI / 2, Math.PI);
        ans.push([0, h]);
        ans.push([0, 0]);
        ans.push([w, 0]);
        return ans;
    }
    static nor(size) {
        let w = size[0];
        let h = size[1];
        let divide = 3.5;
        let a = Math.PI / divide;
        let icos = 1 / Math.cos(a);
        let radius = w * icos / 2;
        let center = -radius * Math.sin(a);
        let x = radius * Math.cos(a);
        let radius2 = (w / 2) / 4;
        let fix = 2;
        let x10 = .95 * x;
        let y10 = (h - fix * radius2) / 3;
        let x11 = .72 * x;
        let y11 = (h - fix * radius2) * 2 / 3;
        let x12 = .52 * x;
        let y12 = (h - fix * radius2) * 4 / 5;
        let x13 = .45 * x;
        let y13 = (h - fix * radius2) * 5 / 6;
        let ans = [];
        let z = w / 2;
        this.arc(ans, [z, center], radius, a, (divide - 1) * a);
        ans.push([z - x, 0]);
        ans.push([z - x10, y10]);
        ans.push([z - x11, y11]);
        ans.push([z - x12, y12]);
        ans.push([z - x13, y13]);
        ans.push([z, h - fix * radius2]);
        this.arc(ans, [z, h - radius2], radius2, Math.PI * 3 / 2, Math.PI * 3 / 2);
        ans.push([z + 0, h - fix * radius2]);
        ans.push([z + x13, y13]);
        ans.push([z + x12, y12]);
        ans.push([z + x11, y11]);
        ans.push([z + x10, y10]);
        ans.push([z + x, 0]);
        return ans;
    }
    static not(size) {
        let w = size[0];
        let r = w / 8;
        let h = size[1] - 2 * r;
        let ans = [];
        ans.push([w, 0]);
        ans.push([0, 0]);
        ans.push([w / 2, h]);
        this.arc(ans, [w / 2, h + r], r, Math.PI * 3 / 2, Math.PI * 3 / 2);
        ans.push([w, 0]);
        return ans;
    }
    static or(size) {
        let w = size[0];
        let h = size[1];
        let divide = 3.5;
        let a = Math.PI / divide;
        let icos = 1 / Math.cos(a);
        let r = w * icos / 2;
        let center = -r * Math.sin(a);
        let x = r * Math.cos(a);
        let r2 = (w / 2) / 4;
        let fix = 0;
        let x10 = .95 * x;
        let y10 = (h - fix * r2) / 3;
        let x11 = .72 * x;
        let y11 = (h - fix * r2) * 2 / 3;
        let x12 = .52 * x;
        let y12 = (h - fix * r2) * 4 / 5;
        let x13 = .45 * x;
        let y13 = (h - fix * r2) * 5 / 6;
        let ans = [];
        let z = w / 2;
        this.arc(ans, [z, center], r, a, (divide - 1) * a);
        ans.push([z - x, 0]);
        ans.push([z - x10, y10]);
        ans.push([z - x11, y11]);
        ans.push([z - x12, y12]);
        ans.push([z - x13, y13]);
        ans.push([z + 0, h - fix * r2]);
        ans.push([z + 0, h - fix * r2]);
        ans.push([z + x13, y13]);
        ans.push([z + x12, y12]);
        ans.push([z + x11, y11]);
        ans.push([z + x10, y10]);
        ans.push([z + x, 0]);
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
//# sourceMappingURL=GateData.js.map