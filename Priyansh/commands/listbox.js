module.exports.config = {
  name: 'listbox',
  version: '1.0.0',
  credits: '𝘼𝙮𝙪𝙨𝙝 𝙋𝙖𝙣𝙙𝙞𝙩',
  hasPermssion: 2,
  description: 'List thread bot participated',
  commandCategory: 'System',
  usages: 'listbox',
  cooldowns: 15
};


module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {

  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  var arg = event.body.split(" ");
  var idgr = handleReply.groupid[arg[1] - 1];


  switch (handleReply.type) {

    case "reply":
      {
        if (arg[0] == "ban" || arg[0] == "Ban") {
          const data = (await Threads.getData(idgr)).data || {};
          data.banned = 1;
          await Threads.setData(idgr, { data });
          global.data.threadBanned.set(parseInt(idgr), 1);
          api.sendMessage(`[${idgr}] It was successful!`, event.threadID, event.messageID);
          break;
        }

        if (arg[0] == "out" || arg[0] == "Out") {
          api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
          api.sendMessage("Out thread with id: " + idgr + "\n" + (await Threads.getData(idgr)).name, event.threadID, event.messageID);
          break;
        }

      }
  }
};


module.exports.run = async function({ api, event, client }) {
  var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

  var listthread = [];

  //////////


  for (var groupInfo of list) {
    let data = (await api.getThreadInfo(groupInfo.threadID));

    listthread.push({
      id: groupInfo.threadID,
      name: groupInfo.name,
      sotv: data.userInfo.length,
    });

  } //for

  var listbox = listthread.sort((a, b) => {
    if (a.sotv > b.sotv) return -1;
    if (a.sotv < b.sotv) return 1;
  });

  let msg = '',
    i = 1;
  var groupid = [];
  for (var group of listbox) {
    msg += `${i++}. ${group.name}\n🧩TID: ${group.id}\n🐸Member: ${group.sotv}\n\n`;
    groupid.push(group.id);
  }

  api.sendMessage(msg + 'Reply "out" or "ban" the number of order to out or ban that thread!!', event.threadID, (e, data) =>
    global.client.handleReply.push({
      name: this.config.name,
      author: event.senderID,
      messageID: data.messageID,
      groupid,
      type: 'reply'
    })
  );
};
