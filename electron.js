const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const execFile = require('child_process').execFile;



let backendProcess;
let isBackendReady = false;

function createWindow() {
    const backend = path.join(__dirname, 'backend', 'dist', 'main');
    backendProcess = execFile(
        backend, 
        { 
          windowsHide: true 
        }, 
        (err, stdout, stderr) => {
          if (err) {
              console.log(err);
          }
          if (stdout) {
              console.log(stdout);
          }
          if (stderr) {
              console.log(stderr);
          }
        }
      );

    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    const indexPath = path.join(__dirname, 'dist', 'index.html');
    win.loadFile(indexPath);

    backendProcess.stdout.on('data', (data) => {
      if (data.toString().includes("Serving Flask app 'main'")) { 
        win.webContents.send('backend-ready');
        console.log('Backend ready from electron.js');
        isBackendReady = true;
      }
    });

    ipcMain.on('check-backend-status', (event) => {
      if (isBackendReady) {
          event.sender.send('backend-status-response', true);
      } else {
          event.sender.send('backend-status-response', false);
      }
    });
  

    win.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (backendProcess) {
      backendProcess.kill();
  }
});