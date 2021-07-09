const Discord = require('discord.js');
require('dotenv').config();
const _Error = require('../misc/error');
const misc = require('../misc/misc')
const googleIt = require('google-it')

module.exports = {
    name: 'google',
    description: "Using google to search \n "
                +"!google <search terms>",
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} fullArg The full argugment
     */
    async execute(msg,fullArg){
        const embed = new Discord.MessageEmbed()
        .setTitle("Google Search Results")
        .setColor(3426654)
        .setTimestamp()
        
        googleIt({'query': fullArg}).then(results => {
            results.forEach(function(item, index) { 
                embed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
            });
            msg.reply(embed);
        }).catch(e => {
            msg.reply(e).catch(e=>_Error.msgErrorToSender(e,msg))
        });

    }
}