module.exports.config = {
	name: "setkey",	
       version: "1.0.0",
	hasPermssion: 2,
	credits: "𝘼𝙮𝙪𝙨𝙝 𝙋𝙖𝙣𝙙𝙞𝙩",
	description: "Edit api key data YouTube v3",
	commandCategory: "admin",
	usages: "setkey [key]",
	cooldowns: 5,
};

module.exports.run = async function({ global, api, event, args, client }) {
var config = require(client.dirConfig);
var fs = require("fs-extra");
      config.video.YOUTUBE_API = `${args.join("")}`;
  fs.writeFileSync(client.dirConfig, JSON.stringify(config, "utf-8"));
    	api.sendMessage("loading...", event.threadID, () => require("node-cmd").run("pm2 restart 0"));		
}
