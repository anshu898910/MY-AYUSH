module.exports.config = {
    name: "hand",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "𝘼𝙮𝙪𝙨𝙝 𝙋𝙖𝙣𝙙𝙞𝙩",
    description: "",
    commandCategory: "Love",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'namtay.png');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://imgur.com/vcG4det.jpg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let namtay_img = await jimp.read(__root + "/namtay.png");
    let pathImg = __root + `/namtay_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?height=720&width=720&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?height=720&width=720&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    namtay_img.resize(700, 440).composite(circleOne.resize(50, 50), 287, 97).composite(circleTwo.resize(40, 40), 50, 137);
    
    let raw = await namtay_img.getBufferAsync("image/png");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);
    
    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    var mention = Object.keys(event.mentions)[0]
    let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Please tag one person.", threadID, messageID);
    else {
        var one = senderID, two = mention;
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "Hold hands tightly " + tag + ' don't let go bae😍',
            mentions: [{
          tag: tag,
          id: mention
        }],
     attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}
