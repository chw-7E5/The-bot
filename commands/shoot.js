const Discord = require('discord.js');
const _Error = require('../misc/error');
const misc = require('../misc/misc')

module.exports = {
    name: 'shoot',
    description: "To shoot someone \n "
                +"!shoot <@name> <times>",
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} args Argument of the command
     * @param {Discord.Client} client The bot
     */
    async execute(msg, args){
        if (args[0]) {
			const user = misc.getUserFromMention(args[0],msg);
			if (!user) {
				return msg.reply('user not found!')
                    .catch(e=>_Error.msgErrorToSender(e,msg))
			}

            if(misc.isNormalInteger(args[1])){
                try{
                    for(var i = 0; i < args[1]; i++)
                        msg.channel.send(`<@${user.id}>`)
                }catch(e){
                    _Error.msgErrorToSender(e,msg);
                }
                return;
            }
			return msg.channel.send(`<@${user.id}>`)
                .catch(e => _Error.msgErrorToSender(e,msg));
		}else{
            return msg.reply('no argument found!');
        }
    }
}