#!/usr/bin/env node
'use strict';

const program = require('commander')
const p = require('../package.json')
const webhook = require('./actions/webhook')

// バージョン情報
program
  .version(p.version, '-v, --version')

// webhookコマンド
program.command(`webhook`)
    .description('Change the LINE BOT webhook URL')
    .option('-t, --token <Access Token>', 'Access Token')
    .option('-u, --url <Webhook URL>', 'Webhook URL')
    // .option('-d, --debug', 'display some debugging')
    .action((name, options, command) => {
        const params = {
            token: name.token,
            url: name.url
        }
        return webhook(params);
    })
    .action(res => console.log(`\n Webhook URLを「${res.url}」に変更しました。`))
    // .option('-p, --pizza-type <type>', 'flavour of pizza')
    // .argument('<username>', 'user to login')
    // .action(user => console.log(`hoge`,user));
    // .action(() => webhook())
    // .action((name, options, command) => {
    //     const options2 = program.opts();
    //     console.log(options2.pizzaType);
        // if (options.debug) {
        //     console.error('Called %s with options %o', command.name(), options);
        //   }
        //   const title = options.title ? `${options.title} ` : '';
        //   console.log(`Thank-you ${title}${name}`);
    // })

// const options = program.opts();
// console.log(options);
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);

// // fugaコマンド
// program.command('fuga')
//   .description('2つ目のコマンドです')
//   .action(() => console.log('fugaが実行されました'))

program.parse(process.argv)