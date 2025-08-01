module.exports.config = {
  name: "download",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "𝘼𝙮𝙪𝙨𝙝 𝙋𝙖𝙣𝙙𝙞𝙩",
  description: "Download files",
  commandCategory: "System",
  usages: "download <link> || download <path> <link>",
  cooldowns: 5
};

module.exports.run = async function({ api, event, client, Threads, args }) {
    const fs = global.nodemodule["fs-extra"], axios = global.nodemodule["axios"], rq = global.nodemodule["request"];
    
    if(!args[1]) {
        var path = __dirname + '';
        var link = args.slice(0).join("");
    }
    else {
        var path = __dirname + '/'+args[0];
        var link = args.slice(1).join("");
    };
    var format = rq.get(link);
    var namefile = format.uri.pathname;
    var path = path+'/'+(namefile.slice(namefile.lastIndexOf("/")+1));
    let getimg = (await axios.get(link, { responseType: "arraybuffer" }))
    .data;
  fs.writeFileSync(path, Buffer.from(getimg, "utf-8"));
  
  return api.sendMessage("Save the file to the folder"+path, event.threadID, event.messageID);
    
}  
