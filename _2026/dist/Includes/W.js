"use strict";
//2026-02-27
// Careful with this lots of times i delete second <section> tag
// Cout is much safer since it doesnt go to <section>
// But keep it for formatting like <b></b>
class W {
    constructor(id = '_1') {
        this.id = id;
        this.el = document.getElementById(id);
        this.font = '24px Consolas, monospace';
        this.color = 'midnightblue';
    }
    static clear(id = 'console') {
        let element = document.getElementById(id);
        if (!this.ok(element))
            return;
        element.innerHTML = "";
    }
    clear() {
        this.el.innerHTML = '';
    }
    w(value = '') {
        this.el.innerHTML += value.toString();
    }
    wl(value = '') {
        this.w(value + W.br);
    }
    static w(id, value = '') {
        let element = document.getElementById(id);
        if (!W.ok(element))
            return;
        element.innerHTML = element.innerHTML + value.toString();
    }
    static wl(id, value = '') {
        W.w(id, value + this.br);
    }
    static ok(value) {
        if (value === undefined)
            return false;
        if (value == null)
            return false;
        return true;
    }
    get color() { return this.el.style.color; }
    set color(value) { this.el.style.color = value; }
    get font() { return this.el.style.font; }
    set font(value) { this.el.style.font = value; }
}
W.br = '<br/>';
//# sourceMappingURL=W.js.map