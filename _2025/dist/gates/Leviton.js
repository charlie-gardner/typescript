"use strict";
//2024-11-26
class Leviton extends AndGate {
    get pindata0() { return Leviton._pindata0; }
    get pindata1() { return Leviton._pindata1; }
    get pindata2() { return Leviton._pindata2; }
    get topPad() { return Leviton._topPad; }
    get bottomPad() { return Leviton._bottomPad; }
    constructor(g, mode, xy, inpincount = 1, outpincount = 2) {
        super(xy, 0, inpincount, 0);
        this._mode = mode;
        this._outpincount = outpincount;
        this._g = g;
        this._hoverUp = false;
        this._hoverDown = false;
        this._imgdown = new Image();
        this._imgdown.src = '03.leviton1.png';
        this._imgup = new Image();
        this._imgup.src = '03.leviton2.png';
        this.outpin2 = new OutPin(this, this.l_);
        this.outpin.mode = mode;
        this.outpin.index = 0;
        this.outpin2.mode = mode;
        this.outpin2.index = 1;
        this._switchUp = true;
        this._hot = false;
        this.inpins.forEach(item => item.mode = mode);
        if (1 == mode) {
            this.inpins.forEach(item => item.pindata = this.pindata0);
            this.outpin.pindata = this.pindata1;
            this.outpin2.pindata = this.pindata2;
        }
        if (2 == mode) {
            this.inpins[0].pindata = this.pindata1;
            this.inpins[1].pindata = this.pindata2;
            this.outpin.pindata = this.pindata0;
        }
    }
    //set graphics(g:Graphics){this._g=g;}
    get l_() { return new L([32, 154]); }
    get name() { return 'Leviton'; }
    get outpincount() { return this._outpincount; }
    onMove(xw) {
        let padtop = Tricks.rectangle(this.xy, this.topPad);
        this._hoverUp = XY.rectangleContainsXY(padtop, xw);
        let padbot = Tricks.rectangle(this.xy, this.bottomPad);
        this._hoverDown = XY.rectangleContainsXY(padbot, xw);
    }
    //onpointerdown(e:MouseEvent,id:string):void{
    //if (this._hoverUp) this._switchUp=true;
    //if (this._hoverDown) this._switchUp=false;}
    onClick(xy) {
        if (this._hoverUp)
            this._switchUp = true;
        if (this._hoverDown)
            this._switchUp = false;
    }
    get_hot(index) {
        this._hot = false;
        if (1 == this._mode) {
            if (!this.inpins[0].hot)
                return this._hot = false;
            if (this._switchUp)
                if (0 == index)
                    return this._hot = true;
            if (!this._switchUp)
                if (1 == index)
                    return this._hot = true;
        }
        return this._hot = false;
    }
    get hot() {
        this._hot = false;
        if (2 == this._mode) {
            if (this._switchUp)
                if (this.inpins[0].hot)
                    return this._hot = true;
            if (!this._switchUp)
                if (this.inpins[1].hot)
                    return this._hot = true;
        }
        return this._hot;
    }
    toString() {
        let a = '';
        a += '{' + this.name + '[' + this.xy + ']'
            + '\r\nswitchUp=' + this._switchUp
            + '\r\nhot=' + this.hot
            + '\r\ninpincount=' + this.inpincount
            //this.inpins.forEach(value=>a+=value.toString());
            + '\r\noutpincount=' + this.outpincount;
        a += '\r\noutpin=' + this.outpin.toString();
        if (1 < this.outpincount)
            a += '\r\noutpin2=' + this.outpin2.toString();
        //+'\r\nhour='+this.hour
        //+'\r\nhead='+Tricks.round(this.head)
        //+'\r\nhot='+this.hot;
        return a + '';
    }
    draw(g) {
        let xy = XY.mul(this.xy, g.origin, g.scale);
        //if(this.drawbox)g.drawAt(AndGate.rotate(this.l_.box,this.hour),this.xy);
        if (this._switchUp)
            g.drawImage(this._imgup, xy[0] - this.l_.w, xy[1] - this.l_.h, this.l_.w * 2, this.l_.h);
        else
            g.drawImage(this._imgdown, xy[0] - this.l_.w, xy[1] - this.l_.h, this.l_.w * 2, this.l_.h);
        if (this.drawbox) {
            g.drawRectangle(Tricks.rectangle(this.xy, this.bottomPad));
            g.drawRectangle(Tricks.rectangle(this.xy, this.topPad));
        }
        this.inpins.forEach(item => item.draw(g));
        this.outpin.draw(g);
        if (1 < this.outpincount)
            this.outpin2.draw(g);
        g.resetCtx();
    }
}
Leviton._pindata0 = [[28, 55], [50, 1]];
Leviton._pindata1 = [[28, 86], [20, 1]];
Leviton._pindata2 = [[-40, 58], [12, 1]];
Leviton._topPad = [[-14, 74], [32, 32]];
Leviton._bottomPad = [[-14, 34], [32, 32]];
//# sourceMappingURL=Leviton.js.map