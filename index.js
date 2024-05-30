const { app, BrowserWindow, screen, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const url = require('url');
const path = require('path');

function createWindow() {
  const { width: workAreaWidth, height: workAreaHeight } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: Math.min(1430, workAreaWidth),
    height: workAreaHeight,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js') // Preload script to enable window resizing
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

  // Add a button to resize the window
  win.webContents.on('dom-ready', () => {
    win.webContents.executeJavaScript(`
      const resizeButton = document.createElement('button');
      resizeButton.innerText = 'Resize Window';
      resizeButton.style.position = 'fixed';
      resizeButton.style.bottom = '10px';
      resizeButton.style.right = '10px';
      resizeButton.style.zIndex = 1000;
      document.body.appendChild(resizeButton);
      
      resizeButton.addEventListener('click', () => {
        window.resizeWindow(800, 600); // Resize to 800x600
      });
    `);
  });
}

// Preload script (preload.js)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('window', {
  resizeWindow: (width, height) => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      currentWindow.setSize(width, height);
    }
  }
});

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