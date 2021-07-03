#!/usr/bin/env node
'use strict';

const program = require('commander')
const p = require('../package.json')
const webhook = require('./actions/webhook')
const ngrokServer = require('./actions/ngrok')
const botInfo = require('./actions/bot')

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
    .argument('<PORT>', 'integer argument')
    .option('-t, --token <Access Token>', 'Access Token')
    .option('-p, --path <PATH>', 'PATH')

    .action(async (port, options, command) => {
        const path = options.path || `/webhook`;
        const params = {
            token: options.token,
            port: port || 3000
        }
        const res = await ngrokServer(params);
        const params2 = {
            token: options.token,
            url: res.url + path 
        }
        await webhook(params2);

        console.log(`\n\n Forwarding ${res.url} -> http://localhost:${params.port}`);
        console.log(`Webhook URLを「${params2.url}」に変更しました。\n トンネリングサーバーを起動しました。`);
        console.log(`...`);
    })

// ngrokコマンド
program.command('info')
    .description('get bot info')
    .option('-t, --token <Access Token>', 'Access Token')
    .action(async (params, command) => {
        const res = await botInfo(params);
        console.log(`\n\n`,res);
    })

// // fugaコマンド
// program.command('fuga')
//   .description('2つ目のコマンドです')
//   .action(() => console.log('fugaが実行されました'))

program.parse(process.argv)