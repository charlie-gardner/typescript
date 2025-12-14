"use strict";
//2025-04-05 New
//canvas:[428,240]
//origin:[104,186]
//scale:[100,-200]
//tick1:0.1
//tick2:0.5
//let startPixel:number=origin%(scale*tick);
//scale*tick:10=100*.1 dx in pixels
//graphpaper is square so dx=dy for lines and ticks
class Plotter {
    constructor(origin, scale = [32, -32]) {
        this.scale = scale;
        this.origin = origin;
        this.tick1 = 1;
        this.tick2 = 2;
        this.line1Color = 'lightblue';
        this.line2Color = 'lightskyblue';
        this.tick1Color = 'blue';
        this.tick2Color = 'blue';
        this.tick1Length = 4;
        this.tick2Length = 2 * this.tick1Length;
        this.axisColor = 'navy';
        this.textColor = 'blue';
        this.marginY = -4;
        this.marginX = -12;
        this._tickY1 = false;
    }
    get _tick1() { return this.tick1Length / 4; }
    get _tick2() { return this.tick1Length / 2; }
    get stretch() { return -this.scale[1] / this.scale[0]; }
    get tickY1() { return this._tickY1; }
    set tickY1(value) { this._tickY1 = value; }
    static startPixel(origin, scale, tick) {
        return origin % (scale * tick);
    }
    static toValue(value, tick, scale, stretch) {
        return -(value - tick) / (scale * stretch);
    }
    draw(ctx, drawGrid = true) {
        let strokeStyle = ctx.strokeStyle;
        let fillStyle = ctx.fillStyle;
        let textAlign = ctx.textAlign;
        let lineWidth = ctx.lineWidth;
        if (drawGrid)
            this.drawLines(ctx);
        this.drawTicks(ctx);
        this.drawAxis(ctx);
        this.drawHText(ctx);
        if (this.tickY1)
            this.drawVText(ctx, this.tick1);
        if (!this.tickY1)
            this.drawVText(ctx, this.tick2);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.textAlign = textAlign;
        ctx.lineWidth = lineWidth;
    }
    drawAxis(ctx) {
        ctx.strokeStyle = this.axisColor;
        Plotter.drawVfullLine(ctx, this.origin[0]);
        Plotter.drawHfullLine(ctx, this.origin[1]);
    }
    static drawVfullLine(ctx, value) {
        ctx.beginPath();
        ctx.moveTo(value, 0);
        ctx.lineTo(value, ctx.canvas.height);
        ctx.stroke();
    }
    static drawVLine(ctx, y1, y2, value) {
        ctx.beginPath();
        ctx.moveTo(value, y1);
        ctx.lineTo(value, y2);
        ctx.stroke();
    }
    static drawHfullLine(ctx, value) {
        ctx.beginPath();
        ctx.moveTo(0, value);
        ctx.lineTo(ctx.canvas.width, value);
        ctx.stroke();
    }
    static drawHLine(ctx, x1, x2, value) {
        ctx.beginPath();
        ctx.moveTo(x1, value);
        ctx.lineTo(x2, value);
        ctx.stroke();
    }
    tblXY(ctx, origin, scale, size, tick) {
        let xys = [];
        let startPixel = origin % (scale * tick);
        let i = 0;
        for (let index = startPixel; index < size; index += this.scale[0] * tick, ++i) {
            let xy = [i, index, 0, 0, 0];
            xy[2] = xy[1] - origin;
            xy[3] = xy[2] / (scale);
            xys.push(xy);
        }
        return xys;
    }
    drawLines(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.line1Color;
        this.tblXY(ctx, this.origin[0], this.scale[0], ctx.canvas.width, this.tick1).forEach(row => Plotter.drawVfullLine(ctx, row[1]));
        this.tblXY(ctx, this.origin[1], this.scale[0], ctx.canvas.height, this.tick1).forEach(row => Plotter.drawHfullLine(ctx, row[1]));
        ctx.strokeStyle = this.line2Color;
        this.tblXY(ctx, this.origin[0], this.scale[0], ctx.canvas.width, this.tick2).forEach(row => Plotter.drawVfullLine(ctx, row[1]));
        this.tblXY(ctx, this.origin[1], this.scale[0], ctx.canvas.height, this.tick2).forEach(row => Plotter.drawHfullLine(ctx, row[1]));
    }
    drawTicks(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.tick1Color;
        let ox = this.origin[0];
        let oy = this.origin[1];
        this.tblXY(ctx, this.origin[0], this.scale[0], ctx.canvas.width, this.tick1)
            .forEach(row => Plotter.drawVLine(ctx, oy, oy - this.tick1Length, row[1]));
        this.tblXY(ctx, this.origin[0], this.scale[0], ctx.canvas.width, this.tick2)
            .forEach(row => Plotter.drawVLine(ctx, oy, oy - this.tick2Length, row[1]));
        this.tblXY(ctx, this.origin[1], this.scale[0], ctx.canvas.width, this.tick1)
            .forEach(row => Plotter.drawHLine(ctx, ox, ox + this.tick1Length, row[1]));
        this.tblXY(ctx, this.origin[1], this.scale[0], ctx.canvas.width, this.tick2)
            .forEach(row => Plotter.drawHLine(ctx, ox, ox + this.tick2Length, row[1]));
    }
    drawHText(ctx) {
        ctx.textAlign = "center";
        ctx.fillStyle = this.textColor;
        let oy = this.origin[1] - this.marginX;
        this.tblXY(ctx, this.origin[0], this.scale[0], ctx.canvas.width, this.tick2)
            .forEach(row => { if (0 != row[3])
            ctx.fillText('' + row[3], row[1], oy); });
    }
    drawVText(ctx, tick) {
        ctx.textAlign = "right";
        ctx.fillStyle = this.textColor;
        let stretch = this.scale[1] / this.scale[0];
        let ox = this.origin[0] + this.marginY;
        this.tblXY(ctx, this.origin[1], this.scale[0], ctx.canvas.width, tick)
            .forEach(row => { if (0 != row[3])
            ctx.fillText('' + row[3] / stretch, ox, row[1]); });
    }
    static $(row) {
        return '[' + `${row[0].toFixed(0).padStart(4, ' ')}`
            + '][|' + `${row[1].toFixed(2).padStart(7, ' ')}`
            + '|' + `${row[2].toFixed(2).padStart(7, ' ')}`
            + '|' + `${row[3].toFixed(2).padStart(7, ' ')}`
            + '|' + `${row[4].toFixed(2).padStart(7, ' ')}` + ']';
    }
    //canvas:[428,240]
    //origin:[104,186]
    //scale:[100,-200]
    toString() {
        let br = '\r\n';
        let a = '{Plotter'
            + '\r\norigin:[' + this.origin.toString()
            + ']\r\nscale:[' + this.scale + ']'
            + '\r\ntick:[' + this.tick1 + ',' + this.tick2 + ']';
        a += '\r\nstartPixel(tick1):[' + Plotter.startPixel(this.origin[0], this.scale[0], this.tick1)
            + ',' + Plotter.startPixel(this.origin[1], this.scale[1], this.tick1) + ']';
        a += '\r\nstartPixel(tick2):[' + Plotter.startPixel(this.origin[0], this.scale[0], this.tick2)
            + ',' + Plotter.startPixel(this.origin[1], this.scale[1], this.tick2) + ']';
        a += '}';
        return a;
    }
    static sample(xy, scale) {
        let plot = new Plotter(xy, scale); //([100,400],[10,-10]);
        plot.marginX = -20;
        plot.marginY = -20;
        plot.tick1 = 1;
        plot.tick2 = 10;
        return plot;
    }
}
//# sourceMappingURL=Plotter.js.map