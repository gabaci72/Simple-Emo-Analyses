const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

ipcMain.handle('analyzeSentiment', (event, arg) => {
  const text = arg.text;
  const analysis = sentiment.analyze(text);
  return analysis;
});
