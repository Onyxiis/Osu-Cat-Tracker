const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bongoAPI', {
  onMouseMove: (callback) => ipcRenderer.on('mouse-move', (_event, data) => callback(data)),
  onKeyEvent: (callback) => ipcRenderer.on('key-event', (_event, data) => callback(data)),
  onMouseEvent: (callback) => ipcRenderer.on('mouse-event', (_event, data) => callback(data)),
});