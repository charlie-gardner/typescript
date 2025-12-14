"use strict";
//2025-04-06 changed format and _
//2025-03-25 if \n add <br/>
//if object putting in <br/> remove it
//2024-12-29 Always Need These
// A.round_ becomes A.round
// A.round becomes Tricks.round
// now you have 2 round methods
class A {
    constructor(id = 'console') {
        this._id = id;
    }
    static set br(value) {
        if (value)
            A._br = '<br/>';
        if (!value)
            A._br = '';
    }
    static getElement(id) {
        return document.getElementById(id);
    }
    static get2D(id) {
        let canvas = A.getElement(id);
        let g = canvas.getContext("2d");
        return g;
    }
    static clear(id = 'console') {
        let element = document.getElementById(id);
        if (!A.ok(element))
            return;
        element.innerHTML = "";
    }
    clear() {
        let element = document.getElementById(this._id);
        if (!A.ok(element))
            return;
        element.innerHTML = "";
    }
    static write(id, value = '') {
        let element = document.getElementById(id);
        if (!A.ok(element))
            return;
        element.innerHTML = element.innerHTML + value.toString();
    }
    write(value = '') {
        A.write(this._id, value);
    }
    static _$(id, spaces, value = '') {
        if (undefined === value)
            value = "";
        let result = '';
        let nbsp_ = '&nbsp;'.repeat(spaces);
        let lines_ = '' + value;
        let lines = lines_.split('\r\n');
        let lastChar = ' ';
        lines.forEach(line => result += nbsp_ + line + '<br/>'); //'\r\n' wrecks style="white-space: pre;" 
        A.write(id, result);
    }
    _$(spaces, value = '') {
        A._$(this._id, spaces, value);
    }
    static writeline(id, value = '') {
        if (undefined === value)
            value = "";
        let result = '';
        let lines_ = '' + value;
        let lines = lines_.split('\r\n');
        let lastChar = ' ';
        lines.forEach(line => result += line + '<br/>'); //'\r\n' wrecks style="white-space: pre;" 
        A.write(id, result);
    }
    writeline(id, value = '') {
        A.writeline(id, value);
    }
    static wl //short for writleline(id)
    (id, value = '') {
        A.writeline(id, value);
    }
    wl //short for writleline(id)
    (value = '') {
        A.writeline(this._id, value);
    }
    w //short for write(id)
    (value = '') {
        A.write(this._id, value);
    }
    static format(value, width = 0, decimals = 0, fillchar = "\u00A0") {
        return `${value.toFixed(decimals).padStart(width, fillchar)}`;
    }
    static $(value, width = 0, decimals = 0, fillchar = "\u00A0") {
        if (!this.ok(value))
            return '';
        return value.toFixed(decimals).padStart(width, fillchar);
    }
    static $$(item, width = 0, decimals = 3, fillchar = "\u00A0") {
        let result = '';
        let sep = '\u00A0';
        item.forEach(value => {
            result += sep + this.format(value, width, decimals, fillchar) + '<br/>';
            sep = ',';
        });
        return result;
    }
    static $_(item, width = 0, decimals = 3, fillchar = "\u00A0") {
        let result = '[';
        let sep = '';
        item.forEach(value => { result += sep + this.format(value, width, decimals, fillchar); sep = ','; });
        return result + ']';
    }
    static w$$(id, item, width = 0, decimals = 3, fillchar = "\u00A0") {
        this.wl(id, A.$$(item, width, decimals, fillchar));
    }
    w$$(item, width = 0, decimals = 3, fillchar = "\u00A0") {
        return A.w$$(this._id, item, width, decimals, fillchar);
    }
    static w$_(id, item, width = 0, decimals = 3, fillchar = "\u00A0") {
        this.wl(id, A.$_(item, width, decimals, fillchar));
    }
    w$_(item, width = 0, decimals = 3, fillchar = "\u00A0") {
        return A.w$_(this._id, item, width, decimals, fillchar);
    }
    static format2(item, width = 0, decimals = 3, fillchar = "\u00A0") {
        let result = '';
        item.forEach(value => result += '|' + this.format(value, width, decimals, fillchar));
        return result;
    }
    static format3(item, width = 0, decimals = 3, fillchar = "\u00A0") {
        let result = '';
        item.forEach(value => result += '|' + this.format(value, width, decimals, fillchar));
        return result;
    }
    static round(value, decimals = 0) {
        let result = value * Math.pow(10, decimals);
        return Math.round(result) / Math.pow(10, decimals);
    }
    static forEach(first, last, dx = 1) {
        let ans = [];
        for (let i = first; i < last; i += dx)
            ans.push(i);
        return ans;
    }
    static countTo(n) {
        return Array.from({ length: n }, (_, i) => i + 1);
    }
    static arange(first, last, dx = 1) {
        let ans = [];
        for (let i = first; i < last; i += dx)
            ans.push(i);
        return ans;
    }
    static ok(value) {
        if (value === undefined)
            return false;
        if (value == null)
            return false;
        return true;
    }
}
A._br = '<br/>';
//# sourceMappingURL=A.js.map