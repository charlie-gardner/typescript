"use strict";
//2026-03-20
class Ctx {
    static center(xys, at, scale, hour) {
        let radians = -hour * Math.PI / 6;
        let w = this.width(xys);
        let xys0 = XY.addEach(xys, [-w / 2, 0]);
        let xys_ = XY.mulEach(xys0, at, scale, radians);
        return xys_;
    }
    static centerImage(ctx, img, at, scale, hour) {
        let radians = hour * Math.PI / 6;
        let size = [img.width * scale[0], img.height * scale[1]];
        let [px, py] = at;
        let [w, h] = size;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(radians);
        ctx.drawImage(img, -w / 2, 0, w, h);
        ctx.restore();
    }
    static draw(ctx, xys) {
        this.moveTo(ctx, xys[0]);
        xys.forEach(item => this.lineTo(ctx, item));
    }
    static drawCircle(ctx, xy, strokeStyle = 'black', fillStyle = 'transparent', radius = 12, lineWidth = 1) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], radius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();
    }
    ;
    static drawCrosshair(ctx, xy, color = 'green', radius = 12, lineWidth = 1) {
        ctx.save();
        ctx.strokeStyle = color;
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
        ctx.restore();
    }
    static drawCrosshairs(ctx, xys, color = 'midnightblue', radius = 12, lineWidth = 1) {
        xys.forEach(xy => this.drawCrosshair(ctx, xy, color, radius, lineWidth));
    }
    static xy(e, origin, scale) {
        let pixel = Ctx.toPixel(e);
        return XY.px_to_xy(pixel, origin, scale);
    }
    static toPixel(e) {
        const el = e.target;
        let width = 0;
        let height = 0;
        if (el instanceof HTMLCanvasElement) {
            width = el.width;
            height = el.height;
        }
        if (el instanceof HTMLVideoElement) {
            width = el.width;
            height = el.height;
        }
        const fixX = width / el.clientWidth;
        const fixY = height / el.clientHeight;
        const result = [
            e.offsetX * fixX, e.offsetY * fixY
        ];
        return result;
    }
    static rect(size) {
        const w = size[0];
        const h = size[1];
        const leftBottom = [0, 0];
        const leftTop = [0, h];
        const rightTop = [w, h];
        const rightBottom = [w, 0];
        return [leftBottom, leftTop, rightTop, rightBottom, leftBottom];
    }
    static contains(polygon, point) {
        const [px, py] = point;
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const [xi, yi] = polygon[i];
            const [xj, yj] = polygon[j];
            const intersect = yi > py !== yj > py &&
                px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    static width(xys) {
        if (xys.length === 0)
            return 0;
        let minX = xys[0][0];
        let maxX = xys[0][0];
        for (const [x] of xys) {
            if (x < minX)
                minX = x;
            if (x > maxX)
                maxX = x;
        }
        return maxX - minX;
    }
    static height(xys) {
        if (xys.length === 0)
            return 0;
        const ys = xys.map(p => p[1]);
        return Math.max(...ys) - Math.min(...ys);
    }
    //static toRadians(value:number):number {//chas original
    //return (2*Math.PI+(-value*Math.PI/6))%(2*Math.PI);}
    //static toHour(radians: number): number {//chas original
    //return (12+(-radians * 6 / Math.PI))%12;}
    static toRadians(hour) {
        return (2 * Math.PI - hour * (Math.PI / 6)) % (2 * Math.PI);
    }
    static toHour(rad) {
        return (12 - rad * (6 / Math.PI)) % 12;
    }
    //shows that toHour and toRadians work as expected
    // hour 12 = 2*PI
    static toHourVerify(hour) {
        let r = Ctx.toRadians(hour);
        let r_ = r / Math.PI;
        let hour_ = Ctx.toHour(r);
        let a = `hour:[${Ctx.round(hour, 2)}] ,radians:[${Ctx.round(r, 4)}] ,fix:[${Ctx.round(r_, 2)}]`;
        a += ` ,hour_:[${Ctx.round(hour_, 2)}]`;
        return a;
    }
    static moveTo(ctx, item) {
        ctx.moveTo(item[0], item[1]);
    }
    static lineTo(ctx, item) {
        ctx.lineTo(item[0], item[1]);
    }
    //tricky:canvas gets moved  then rotated 
    static transform(ctx, xy, angle) {
        ctx.translate(xy[0], xy[1]);
        ctx.rotate(angle);
    }
    //the transform gets undone
    static transformI(ctx, xy, angle) {
        ctx.rotate(-angle);
        ctx.translate(-xy[0], -xy[1]);
    }
    static fillText(ctx, text, xy, fillStyle = 'midnightblue', font = '24px Consolas, monospace') {
        ctx.save();
        ctx.fillStyle = fillStyle;
        ctx.font = font;
        ctx.fillText(text.toString(), 0, 0);
        ctx.restore();
    }
    static drawArrow(ctx, xy1, xy2, color, lineWidth, headLength = 10, sharpness = 10) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(xy1[0], xy1[1]);
        ctx.lineTo(xy2[0], xy2[1]);
        ctx.stroke();
        this.drawArrowhead(ctx, xy1, xy2, color, headLength, sharpness);
        ctx.restore();
    }
    static drawArrowhead(ctx, xy1, xy2, fillStyle, headLength = 10, sharpness = 10) {
        let x1 = xy1[0];
        let y1 = xy1[1];
        let x2 = xy2[0];
        let y2 = xy2[1];
        let angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / sharpness), y2 - headLength * Math.sin(angle - Math.PI / sharpness));
        ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / sharpness), y2 - headLength * Math.sin(angle + Math.PI / sharpness));
        ctx.closePath();
        ctx.fill();
    }
    static round(value, decimals = 0) {
        let result = value * Math.pow(10, decimals);
        return Math.round(result) / Math.pow(10, decimals);
    }
    //Nasty from 2025
    rotateWorld(ctx, xy, angle) {
        ctx.translate(xy[0], xy[1]);
        ctx.rotate(angle);
    }
}
//# sourceMappingURL=Ctx.js.map