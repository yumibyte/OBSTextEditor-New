
const { app, BrowserWindow } = require('electron');
const path = require('path');
console.log(path);

// const fs = require('fs');

// function writeTextFile() {
//   fs.writeFile('TextText.txt', localStorage.getItem("title"), (err) => {
//       if (err) throw err;
//   })
// }

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// https://stackoverflow.com/questions/44391448/electron-require-is-not-defined
// modifying the BrowserWindow setup is a shortcut for initializing require
// TODO: could make this better through ipcRenderer

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}






// const createWindow = () => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       enableRemoteModule: true,
//       contextIsolation: false,
//       // preload: path.join(__dirname, 'preload.js')
//
//     }
//   });
//
//   // and load the index.html of the app.
//   mainWindow.loadFile(path.join(__dirname, 'index.html'));
//
//   // Open the DevTools.
//   mainWindow.webContents.openDevTools();
// };

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})





//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
//
// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
//
// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
