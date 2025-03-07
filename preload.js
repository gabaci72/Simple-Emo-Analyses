const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
  analyzeSentiment: (text) => ipcRenderer.invoke('analyzeSentiment', text),
});
