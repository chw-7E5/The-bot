const Discord = require('discord.js');
const { msgErrorToSender } = require('./error');

module.exports = {
    /** 
     * @param {any} id The id of the emoji
     * @param {Discord.Client} client The bot
     */
    stealEmoji: (id,client) => {
        return client.emojis.cache.get(id).toString;
    },

    /** 
     * @param {any} mention Mentioned user
     * @param {Discord.Client} client The bot
     * @param {Discord.Message} msg The message
     */
    getUserFromMention: (mention, msg) => {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            
            return msg.member.guild.members.cache.get(mention);
        }
    },
    getChannelFromMention: (mention, msg) => {
        if (!mention) return;
    
        if (mention.startsWith('<#') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            
            return msg.member.guild.channels.cache.get(mention);
        }
    },


    isNormalInteger: (str) => {
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    },
    
}