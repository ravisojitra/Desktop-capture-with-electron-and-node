const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const {ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
// const path = require('path');
// const remote = require('electron').remote

// const remoteapp = remote.app;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})
  win.webContents.openDevTools();
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
// Event handler for asynchronous incoming messages
ipcMain.on('receiveMessage', (event,data) => {
  console.log(data);
   // Event emitter for sending asynchronous messages
   event.sender.send('replyToMessage', 'async pong')
})

// ipcMain.on('openFile',(event,path)=>{
//     const {dialog} = require('electron')
    
//     dialog.showOpenDialog(function (files){
//       if(files !== undefined){
//         readFiles(files[0]);
//       }
//     })
//     function readFiles(filepath){
//   fs.readFile(filepath,'utf-8',(err,data)=>{
//     if(err){
//       alert("error while reading files "+err.message)
//       return
//     }
//     event.sender.send('fileData',data);
//   })
// }
// })

ipcMain.on('SaveCaptureVideo',(event,data)=>{
    const {dialog} = require('electron')
    var buffer = data;
    dialog.showSaveDialog(function (fileName){
      
      if (fileName === undefined){
          event.sender.send('SavedCaptureVideo',"You didn't save the file");
          return;
      }
      fs.writeFile(fileName, buffer, function(err) {
          
          if (err) {
              event.sender.send('SavedCaptureVideo','Failed to save video ' + err);
          } else {
              event.sender.send('SavedCaptureVideo','Saved video: ' + fileName);
          }
      });

    })
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
