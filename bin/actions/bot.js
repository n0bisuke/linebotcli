'use strict';

const axios = require('axios');
const LINE_BOT_INFO_API = `https://api.line.me/v2/bot/info`;

const main = async (params) => {
    const LINE_CHANNEL_ACCESS_TOKEN = process.env.TOKEN || params.token;
    
    const config = {
        url: LINE_BOT_INFO_API,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
        },
    }

    try {
        const res = await axios.request(config);
        return res.data;
    } catch (error) {
        console.log(error);
    }

}

// main();

module.exports = main;