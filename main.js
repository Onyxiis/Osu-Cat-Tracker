const { app, BrowserWindow, screen } = require('electron');
const { uIOhook } = require('uiohook-napi');
const path = require('path');
const { type } = require('os');

let mainWindow;

function createWindow(){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    x: width - 520,
    y: height - 370,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },

  });

  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.loadFile('index.html');
}

function setupInputHooks() {
  uIOhook.on('keydown', (e) => {
    mainWindow.webContents.send('key-event', {type: 'down', keycode: e.keycode});
  });
  

  uIOhook.on('keyup', (e) => {
    mainWindow.webContents.send('key-event', { type: 'up', keycode: e.keycode});
  });

  uIOhook.on('mousedown', (e) => {
    mainWindow.webContents.send('mouse-event', { type: 'down', button: e.button});
  });
  uIOhook.on('mouseup', (e) => {
    mainWindow.webContents.send('mouse-event', { type: 'up', button: e.button});
  });

  uIOhook.start();
}

app.whenReady().then(() =>{
  createWindow();
  setupInputHooks();
});

app.on('window-all-closed', () => {
  uIOhook.stop();
  app.quit();
});