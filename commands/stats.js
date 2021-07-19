const Discord = require('discord.js');
const _Error = require('../misc/error');
const misc = require('../misc/misc')
const db = require('quick.db');

module.exports = {
    name: 'stats',
    description: "To show someone's stats in tictactoe \n "
                +"!stats <@name>",
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} args Argument of the command
     * @param {Discord.Client} client The bot
     */
    async execute(msg, args){
		const user = misc.getUserFromMention(args[0],msg);
		if (!user) {
			return msg.reply('user not found!')
                .catch(e=>_Error.msgErrorToSender(e,msg))
		}
        msg.reply(`<@${user.id}> has won ` + db.get(`${user.id}.win`) + " times and lost " + db.get(`${user.id}.lost`) + " times.")

    }
}