'use strict';

const { spawn } = require('child_process')

//npx ngrokwrapperを実行
const ngrokSpawn = (port) => {
    return new Promise((resolve, reject) => {
        const ngrok = spawn('npx', ['ngrokwrapper','http',port || '3000']);
        ngrok.stdout.on('data', d => resolve(`${d}`));
        // ngrok.stderr.on('data', d => reject(`${d}`));
    });
}

const main = async (params) => {
    try {
        console.log(`Launching ngrok...!!!`);
        const resMsg = await ngrokSpawn(params.port);
        // console.log(resMsg);
        const url = resMsg.match(/https\:\/\/(.*?)\.ngrok\.io/)[0];
        return {
            url: url,
            port: params.port,
            token: params.token
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = main;