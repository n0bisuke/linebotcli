'use strict';

const { execFileSync} = require('child_process')

const ngrokIntall = async () => {
    //終了時にngrokをuninstall
    process.on('SIGINT',() => execFileSync('npm', ['uninstall','ngrok']));
    process.on('beforeExit', (code) => {
        const stdout = execFileSync('npm', ['uninstall','ngrok']);
        console.log(stdout.toString());
    });
    
    try {
        const stdout = execFileSync('npm', ['i','ngrok']);
        // console.log('STDOUT', stdout.toString());
        const ngrok = require(`ngrok`);
        return ngrok;
    } catch (error) {
        console.log(error);
    }
}

const main = async (params) => {
    try {
        console.log(`Launching ngrok...`);
        const ngrok = await ngrokIntall();
        const url = await ngrok.connect(params.port);
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