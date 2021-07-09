const Discord = require('discord.js');
const _Error = require('../misc/error');
const misc = require('../misc/misc')


module.exports = {
    name: 'peek',
    description: "To peek emojis from a server \n "
                +"!peek <name of server> <emoji (optional)>",
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} fullArg The full argugment
     * @param {Discord.Client} client The bot
     */
    async execute(msg, fullArg, client){
        guild = client.guilds.cache.find(guild => guild.name === fullArg);
        // Return cases:
        if(!guild) return msg.reply('server not found')
        
        try{
            emojiList = guild.emojis.cache.map(emoji => emoji.id);
            for(const emoji of emojiList)
                msg.react(emoji)
        }catch(e){
            _Error.msgErrorToSender(e,msg)
        }
    }
}