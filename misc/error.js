const Discord = require('discord.js');

/** 
 * @param {Error} e The error
 * @param {Discord.Message} msg The message that started the error
 */
const msgErrorToSender = (e, msg) => {
    console.log(msg.guild.name + " error:\n" + e)
    msg.author.send(
        "this is clearly your fault:\n" + 
        '```' + e.name + ":\n" +
        e.message + "\n" +
        msg.guild.name + "/" + msg.channel.name + "```"
    ).catch(e=>{
        console.log(e);
    });
}

module.exports = {
    msgErrorToSender
}