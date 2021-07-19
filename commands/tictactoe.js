const Discord = require('discord.js');
const misc = require('../misc/misc');
const Game = require('../object/game');

module.exports = {
    name: 'tictactoe',
    description: 'Play tic tac toe with someone\n' 
                +'!tictactoe <@someone>',
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} args The full argugment
     * @param {Discord.Client} client The bot
     */
    async execute(msg,args,client) {
        const user = misc.getUserFromMention(args[0],msg);
		if (!user) {
			return msg.reply('user not found!')
                .catch(e=>_Error.msgErrorToSender(e,msg))
		}
        if (client.currentGames.get(msg.channel.name)) return msg.reply('there is already an on going game!')
                                                                .catch(e=>_Error.msgErrorToSender(e,msg));
        client.currentGames.set(msg.channel.name,new Game(msg,msg.author,user))
        let game = client.currentGames.get(msg.channel.name) 

        msg.reply('game started!\n'+`<@${game.player0.id}> vs <@${game.player1.id}>`)
        .catch(e=>_Error.msgErrorToSender(e,msg));
        msg.channel.send(`${game.board[6]},${game.board[7]},${game.board[8]}\n${game.board[3]},${game.board[4]},${game.board[5]}\n${game.board[0]},${game.board[1]},${game.board[2]}`)
    }
}