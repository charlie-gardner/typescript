"use strict";
//2025-01-14
class NandGate extends AndGate {
    get name() { return 'Nand'; }
    get hot() {
        return !super.hot;
    }
    get xys() { return GateData.nand(this.wh); }
}
// ///////////////////////////////////////
class NotGate extends AndGate {
    constructor(xy, hour = 0) {
        super(xy, hour, 1, 1);
    }
    get name() { return 'Not'; }
    get inpin() { return this.inpins[0]; }
    get hot() {
        if (this.inpins.length < 1)
            return false;
        if (this.inpins[0].hot)
            return false;
        return true;
    }
    get xys() { return GateData.not(this.wh); }
}
// //////////////////////////////////////
class OrGate extends AndGate {
    get name() { return 'Or'; }
    get hot() {
        let rc = false;
        this.inpins.forEach(item => { if (item.hot)
            rc = true; });
        return rc;
    }
    get xys() { return GateData.or(this.wh); }
}
class NorGate extends OrGate {
    get name() { return 'Nor'; }
    get hot() { return !super.hot; }
    get xys() { return GateData.nor(this.wh); }
}
// /////////////////////////////////////////////
class Buffer extends AndGate {
    get name() { return 'Buffer'; }
    constructor(xy, hour = 0, inpincount = 1, outpincount = 1) {
        super(xy, hour, inpincount, 0);
        this._hover = false;
        this._hot = false;
        this._g = null;
        this._outpincount = outpincount;
    }
    get outpincount() { return this._outpincount; }
    get inpin() { return this.inpins[0]; }
    set graphics(g) { this._g = g; }
    get hot() {
        if (this.inpins.length < 1)
            return this._hot;
        return this.inpin.hot;
    }
    toggle() {
        this._hot = !this._hot;
    }
    get lineWidth() {
        if (this._hover)
            return 4;
        return 1;
    }
    /*
    onpointermove(e:MouseEvent,id:string):void{
    let xy:[number,number] =XY.xy(e);
    if(null==this._g)return;
    let xw=XY.world(xy,this._g.origin,this._g.scale);
    let rc:boolean=this.contains(xw);
    this._hover =rc;}
    
    onpointerdown(e:MouseEvent,id:string):void{
    if (this._hover) this.toggle();}
    */
    onMove(xy) {
        let rc = this.contains(xy);
        this._hover = rc;
    }
    onClick(xy) {
        if (this._hover)
            this.toggle();
    }
    get xys() { return this.l_.box; }
}
// //////////////////////////////////
class PushButton extends AndGate {
    constructor(xy, hour) {
        super(xy, hour, 0, 0);
        this._hover = false;
        this._hot = false;
        //this.solid=true;
    }
    get strokeStyleHot() { return 'purple'; }
    get strokeStyle() { return 'lightgray'; }
    get fillStyleHot() { return 'red'; }
    get fillStyle() { return 'white'; }
    get fillStyleBox() { return 'lightblue'; }
    get strokeStyleBox() { return 'black'; }
    get lineWidthBox() { return 1; }
    get lineWidth() {
        if (this._hover)
            return 2;
        return 1;
    }
    get l_() { return new L([8, 20]); }
    get name() { return 'PushButton'; }
    get hot() { return this._hot; }
    toggle() {
        this._hot = !this._hot;
    }
    onMove(xy) {
        let rc = this.contains(xy);
        this._hover = rc;
    }
    onClick(xy) {
        if (this._hover)
            this.toggle();
    } //}
    get drawbox() { return true; }
    get xys() { return this.l_.led; }
    toString() {
        let a = '';
        a += '{' + this.name + ' ' + XY.format(this.xy)
            + '\r\nhour=' + this.hour
            + '\r\nhead=' + XY.round(this.head)
            + '\r\n_hover=' + this._hover
            + '\r\nhot=' + this.hot;
        return a + '';
    }
}
// //////////////////////////////////
class Led extends AndGate {
    constructor(xy, hour = 0, inpincount = 1, outpincount = 0) {
        super(xy, hour, inpincount, 0);
        //this.solid=true;
    }
    get l_() { return new L([8, 16]); }
    get name() { return 'Led'; }
    get inpin() { return this.inpins[0]; }
    get outpincount() { return 0; }
    get hot() { return this.inpin.hot; }
    get strokeStyleHot() { return 'hotpink'; }
    get strokeStyle() { return 'darkgray'; }
    get fillStyleHot() { return 'yellow'; }
    get fillStyle() { return 'gray'; }
    get lineWidth() { return 4; }
    get xys() { return this.l_.led; }
}
//# sourceMappingURL=Nand.js.map