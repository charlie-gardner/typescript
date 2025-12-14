"use strict";
//2025-12-12
//
if (typeof window !== "undefined") {
    window.addEventListener('load', (event) => {
        Demo3way.onload(event);
    });
}
class Demo3way {
    static onload(event) {
        let elem = document.querySelector('#' + this.idSender);
        this.addEventListeners(elem);
        if (elem instanceof HTMLCanvasElement)
            this.ctx = elem.getContext('2d');
        this.init(event);
        this.initList(event);
        this.update();
        this.paint(event);
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
    }
    static init(event) {
        if (null == this.ctx)
            return;
        let ctx = this.ctx;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
        Wire.color = 'lightgray';
        InPin.color = 'lightgray';
        this.origin = [50, this.ctx.canvas.height - 80];
        this.scale = [1, -1];
        this.g = new Graphics(this.ctx, this.origin, this.scale);
        this.g.fontSize = 24;
        Sign.fontSize = 18;
    }
    static initList(event) {
        let l1 = new L([24, 52]);
        let l0 = new L([8, 60]);
        this.List = [];
        this.ActiveList = [];
        let button1 = new PushButton([200, 0], 12);
        let sign1 = new Sign([210, 10], [60, 30], 3);
        sign1.lefty = false;
        sign1.textbox.push('Power');
        let lev1 = new Leviton(this.g, 1, [100, 0], 1, 2);
        this.lev1 = lev1;
        let lev2 = new Leviton(this.g, 2, [100, 200], 2, 1);
        let led1 = new Led([200, 400], 3);
        let wire1 = new Wire(button1.outpin, lev1.inpins[0]);
        let wire2 = new Wire(lev1.outpin, lev2.inpins[0]);
        let wire3 = new Wire(lev1.outpin2, lev2.inpins[1]);
        let wire4 = new Wire(lev2.outpin, led1.inpins[0]);
        this.ActiveList.push(button1);
        this.ActiveList.push(lev1);
        this.ActiveList.push(lev2);
        this.List.push(button1);
        this.List.push(sign1);
        this.List.push(lev1);
        this.List.push(wire1);
        this.List.push(lev2);
        this.List.push(wire2);
        this.List.push(wire3);
        this.List.push(led1);
        this.List.push(wire4);
    }
    static clicked(event) {
        ++this.count;
        let xy0 = XY.xy(event);
        let xy = XY.div(xy0, this.origin, this.scale);
        this.ActiveList.forEach(item => item.onClick(xy));
        this.update();
        this.paint(event);
    }
    static mousemove(event) {
        let xy0 = XY.xy(event);
        let xy = XY.div(xy0, this.origin, this.scale);
        this.ActiveList.forEach(item => item.onMove(xy));
        this.paint(event);
    }
    static update() {
        A.clear(this.idConsole);
        this.sample1();
    }
    static paint(event) {
        this.background(event);
        this.draw(event);
    }
    static background(event) {
        if (null == this.ctx)
            return;
        let origin = this.origin;
        let scale = this.scale;
        let ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let plot = this.plot1(origin, scale);
        //plot.draw(ctx);
        let xy0 = XY.xy(event);
        let xy = XY.div(xy0, origin, scale);
        Graphics.drawCrosshair(ctx, xy0);
        this.g.fillText(XY.format(xy, 4, 0), this.g.o(100, -60));
    }
    static plot1(xy, scale) {
        let plot = new Plotter(xy, scale); //([100,400],[10,-10]);
        plot.marginX = -20;
        plot.marginY = -20;
        plot.tick1 = 10;
        plot.tick2 = 100;
        return plot;
    }
    static sample1() {
        //let $=new A(this.idConsole);
        //$.wl(`Demo3way clicks:[${this.count}]`);
    }
    static draw(event) {
        this.List.forEach(item => item.draw(this.g));
        let xy0 = XY.xy(event);
        let xy = XY.div(xy0, this.origin, this.scale);
        this.g.fillText(`3 Way Switch`, this.g.o(80, 420));
    }
}
Demo3way.origin = [0, 0];
Demo3way.scale = [0, 0];
Demo3way.idSender = 'canvas1';
Demo3way.idConsole = '_1';
Demo3way.count = 0;
//# sourceMappingURL=Demo3way.js.map