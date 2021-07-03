#!/usr/bin/env node
'use strict';

const axios = require('axios');
const LINE_WEBHOOK_SET_API = `https://api.line.me/v2/bot/channel/webhook/endpoint`;
const LINE_CHANNEL_ACCESS_TOKEN = process.env.TOKEN; //コマンドから

let config = {
    url: LINE_WEBHOOK_SET_API,
    method: 'put',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
    },
    data: {
        'endpoint': process.env.WEBHOOK_URL
    }
}

const main = async () => {
    try {
        const res = await axios.request(config);
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }

}

main();