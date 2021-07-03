'use strict';

const axios = require('axios');
const LINE_WEBHOOK_SET_API = `https://api.line.me/v2/bot/channel/webhook/endpoint`;

const main = async (params) => {
    const LINE_CHANNEL_ACCESS_TOKEN = process.env.TOKEN || params.token;
    const WEBHOOK_URL = process.env.WEBHOOK_URL || params.url;
    
    const config = {
        url: LINE_WEBHOOK_SET_API,
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
        },
        data: {
            'endpoint': WEBHOOK_URL
        }
    }

    try {
        const res = await axios.request(config);
        console.log(res.data);
        // return res.data;
        return {url: WEBHOOK_URL}
    } catch (error) {
        console.log(error);
    }

}

// main();

module.exports = main;