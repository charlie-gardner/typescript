"use strict";
//2026-03-06
if (typeof window !== "undefined") {
    window.addEventListener('load', (event) => {
        Leviton02.onload(event);
    });
}
class Leviton02 {
    static get Show() {
        if (this.DisableGrid)
            return false;
        return this.ShowGrid;
    }
    static onload(event) {
        this.init(event);
        this.update(event);
        this.paint(event);
    }
    static init(event) {
        let elem = document.querySelector('#' + this.idSender);
        this.addEventListeners(elem);
        let ctx = null;
        if (elem instanceof HTMLCanvasElement)
            ctx = elem.getContext('2d');
        if (null == ctx) {
            alert(`Error!!! Change tag to this: [<section> <canvas id='${this.idSender}']>`);
            return;
        }
        //Cout.create(this.ctx);
        this.ctx = ctx;
        //Cout.create(this.ctx);
        this.origin = [240, 680];
        let y = 80;
        this.scale = [1.5, -1.5];
        this.ctx.fillStyle = "blue";
        let size2 = [60, 60];
        this.g = new Graphics(this.ctx, this.origin, this.scale);
        this.switch1 = new Switch([160, y - 40], size2, 12);
        this.switch1.hot = true;
        this.levA = new LevitonA(this.pic1, this.pic2, [0, y]);
        this.wire1 = new Wire(this.switch1.pin1, this.levA.pin1, 1);
        this.levB = new LevitonB(this.pic1, this.pic2, [0, y + 160]);
        this.wire2 = new Wire(this.levA.pin2, this.levB.pin2, 0);
        this.wire3 = new Wire(this.levA.pin3, this.levB.pin3, 0);
        this.led1 = new Led([130, y + 217], size2, 3);
        this.wire4 = new Wire(this.levB.pin1, this.led1.pin1);
        this.levA.refresh();
        this.levB.refresh();
    }
    static addEventListeners(elem) {
        if (null == elem)
            return;
        elem.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clicked(e);
        });
        elem.addEventListener('mousemove', (e) => {
            e.stopPropagation();
            this.mousemove(e);
        });
        elem.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.doubleclick(e);
        });
    }
    static clicked(e) {
        ++this.count;
        this.switch1.update(this.g, e);
        this.levA.update(this.g, e);
        this.levB.update(this.g, e);
        this.update(e);
        this.paint(e);
    }
    static doubleclick(e) {
        this.ShowGrid = !this.ShowGrid;
        this.paint(e);
    }
    static mousemove(e) {
        ++this.movecount;
        this.paint(e);
    }
    static update(e) {
        this.paint(e);
        this.sample0();
    }
    static paint(e) {
        //Cout.cout.clear();
        this.background(e);
        this.draw(e);
        //Cout.cout.fill([20,20]);
    }
    static plot1(xy, scale) {
        let plot = new Plotter(xy, scale); //([100,400],[10,-10]);
        plot.marginX = -20;
        plot.marginY = -20;
        plot.tick1 = 10;
        plot.tick2 = 100;
        return plot;
    }
    static background(event) {
        if (null == this.ctx)
            return;
        this.ctx.font = this.drawingFont;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let plot = this.plot1(this.origin, this.scale);
        if (this.Show)
            plot.draw(this.ctx);
    }
    static draw(e) {
        if (null == this.ctx)
            return;
        this.drawSample1(e);
    }
    static updateSample1(e) { }
    static drawSample1(e) {
        Ctx.fillText(this.ctx, `Leviton 3way Switch`, [190, 40]);
        let _xy = this.g.window(e, 60, this.Show);
        this.switch1.draw(this.g);
        this.levA.draw(this.g);
        this.wire1.draw(this.g);
        this.levB.draw(this.g);
        this.wire2.draw(this.g);
        this.wire3.draw(this.g);
        this.led1.draw(this.g);
        this.wire4.draw(this.g);
        this.g.drawTag('Breaker Switch', [130, 70], 8, 40, this.switch1.fillStyle);
    }
    static sample0() { }
}
Leviton02.DisableGrid = true;
Leviton02.ShowGrid = false;
Leviton02.pic1 = '../Images/03.leviton1.png';
Leviton02.pic2 = '../Images/03.leviton2.png';
Leviton02.drawingFont = '24px Consolas, monospace';
Leviton02.consoleFont = 'bold 16px Consolas, monospace';
Leviton02.count = 0;
Leviton02.movecount = 0;
Leviton02.idSender = 'canvas1';
Leviton02.idConsole = '_1';
//# sourceMappingURL=Leviton02.js.map