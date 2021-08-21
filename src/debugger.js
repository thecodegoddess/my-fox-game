"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameDebugger = {
    debuggerElement: null,
    tickerElement: null,
    messageElement: null,
    init: function () {
        this.debuggerElement = document.createElement('details');
        this.debuggerElement.setAttribute('class', 'debugger');
        var summaryElement = document.createElement('summary');
        summaryElement.textContent = 'Debugger';
        this.debuggerElement.appendChild(summaryElement);
        document.body.appendChild(this.debuggerElement);
        this.tickerElement = document.createElement('div');
        this.tickerElement.setAttribute('class', 'debugger__ticker');
        this.messageElement = document.createElement('ul');
        this.messageElement.setAttribute('class', 'debugger__msg');
        this.debuggerElement.appendChild(this.tickerElement);
        this.debuggerElement.appendChild(this.messageElement);
    },
    updateMsg: function (txt) {
        if (!this.debuggerElement) {
            this.init();
        }
        if (!this.messageElement) {
            return;
        }
        var msgItem = document.createElement('li');
        msgItem.innerHTML = txt;
        this.messageElement.appendChild(msgItem);
        this.messageElement.scrollTop = this.messageElement.scrollHeight;
    },
    updateTicker: function (ticker) {
        if (!this.debuggerElement) {
            this.init();
        }
        if (!this.tickerElement) {
            return;
        }
        this.tickerElement.innerHTML = "Ticker Time: <span>" + ticker + "</span>";
    },
    cleanUp: function () {
        if (!this.debuggerElement) {
            return;
        }
        document.body.removeChild(this.debuggerElement);
        this.debuggerElement = null;
        this.tickerElement = null;
        this.messageElement = null;
    },
};
exports.default = gameDebugger;
