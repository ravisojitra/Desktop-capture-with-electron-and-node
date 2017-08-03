// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// const {ipcRenderer} = require('electron')

//     ipcRenderer.send('receiveMessage','data')

//     ipcRenderer.on('replyToMessage',(data)=>{
//       console.log("msg from main window");
//       console.log(data);
//     })

//     ipcRenderer.on('fileData',(event,data)=>{
//       console.log(data);
//       document.getElementById("done").innerHTML =  data;
//     })
//     function uploadphoto(){
//       ipcRenderer.send('openFile', () => {
//         console.log("Event sent.");
//       })
//     }