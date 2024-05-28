const { app, BrowserWindow, screen, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const url = require('url');

function createWindow() {
  const { width: workAreaWidth, height: workAreaHeight } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: Math.min(1430, workAreaWidth),
    height: workAreaHeight,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  win.loadURL('https://www.pinterest.com');

  // Handle link clicks to open in default system browser
  win.webContents.setWindowOpenHandler(({ url: clickedUrl }) => {
    const finalUrl = extractFinalUrl(clickedUrl);
    shell.openExternal(finalUrl);
    return { action: 'deny' }; // Prevent new Electron window
  });

  win.webContents.on('will-navigate', (event, clickedUrl) => {
    if (clickedUrl !== win.webContents.getURL()) { // Check if the navigation is not to the same page
      event.preventDefault();
      const finalUrl = extractFinalUrl(clickedUrl);
      shell.openExternal(finalUrl);
    }
  });
}

function extractFinalUrl(clickedUrl) {
  const parsedUrl = url.parse(clickedUrl, true);
  if (parsedUrl.hostname === 'www.pinterest.com' && parsedUrl.pathname === '/offsite/') {
    // Extract the final URL from the query parameters
    return parsedUrl.query.url;
  }
  return clickedUrl;
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
  console.log('Update available');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded');
  autoUpdater.quitAndInstall();
});
