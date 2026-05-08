"use strict";
//2026-04-15
// //////////////////////////////////////
class Nand extends Chip {
    constructor(xy = [0, 0], size = [1, 1], hour = 12, pins = 3) {
        super();
        this.hot = false;
        this.xy = xy;
        this.size = size;
        this.hour = hour;
        this.pins = pins;
        //this.mask=GateData.nand(size);
        let try_ = [0, 0]; //dummy
        let mask = this.mask;
        let pinScale = [1, 1];
        //this.pinXYs=this.getPinXYs;
        //let pinXYs_:[number,number][]=this.pinXYs;
        mask.push(this.xy1_);
        mask.push(this.xy2_);
        mask.push(this.xy3_);
        mask.push(this.xy4_);
        mask.push(this.xy5_);
        let xys = Ctx.center(mask, this.xy, [1, 1], this.hour);
        try_ = mask.pop();
        try_ = mask.pop();
        try_ = mask.pop();
        try_ = mask.pop();
        try_ = mask.pop();
        this.xy5 = Tricks.pop(xys);
        this.xy4 = Tricks.pop(xys);
        this.xy3 = Tricks.pop(xys);
        this.xy2 = Tricks.pop(xys);
        this.xy1 = Tricks.pop(xys);
        //let w=Cout.cout;
        this.pin5 = this.addInPin({
            xy: this.xy5, scale: pinScale, hour: this.hour + 6
        });
        this.pin4 = this.addInPin({
            xy: this.xy4, scale: pinScale, hour: this.hour + 6
        });
        this.pin3 = this.addInPin({
            xy: this.xy3, scale: pinScale, hour: this.hour + 6
        });
        this.pin2 = this.addInPin({
            xy: this.xy2, scale: pinScale, hour: this.hour + 6
        });
        this.pin1 = this.addOutPin({
            xy: this.xy1, scale: pinScale, hour: this.hour + 12
        });
    }
    get xy1_() { return [this.size[0] / 2, this.size[1]]; }
    get xy2_() { return [Nand.slices(this.size[0], this.pins - 1)[0], 0]; }
    get xy3_() { return [Nand.slices(this.size[0], this.pins - 1)[1], 0]; }
    get xy4_() { return [Nand.slices(this.size[0], this.pins - 1)[2], 0]; }
    get xy5_() { return [Nand.slices(this.size[0], this.pins - 1)[3], 0]; }
    get class() { return `Nand`; }
    update(g, e) {
        this.refresh();
    }
    get pinFixX() { return .50; }
    get pinFixY() { return 4; }
    get plant() { return this.size[1] / 40; }
    get mask() { return GateData.nand(this.size); }
    refresh() {
        this.hot = false;
        if (true == this.pin2.hot)
            if (true == this.pin3.hot)
                this.hot = true;
        if (3 < this.pins)
            if (!this.pin4.hot)
                this.hot = false;
        this.hot = !this.hot; //!and.refresh()
        this.enablePin(this.pin1, this.hot);
    }
    draw(g) {
        this.refresh();
        let lineWidth0 = 3;
        let strokeColor = 'blue';
        if (this.hot)
            strokeColor = 'red';
        let xys2 = g.centerDrawAt(this.mask, this.xy, [1, 1], this.hour, strokeColor, 'transparent', lineWidth0);
        this.pin1.draw(g);
        this.pin2.draw(g);
        if (this.pins < 3)
            return;
        this.pin3.draw(g);
        if (this.pins < 4)
            return;
        this.pin4.draw(g);
        if (this.pins < 5)
            return;
        this.pin5.draw(g);
    }
    static slices(width, pins) {
        let ans = [];
        let f = .8;
        let w = f * width / 2; //outside pins always just inside edge
        let fw = width / 2;
        if (1 == pins) {
            ans.push(fw);
            return ans;
        }
        if (2 == pins) {
            ans.push(fw - w);
            ans.push(fw + w);
            return ans;
        }
        if (3 == pins) {
            ans.push(fw - w);
            ans.push(fw + 0);
            ans.push(fw + w);
            return ans;
        }
        let d = w / 3; //even spread between pins
        if (4 == pins) {
            ans.push(fw - w);
            ans.push(fw - d);
            ans.push(fw + d);
            ans.push(fw + w);
            return ans;
        }
        return ans;
    }
    toString() {
        let a = `{${this.class}[${this.xy}] ,size:[${this.size}] ,hour:[${this.hour}]`;
        a += `\r\npins=${this.pins}`;
        //a+=`\r\nxy1:${XY.shiftMiddle(this.xy,this.size)} ,xyPin1:${XY.$(this.xy1)}`;
        //let xys=Ctx.center(this.mask,this.xy,[1,1],this.hour);
        //ca+='\r\n'+XY.$_(this.pinXYs);
        a += `\r\n${this.pin1}`;
        if (this.pins < 2)
            return a + '}';
        a += `\r\n${this.pin2}`;
        if (this.pins < 3)
            return a + '}';
        a += `\r\n${this.pin3}`;
        if (this.pins < 4)
            return a + '}';
        a += `\r\n${this.pin4}`;
        if (this.pins < 5)
            return a + '}';
        a += `\r\n${this.pin5}`;
        return a;
    }
}
// //////////////////////
class And extends Nand {
    constructor(xy = [0, 0], size = [1, 1], hour = 12, pins = 3) {
        super(xy, size, hour, pins);
    }
    get class() { return `And`; }
    refresh() {
        this.hot = false;
        if (true == this.pin2.hot)
            if (true == this.pin3.hot)
                this.hot = true;
        if (3 < this.pins)
            if (!this.pin4.hot)
                this.hot = false;
        this.enablePin(this.pin1, this.hot);
    }
    get pincount() { return 2; }
    get mask() { return GateData.and(this.size); }
}
// ///////////////////////
class Nor extends Nand {
    constructor(xy = [0, 0], size = [1, 1], hour = 12) {
        super(xy, size, hour);
        let y = this.size[1] / 10;
        this.pin2.growIn = y;
        this.pin3.growIn = y;
        this.pin4.growIn = y;
        this.pin5.growIn = y;
    }
    get class() { return `Nor`; }
    refresh() {
        this.hot = true;
        if (true == this.pin2.hot
            || true == this.pin3.hot)
            this.hot = false;
        this.enablePin(this.pin1, this.hot);
        //if(200==this.xy[1])
        //Cout.cout.wl(`Nor ${this.xy} ,hot= ${this.hot}`);
    }
    get mask() { return GateData.nor(this.size); }
}
// ////////////////////
class Or extends Nand {
    constructor(xy = [0, 0], size = [1, 1], hour = 12, pins = 3) {
        super(xy, size, hour, pins);
        let y = this.size[1] / 10;
        this.pin2.growIn = y;
        this.pin3.growIn = y;
        this.pin4.growIn = y;
        this.pin5.growIn = y;
    }
    get class() { return `Or`; }
    refresh() {
        this.hot = false;
        if (true == this.pin2.hot
            || true == this.pin3.hot
            || true == this.pin4.hot
            || true == this.pin5.hot)
            this.hot = true;
        this.enablePin(this.pin1, this.hot);
    }
    get mask() { return GateData.or(this.size); }
}
// //////////////////////
class Not extends Nand {
    constructor(xy = [0, 0], size = [1, 1], hour = 12) {
        super(xy, size, hour, 2);
        this.pin2.xy = this.xy2;
    }
    get class() { return `Not`; }
    refresh() {
        this.enablePin(this.pin1, !this.pin2.hot);
        this.hot = !this.pin2.hot;
    }
    get pincount() { return 2; }
    get mask() { return GateData.not(this.size); }
}
//# sourceMappingURL=Nand.js.map