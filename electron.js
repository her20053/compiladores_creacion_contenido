const { app, BrowserWindow } = require('electron');
const path = require('path');
const execFile = require('child_process').execFile;



let backendProcess;

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
      },
    });

    
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    win.loadFile(indexPath)
        .then(() => {
            console.log('File loaded successfully');
        })
        .catch((err) => {
            console.error('Failed to load file:', err);
        });
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