"use strict";
//2026-04-14 [!!!new]
class Sign {
    constructor(xy, hour = 0, length = 20) {
        this.length = length;
        this.xy = xy;
        this.hour = hour;
        this.text = [];
    }
    update(g, e) { }
    static get poleColor() { return this.strokeStyle; }
    static set poleColor(value) { this.strokeStyle = value; }
    draw(g) {
        Sign.draw(g, this.text, this.xy, this.hour, this.length, Sign.strokeStyle);
    }
    static draw(//2026-04-11 copilot
    g, text, xy, hour, length = 1, color = 'blue') {
        let ctx = g.ctx;
        hour = ((hour % 12) + 12) % 12;
        const lines = Array.isArray(text) ? text : [text];
        let p = XY.mul(xy, g.origin, g.scale);
        let radians = (hour - 3) * Math.PI / 6;
        length *= g.scale[0];
        let lx = p[0] + length * Math.cos(radians);
        let ly = p[1] + length * Math.sin(radians);
        ctx.save();
        ctx.lineWidth = 1;
        const padding = 3;
        const metrics = lines.map(t => ctx.measureText(t));
        const lineHeight = metrics[0].actualBoundingBoxAscent +
            metrics[0].actualBoundingBoxDescent;
        const w = Math.max(...metrics.map(m => m.width)) + padding * 2;
        const h = lineHeight * lines.length + padding * 2;
        let corner;
        if (hour >= 0 && hour < 3)
            corner = "bl";
        else if (hour >= 3 && hour <= 6)
            corner = "tl";
        else if (hour > 6 && hour <= 9)
            corner = "tr";
        else
            corner = "br";
        let boxX = lx;
        let boxY = ly;
        if (corner === "bl") {
            boxY -= h;
        }
        else if (corner === "tl") {
            // no vertical shift
        }
        else if (corner === "tr") {
            boxX -= w;
        }
        else if (corner === "br") {
            boxX -= w;
            boxY -= h;
        }
        ctx.fillStyle = Sign.fillStyle;
        ctx.fillRect(boxX, boxY, w, h);
        ctx.strokeStyle = Sign.strokeStyle;
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, w, h);
        ctx.fillStyle = Sign.color;
        ctx.textAlign = "left";
        lines.forEach((t, i) => {
            ctx.fillText(t, boxX + padding, boxY + padding + metrics[0].actualBoundingBoxAscent
                + i * lineHeight);
        });
        ctx.beginPath();
        ctx.moveTo(p[0], p[1]);
        let cx = boxX;
        let cy = boxY;
        if (corner === "bl") {
            cy = boxY + h;
        }
        else if (corner === "tl") {
            // cx, cy already correct
        }
        else if (corner === "tr") {
            cx = boxX + w;
        }
        else if (corner === "br") {
            cx = boxX + w;
            cy = boxY + h;
        }
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.restore();
    }
}
Sign.font = '24px Consolas, monospace';
Sign.color = 'blue';
Sign.strokeStyle = 'red';
Sign.fillStyle = 'yellow';
//# sourceMappingURL=Sign.js.map