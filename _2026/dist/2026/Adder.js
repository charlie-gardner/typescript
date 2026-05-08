"use strict";
//2026-03-06
if (typeof window !== "undefined") {
    window.addEventListener('load', (event) => {
        Adder.onload(event);
    });
}
class Adder {
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
        this.origin = [20, 660];
        this.scale = [1, -1];
        this.ctx.fillStyle = "blue";
        this.g = new Graphics(this.ctx, this.origin, this.scale);
        //Cout.create(this.ctx);
        this.list = [];
        let size = [52, 52];
        let size2 = [60, 60];
        let y1 = 500;
        let dy1 = 70;
        let y2 = y1 - 30;
        let y3 = y1 - 3 * dy1;
        let y4 = y3 - 100;
        let y5 = y4 - 100;
        let x1 = 600;
        let dx1 = 60;
        let buffer0 = new Switch([40, y1], size2, 3);
        let sign0 = new Sign([40, y1], 12, 40);
        sign0.text.push('Carry');
        let buffer1 = new Switch([40, y1 - dy1], size2, 3);
        let buffer2 = new Switch([40, y1 - 2 * dy1], size2, 3);
        let not0 = new Not([120, y2], size, 3);
        let not1 = new Not([120, y2 - dy1], size, 3);
        let not2 = new Not([120, y2 - 2 * dy1], size, 3);
        let wire1 = new Wire(buffer0.pin1, not0.pin2);
        wire1.bend = .5;
        let wire2 = new Wire(buffer1.pin1, not1.pin2);
        wire2.bend = .5;
        let wire3 = new Wire(buffer2.pin1, not2.pin2);
        wire3.bend = .5;
        let and0 = new And([x1, y3], size, 6, 4);
        let and1 = new And([x1 - dx1, y3], size, 6, 4);
        let and2 = new And([x1 - 2 * dx1, y3], size, 6, 4);
        let and3 = new And([x1 - 3 * dx1, y3], size, 6, 4);
        let and4 = new And([x1 - 4 * dx1, y3], size, 6);
        let and5 = new And([x1 - 5 * dx1, y3], size, 6);
        let and6 = new And([x1 - 6 * dx1, y3], size, 6);
        let or0 = new Or([510, y4], size, 6, 5);
        let or1 = new Or([300, y4], size, 6, 4);
        let led3 = new Led([550, y5], size2, 3);
        //buffer3.solid=true;
        let sign3 = new Sign([550, 10 + y5], 12, 30);
        sign3.text.push('Sum');
        let led4 = new Led([350, y5], size2, 3);
        //buffer4.solid=true;
        let sign4 = new Sign([350, 10 + y5], 12, 30);
        sign4.text.push('Carry');
        let wire5 = new Wire(buffer0.pin1, and0.pin2);
        let wire6 = new Wire(buffer1.pin1, and0.pin3);
        let wire7 = new Wire(buffer2.pin1, and0.pin4);
        let wire8 = new Wire(not0.pin1, and1.pin2);
        let wire9 = new Wire(not0.pin1, and2.pin2);
        let wire10 = new Wire(not1.pin1, and1.pin3);
        let wire11 = new Wire(not1.pin1, and3.pin3);
        let wire12 = new Wire(not2.pin1, and2.pin4);
        let wire13 = new Wire(not2.pin1, and3.pin4);
        let wire14 = new Wire(buffer0.pin1, and3.pin2);
        let wire15 = new Wire(buffer0.pin1, and5.pin2);
        let wire16 = new Wire(buffer0.pin1, and6.pin2);
        let wire17 = new Wire(buffer1.pin1, and2.pin3);
        let wire18 = new Wire(buffer1.pin1, and4.pin2);
        let wire19 = new Wire(buffer1.pin1, and6.pin3);
        let wire20 = new Wire(buffer2.pin1, and1.pin4);
        let wire21 = new Wire(buffer2.pin1, and4.pin3);
        let wire22 = new Wire(buffer2.pin1, and5.pin3);
        let wire23 = new Wire(and0.pin1, or0.pin2);
        let wire24 = new Wire(and1.pin1, or0.pin3);
        let wire25 = new Wire(and2.pin1, or0.pin4);
        let wire26 = new Wire(and3.pin1, or0.pin5);
        let wire27 = new Wire(and4.pin1, or1.pin2);
        let wire28 = new Wire(and5.pin1, or1.pin3);
        let wire29 = new Wire(and6.pin1, or1.pin4);
        wire23.bend = .5;
        wire24.bend = .25;
        wire25.bend = .25;
        wire26.bend = .5;
        wire27.bend = .5;
        wire28.bend = .5;
        wire29.bend = .5;
        let wire30 = new Wire(or0.pin1, led3.pin1);
        let wire31 = new Wire(or1.pin1, led4.pin1);
        this.list.push(buffer0);
        this.list.push(sign0);
        this.list.push(buffer1);
        this.list.push(buffer2);
        this.list.push(sign3);
        this.list.push(sign4);
        this.list.push(not0);
        this.list.push(not1);
        this.list.push(not2);
        this.list.push(wire1);
        this.list.push(wire2);
        this.list.push(wire3);
        this.list.push(and0);
        this.list.push(and1);
        this.list.push(and2);
        this.list.push(and3);
        this.list.push(and4);
        this.list.push(and5);
        this.list.push(and6);
        this.list.push(or0);
        this.list.push(or1);
        this.list.push(sign3);
        this.list.push(sign4);
        this.list.push(wire5);
        this.list.push(wire6);
        this.list.push(wire7);
        this.list.push(wire8);
        this.list.push(wire9);
        this.list.push(wire10);
        this.list.push(wire11);
        this.list.push(wire12);
        this.list.push(wire13);
        this.list.push(wire14);
        this.list.push(wire15);
        this.list.push(wire16);
        this.list.push(wire17);
        this.list.push(wire18);
        this.list.push(wire19);
        this.list.push(wire20);
        this.list.push(wire21);
        this.list.push(wire22);
        this.list.push(or0);
        this.list.push(or1);
        this.list.push(wire23);
        this.list.push(wire24);
        this.list.push(wire25);
        this.list.push(wire26);
        this.list.push(wire27);
        this.list.push(wire28);
        this.list.push(wire29);
        this.list.push(wire30);
        this.list.push(wire31);
        this.list.push(led3);
        this.list.push(led4);
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
        this.list.forEach(item => item.update(this.g, e));
        this.update();
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
    static update() {
        //W.clear(this.idConsole);
        this.sample1();
    }
    static paint(e) {
        //Cout.cout.clear();
        this.background(e);
        this.draw(e);
        //Cout.cout.fill([100,100]);
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
        //this.ctx.fillText(`Adder drawSample1() movecount=[${this.movecount}]`,300,40);
        this.ctx.fillText(`2 bit Adder`, 300, 40);
        let _xy = this.g.window(e, 48, this.Show);
        //let w=Cout.cout;
        this.list.forEach(item => item.draw(this.g));
    }
    static sample1() {
        //let w=new W("_1");
        //w.wl(`Adder.sample1() count=[${this.count}]`
        //+` , movecount=[${this.movecount}]`);
    }
}
Adder.DisableGrid = true;
Adder.ShowGrid = false;
Adder.drawingFont = '24px Consolas, monospace';
Adder.consoleFont = 'bold 16px Consolas, monospace';
Adder.count = 0;
Adder.movecount = 0;
Adder.idSender = 'canvas1';
Adder.idConsole = '_1';
Adder.origin = [0, 0];
Adder.scale = [1, 1];
//# sourceMappingURL=Adder.js.map