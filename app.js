const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const execFile = require('child_process').execFile;



let backendProcess;
let isBackendReady = false;

function createWindow() {
    const backendPath = process.env.NODE_ENV === 'development'
        ? path.join(__dirname, 'backend', 'dist', 'main.exe')
        : path.join(process.resourcesPath, 'backend', 'dist', 'main.exe');

    const env = Object.assign({}, process.env, { PATH: `/opt/homebrew/bin:${process.env.PATH}` });
    backendProcess = execFile(
        backendPath, 
        { 
          windowsHide: true,
          env: env
        }, 
        (err, stdout, stderr) => {
          if (err) {
              console.log(`Error executing file: ${err}`);
          }
          if (stdout) {
              console.log(`STDOUT: ${stdout}`);
          }
          if (stderr) {
              console.log(`STDERR: ${stderr}`);
          }
        }
      );

    backendProcess.on('error', (error) => {
        console.error('Backend process error:', error);
    });

    backendProcess.on('exit', (code, signal) => {
        console.log(`Backend process exited with code ${code} and signal ${signal}`);
    });

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
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.whenReady().then(() => {
        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });

    app.on('window-all-closed', () => {
        if (backendProcess) {
            backendProcess.kill();
        }
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('before-quit', () => {
        if (backendProcess) {
            backendProcess.kill();
        }
    });

    app.on('second-instance', (event, commandLine, workingDirectory) => {
        const win = BrowserWindow.getAllWindows()[0];
        if (win) {
            if (win.isMinimized()) win.restore();
            win.focus();
        }
    });
}
