'use strict' //interpreter javascript withDefaults, ze dany plik sprawdza w sposób formalny ( dokładniejszy)

import { ipcMain } from 'electron'
const SerialPort = require('serialport');

let globalWin;


let rs232_config = {
    is_enabled: true,
}

function initRS232(win) {
    globalWin = win;


    ipcMain.handle('config:rs232:getcoms', async (event, arg) => {
        //cos wyciaga
        let coms = await SerialPort.SerialPort.list().then(ports => {
            return ports;
            
        });
        return coms;
    })

}


export default initRS232