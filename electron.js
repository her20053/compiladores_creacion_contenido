const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');

let flaskProcess = null;

function createWindow() {

    flaskProcess = spawn('python', ['./backend/main.py']);

    flaskProcess.stdout.on('data', (data) => {
      console.log(`Flask: ${data}`);
    });
  
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true,
        },
  });

  mainWindow.loadURL('http://127.0.0.1:5173');
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('will-quit', () => {
    flaskProcess.kill();
  });
