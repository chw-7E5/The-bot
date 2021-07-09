const Discord = require('discord.js')

const xiStare = "https://cdn.discordapp.com/attachments/854032969613180978/862658097670651904/2d6d8a38-8138-4b53-8a16-2c9d252d9827.jpg";

module.exports = gamerWords = {
    "sus": (msg)=>msg.reply("sus"),
    "china": (msg)=>{
        msg.reply("praise be", {files: [xiStare]})
        return false;
    },
    "chinese": (msg)=>{
        msg.reply("praise be", {files: [xiStare]})
        return false;
    },
    "fuck": (msg)=>msg.reply("no fucking allowed in " + msg.guild.name),
    "help": (msg)=>msg.reply("no help will be coming"),
    "rock and stone": (msg)=>msg.reply("ROCK AND STONE, BROTHERS!"),
};