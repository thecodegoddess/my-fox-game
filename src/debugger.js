const gameDebugger = {
  debuggerElement: null,
  tickerElement: null,
  messageElement: null,
  init(){
    this.debuggerElement = document.createElement('details');
    this.debuggerElement.setAttribute('class', 'debugger');
    const summaryElement = document.createElement('summary');
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

  updateMsg(txt) {
    if (!this.debuggerElement) {
      this.init();
    }

    const msgItem = document.createElement('li');
    msgItem.innerHTML = txt;
    this.messageElement.appendChild(msgItem);
    this.messageElement.scrollTop = this.messageElement.scrollHeight;
  },

  updateTicker(ticker) {
    if(!this.debuggerElement) {
      this.init();
    }

    this.tickerElement.innerHTML = `Ticker Time: <span>${ticker}</span>`;
  },
  cleanUp(){
    if (!this.debuggerElement) {
      return;
    }

    document.body.removeChild(this.debuggerElement);
    this.debuggerElement = null;
    this.tickerElement = null;
    this.messageElement = null;
  }
}

export default gameDebugger;
