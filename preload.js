const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bongoAPI', {
  onKeyEvent: (callback) => ipcRenderer.on('key-event', (_event, data_) => callback(data)),
  onMouseEvent: (callback) => ipcRenderer.on('mouse-event', (_event, data) => callback(data)),

});