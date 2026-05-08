"use strict";
//2026-03-06
if (typeof window !== "undefined") {
    window.addEventListener('load', (event) => {
        Rs.onload(event);
    });
}
class Rs {
    static onload(event) {
        this.init(event);
        this.update();
        this.paint(event);
    }
    static get Show() {
        if (this.DisableGrid)
            return false;
        return this.ShowGrid;
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
        this.ctx = ctx;
        this.origin = [140, 500];
        this.scale = [1, -1];
        this.ctx.fillStyle = "blue";
        this.g = new Graphics(this.ctx, this.origin, this.scale);
        //Cout.create(this.ctx);
        //Cout.cout.disable;
        let size = [40, 60];
        let size2 = [60, 60];
        let switch1 = new Switch([0, 200], size2, 3);
        let sign1 = new Sign([0, 170], 6);
        sign1.text.push('Data');
        let switch2 = new Switch([140, 60], size2, 0);
        let sign2 = new Sign([110, 60], 6);
        sign2.text.push('Latch');
        let not1 = new Not([100, 240], size);
        let wire1 = new Wire(switch1.pin1, not1.pin2, 1);
        let and1 = new And([160, 184], size, 3);
        let wire2 = new Wire(switch1.pin1, and1.pin2);
        let wire3 = new Wire(switch2.pin1, and1.pin3);
        let and2 = new And([160, 320], size, 3);
        let wire4 = new Wire(not1.pin1, and2.pin2);
        let wire5 = new Wire(switch2.pin1, and2.pin3);
        let nor1 = new Nor([260, 304], size, 3);
        let wire6 = new Wire(and2.pin1, nor1.pin2);
        let nor2 = new Nor([268, 200], size, 3);
        let wire7 = new Wire(and1.pin1, nor2.pin3);
        let wire8 = new Wire(nor1.pin1, nor2.pin2, 0);
        wire8.bend = .48;
        let wire9 = new SafeWire(nor2.pin1, nor1.pin3);
        wire9.bend = .48;
        let led1 = new Led([360, 304], size2, 3);
        let wire10 = new Wire(nor1.pin1, led1.pin1);
        let led2 = new Led([360, 200], size2, 3);
        let wire11 = new Wire(nor2.pin1, led2.pin1);
        this.list = [];
        this.list.push(switch1);
        this.list.push(sign1);
        this.list.push(switch2);
        this.list.push(sign2);
        this.list.push(not1);
        this.list.push(wire1);
        this.list.push(and1);
        this.list.push(wire2);
        this.list.push(wire3);
        this.list.push(and2);
        this.list.push(wire4);
        this.list.push(wire5);
        this.list.push(nor1);
        this.list.push(wire6);
        this.list.push(nor2);
        this.list.push(wire7);
        //this.list.push(wire8);
        this.list.push(wire9);
        this.list.push(led1);
        this.list.push(wire10);
        this.list.push(led2);
        this.list.push(wire11);
        this.list.push(wire8);
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
        //Cout.cout.clear();
        this.list.forEach(item => item.update(this.g, e));
        this.paint(e);
        this.update();
    }
    static doubleclick(e) {
        this.ShowGrid = !this.ShowGrid;
        this.paint(e);
    }
    static mousemove(e) {
        //Cout.cout.clear();
        ++this.movecount;
        this.paint(e);
    }
    static update() {
        this.sample1();
    }
    static paint(e) {
        this.background(e);
        this.draw(e);
        //Cout.cout.fill([20,20]);
    }
    static plot1(xy, scale) {
        let plot = new Plotter(xy, scale); //([100,400],[10,-10]);
        plot.marginX = -20;
        plot.marginY = 20;
        plot.tick1 = 10;
        plot.tick2 = 100;
        return plot;
    }
    static background(e) {
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
    static drawSample1(e) {
        Ctx.fillText(this.ctx, `RS Latch`, [140, 40], 'midnightblue');
        Ctx.fillText(this.ctx, `stores bit when latch closed`, [140, 60], 'midnightblue');
        let _xy = this.g.window(e, 0, this.Show);
        let size = [20, 40];
        this.list.forEach(item => item.draw(this.g));
    }
    static sample1() {
        //let w=W.cout;
        //w.wl(`Rs.sample1() count=[${this.count}]`
        //+` , movecount=[${this.movecount}]`);
    }
}
Rs.DisableGrid = true;
Rs.ShowGrid = true;
Rs.drawingFont = '24px Consolas, monospace';
Rs.consoleFont = 'bold 16px Consolas, monospace';
Rs.count = 0;
Rs.movecount = 0;
Rs.idSender = 'canvas1';
Rs.idConsole = '_1';
Rs.origin = [0, 0];
Rs.scale = [1, 1];
//# sourceMappingURL=Rs.js.map