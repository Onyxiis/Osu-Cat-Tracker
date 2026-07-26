const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

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
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },

  });

  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() =>{
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});