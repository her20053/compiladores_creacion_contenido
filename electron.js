const { app, BrowserWindow } = require('electron');
const path = require('path');
const spawn = require('child_process').spawn;

function createWindow() {
    const python = spawn('gunicorn', ['-w', '4', '-b', '127.0.0.1:5000', 'main:app'], {
        cwd: path.join(__dirname, 'backend'),
        env: {
            ...process.env,
            PYTHONPATH: process.env.PYTHONPATH
                ? `${process.env.PYTHONPATH}:${path.join(__dirname, 'backend')}`
                : path.join(__dirname, 'backend')
        }
    });

    python.stdout.on('data', function (data) {
        console.log("data: ", data.toString('utf8'));
    });

    python.stderr.on('data', function (data) {
        console.log(`stderr: ${data.toString('utf8')}`);
    });

    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadURL('http://127.0.0.1:5173');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
