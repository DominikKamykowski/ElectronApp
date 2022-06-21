'use strict'

import{ipcMain} from 'electron'
import { contextIsolated } from 'process';

const dgram = require('dgram')

let eth_config = {
    is_enabled: true,
    socket: null
}

let globalWin;

function createSocket(host, port) {
    let socket = dgram.createSocket('udp4');
    try {
        socket.on('message', function (msg, rinfo) {
            // rinfo --> { address: '127.0.0.1', family: 'IPv4', port: 49780, size: 512 }
            if (rinfo.size > 0 && globalWin && eth_config.is_enabled) {
                globalWin.webContents.send('config:eth:data', msg);
                console.log(msg)
                
            }
        });
        socket.bind(port, host);
    } catch (e) {
        return null;
    }
    return socket;
}

function initETH(win) {
    console.log(win)
    globalWin = win
    ipcMain.handle('config:eth:reload', (event, arg) => {
        console.log(arg)
        if (eth_config.socket != null) {
            eth_config.socket.close()
            eth_config.socket = null
        }
        eth_config.socket = createSocket(arg.ip, arg.port)
        return eth_config.socket != null
    })
}


export default initETH