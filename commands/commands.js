const Discord = require('discord.js');
require('dotenv').config();
const _Error = require('../misc/error');
const misc = require('../misc/misc')
const googleIt = require('google-it')

module.exports = {
    name: 'commands',
    description: "Show all commands \n "
                +"!commands",
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} fullArg The bot
     */
    async execute(msg,client){
        const embed = new Discord.MessageEmbed()
        .setTitle("Command list:")
        .setColor(3426654)
        
        client.commands.map(command =>{
            embed.addField((command.name) + ": ",command.description);
        })
        msg.reply(embed);

    }
}