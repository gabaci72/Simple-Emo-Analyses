const { app, BrowserWindow, contextBridge } = require('electron');
const path = require('path');

function createWindow() {
  try {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
        devTools: true,
        webSecurity: true,
      },
    });

    mainWindow.loadFile('index.html');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  } catch (error) {
    console.error('Error creating window:', error);
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const { ipcMain } = require('electron');
const sentiment = require('sentiment');

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('analyzeSentiment', async (event, text) => {
  try {
    // Check if the input text is in English


    const analysis = sentiment(text);
    if (!analysis) {
      throw new Error('Sentiment analysis returned null');
    }
    return analysis;
  } catch (error) {
    console.error('Error during sentiment analysis:', error);
    return null;
  }
});
