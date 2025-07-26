module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝘼𝙮𝙪𝙨𝙝 𝙋𝙖𝙣𝙙𝙞𝙩",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "61578344454991") {
    var aid = ["1000059666675048"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Wo Busy H mujhe Bolo Kya Bolna H?", "Kya Hua Boss ko q Bula Rhe Ho?", "Wo Shayad Busy hoga", "AAYUSH Toh Chala gaya"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
