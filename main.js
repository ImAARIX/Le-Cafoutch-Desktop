// Modules to control application life and create native browser window
const {app, Tray, Menu, nativeImage, BrowserWindow} = require('electron');
const { truncate } = require('fs');
const path = require('path')
var tray = null;
const icon = nativeImage.createFromPath('C:/Users/cleme/Desktop/Autre/CQFD.png');
const remote = require('electron').remote;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 750,
    height: 500,
    center: true,
    movable: true,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    },
    show: false,
    icon: icon
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  return mainWindow;
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const win = createWindow()
  
  
  //DEBUG
  win.once('ready-to-show', () => {
    win.show();
  })
  //DEBUG

  
  win.once('ready-to-show', () => {
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Ouvrir', role: 'window'},
      {label: 'Quitter', role: 'quit'}
    ]);
    tray.setContextMenu(contextMenu);
    tray.displayBalloon({
      title: 'Le-Cafoutch Desktop',
      content: 'Le-Cafoutch Desktop tourne actuellement en arrière plan.'
    });

    tray.on('click', () => {
      if(win.isVisible()) {
        win.hide();
      } else {
        win.show();
      }
    })

    //var xButton = document.getElementById('xButton');
    
  })
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  //if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
