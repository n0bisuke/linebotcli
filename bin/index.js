#!/usr/bin/env node
'use strict';

const program = require('commander')
const p = require('../package.json')
const webhook = require('./actions/webhook')
const ngrokServer = require('./actions/ngrok')

// バージョン情報
program
  .version(p.version, '-v, --version')

// webhookコマンド
program.command(`webhook`)
    .description('Change the LINE BOT webhook URL')
    .option('-t, --token <Access Token>', 'Access Token')
    .option('-u, --url <Webhook URL>', 'Webhook URL')
    .action((name, options, command) => {
        const params = {
            token: name.token,
            url: name.url
        }
        return webhook(params);
    })
    .action(res => console.log(`\n Webhook URLを「${res.url}」に変更しました。`))

// ngrokコマンド
program.command('ngrok')
    .description('ngrok tonnneling & Change the LINE BOT webhook URL')
    .option('-t, --token <Access Token>', 'Access Token')
    .option('-h, --http <HTTP>', 'HTTP')
    .option('-p, --path <PATH>', 'PATH')
    .action(async (name, options, command) => {
        const params = {
            token: name.token,
            port: name.http
        }
        const res = await ngrokServer(params);
        const params2 = {
            token: name.token,
            url: res.url + name.path 
        }
        await webhook(params2);

        console.log(`\n\n Forwarding ${res.url} -> http://localhost:${params.port}`);
        console.log(`Webhook URLを「${params2.url}」に変更しました。\n トンネリングサーバーを起動...`);
    })


// // fugaコマンド
// program.command('fuga')
//   .description('2つ目のコマンドです')
//   .action(() => console.log('fugaが実行されました'))

program.parse(process.argv)