module.exports.config = {
 name: "siesta",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "𝘼𝙮𝙪𝙨𝙝 𝙋𝙖𝙣𝙙𝙞𝙩",
 description: "Random photo Siesta my wife UwU",
 commandCategory: "Random-IMG",
 usages: "siesta",
 cooldowns: 3
};

module.exports.run = async ({ api, event }) => {
 const axios = require('axios');
 const request = require('request');
 const fs = require("fs");
 axios.get('https://siesta-api.bhhoang.repl.co').then(res => {
 let ext = res.data.success.substring(res.data.success.lastIndexOf(".") + 1);
 let callback = function () {
     api.sendMessage({
      attachment: fs.createReadStream(__dirname + `/cache/siesta.${ext}`)
     }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/siesta.${ext}`), event.messageID);
    };
    request(res.data.success).pipe(fs.createWriteStream(__dirname + `/cache/siesta.${ext}`)).on("close", callback);
   })
}
