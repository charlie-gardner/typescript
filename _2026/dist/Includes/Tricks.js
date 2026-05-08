"use strict";
//2026-03-18  keep 
class Tricks {
    static pop(xys) {
        let try_ = xys.pop();
        return try_;
    }
    static rect(lb, rt, fix = 0) {
        //let w=rt[0]-lb[0];//unadjust
        let lb_ = [lb[0] - fix, lb[1]];
        let rt_ = [rt[0] - fix, rt[1]];
        const leftBottom = lb_;
        const leftTop = [lb_[0], rt_[1]];
        const rightTop = rt_;
        const rightBottom = [rt_[0], lb_[1]];
        return [leftBottom, leftTop, rightTop, rightBottom, leftBottom];
    }
    static defaultDrawState(fontsize = 24) {
        return {
            font: `${fontsize}px Consolas, monospace`,
            lineHeight: fontsize,
            color: 'blue',
            strokeStyle: 'red',
            fillStyle: 'yellow',
            lineWidth: 2
        };
    }
    static centerSignAt(ctx, size, at, scale, hour) {
        let state = this.defaultDrawState(24);
        let radians = hour * Math.PI / 6;
        let size_ = [size[0] * scale[0], size[1] * scale[1]];
        let [px, py] = at;
        let [w, h] = size_;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(radians);
        //ctx.drawImage(img, -w / 2, 0, w, h);
        ctx.fillStyle = state.fillStyle;
        ctx.fillRect(-w / 2, 0, w, h);
        ctx.strokeStyle = state.strokeStyle; // outline color
        ctx.lineWidth = state.lineWidth; // optional: outline thickness
        ctx.strokeRect(-w / 2, 0, w, h);
        const lines = [`[${w},${h}]`, "This is inside", "the red box"];
        ctx.fillStyle = state.color;
        ctx.font = state.font;
        const lineHeight = state.lineHeight;
        lines.forEach((line, i) => ctx.fillText(line, lineHeight / 4 - w / 2, h + 1.2 * lineHeight + i * lineHeight));
        ctx.restore();
    }
    static round(value, decimals = 0) {
        let result = value * Math.pow(10, decimals);
        return Math.round(result) / Math.pow(10, decimals);
    }
}
//# sourceMappingURL=Tricks.js.map