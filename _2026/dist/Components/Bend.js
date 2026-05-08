"use strict";
//2026-04-14
//-1 straight line
// 0 vertical,horizontal
// 1 horizontal vertical
class Bend {
    static angleType(angle1, angle2) {
        let diff = Math.max(angle1, angle2) - Math.min(angle1, angle2);
        diff = diff % 12;
        if (3 == diff)
            return 90;
        if (9 == diff)
            return 90;
        return 180;
    }
    static vertical(angle) {
        if (12 == angle)
            return true;
        if (6 == angle)
            return true;
        if (0 == angle)
            return true;
        return false;
    }
    static forward(outpin, inpin) {
        let hour = outpin.hour; //called when both angles same
        hour %= 12;
        //let w=Wire.cout;
        //w.wl(`in and out hour=${hour}`);
        if (0 == hour || 12 == hour) //facing up
            if (inpin.xy[1] < outpin.xy[1])
                return false;
        if (6 == hour) //facing down
            if (outpin.xy[1] < inpin.xy[1])
                return false;
        if (3 == hour) //facing left
            if (inpin.xy[0] < outpin.xy[0])
                return false;
        if (9 == hour) //facing left
            if (outpin.xy[0] < inpin.xy[0])
                return false;
        return true;
    }
    static middle_xy(outpin, inpin) {
        let result = [0, 0];
        var atype = this.angleType(outpin.hour, inpin.hour);
        result = [inpin.dot[0], outpin.dot[1]];
        if (this.vertical(outpin.hour))
            result = [outpin.dot[0], inpin.dot[1]];
        return result;
    }
    static noBend(outpin, inpin) {
        let result = [];
        result.push(outpin.dot);
        result.push(this.middle_xy(outpin, inpin));
        result.push(inpin.dot);
        return result;
    }
    static _middle2(outpin, inpin, bend) {
        //let w=Wire.cout;
        //w.wl(`_middle2_ this.bend=${bend}`);
        var dx = inpin.dot[0] - outpin.dot[0];
        var dy = inpin.dot[1] - outpin.dot[1];
        //w.wl(`inpin=${inpin.dot} ,outpin=${XY.$(outpin.dot)}`);
        let result = [[0, 0], [0, 0]];
        result[0] = [outpin.dot[0] + dx * bend, outpin.dot[1]];
        result[1] = [outpin.dot[0] + dx * bend, inpin.dot[1]];
        let fwd = this.forward(outpin, inpin);
        //w.wl(`fwd=${fwd} ,outpin.hour=${outpin.hour}`);
        if (!fwd)
            if (3 == outpin.hour) {
                result[0] = [outpin.dot[0], outpin.dot[1] + dy * bend];
                result[1] = [inpin.dot[0], outpin.dot[1] + dy * bend];
                //w.wl(`dy=${dy} ,result[0]=${XY.$(result[0])}`);
                //w.wl(`dy=${dy} ,result[1]=${result[1]}`);
                return result;
            }
        if (!fwd)
            if (9 == outpin.hour) {
                result[0] = [outpin.dot[0], outpin.dot[1] + dy * bend];
                result[1] = [inpin.dot[0], outpin.dot[1] + dy * bend];
                return result;
            }
        if (fwd)
            if (6 == outpin.hour) {
                result[0] = [outpin.dot[0], outpin.dot[1] + dy * bend];
                result[1] = [inpin.dot[0], outpin.dot[1] + dy * bend];
                return result;
            }
        if (fwd)
            if (12 == outpin.hour) {
                result[0] = [outpin.dot[0], outpin.dot[1] + dy * bend];
                result[1] = [inpin.dot[0], outpin.dot[1] + dy * bend];
                return result;
            }
        return result;
    }
    static middle2(outpin, inpin, bend) {
        let result = [];
        result.push(outpin.dot);
        let m2 = this._middle2(outpin, inpin, bend);
        result.push(m2[0]);
        result.push(m2[1]);
        result.push(inpin.dot);
        return result;
    }
}
//# sourceMappingURL=Bend.js.map