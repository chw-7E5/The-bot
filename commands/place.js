const Discord = require('discord.js');
const _Error = require('../misc/error');
const misc = require('../misc/misc')
const Game = require('../object/game')
const db = require('quick.db');

module.exports = {
    name: 'place',
    description: "To place in tictactoe \n "
                +"!place <x> <y>",
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} args The argugment
     * @param {Discord.Client} client The bot
     */
    async execute(msg, args, client){
        let game = client.currentGames.get(msg.channel.name);
        if (!game) return msg.reply('there is no on going game!')
                                                                .catch(e=>_Error.msgErrorToSender(e,msg));

        let passed = false;
        if(game.round === 0 && msg.author.id === game.player0.id)
            passed = game.place(args[0],args[1],0)
        else if(game.round === 1 && msg.author.id === game.player1.id)
            passed = game.place(args[0],args[1],1)

        if(!passed)
            msg.reply('you cannot place there!')
                .catch(e=>_Error.msgErrorToSender(e,msg));
        else{
            msg.channel.send(`${game.board[6]},${game.board[7]},${game.board[8]}\n${game.board[3]},${game.board[4]},${game.board[5]}\n${game.board[0]},${game.board[1]},${game.board[2]}`)
            game.round = (game.round === 0 ? 1 : 0) 
            if(game.round === 0)
                msg.channel.send(`Player 0 <@${game.player0.id}>, your turn?`)
            else msg.channel.send(`Player 1 <@${game.player1.id}>, your turn?`)
        }
        
        if(game.winner === 0){
            msg.channel.send(`Player 0 <@${game.player0.id}> has won!`)
                .catch(e=>_Error.msgErrorToSender(e,msg));
            client.currentGames.delete(msg.channel.name)
            if(db.has(game.player0.id)){
                db.add(`${game.player0.id}.win`,1)
            }else{
                db.set(`${game.player0.id}.win`,1)
                db.set(`${game.player0.id}.lost`,0)
            }

            if(db.has(game.player1.id)){
                db.add(`${game.player1.id}.lost`,1)
            }else{
                db.set(`${game.player1.id}.lost`,1)
                db.set(`${game.player1.id}.win`,0)
            }
        }
            
        if(game.winner === 1){
            msg.channel.send(`Player 1 <@${game.player1.id}> has won!`)
                .catch(e=>_Error.msgErrorToSender(e,msg));
            client.currentGames.delete(msg.channel.name)
            if(db.has(game.player1.id)){
                db.add(`${game.player1.id}.win`,1)
            }else{
                db.set(`${game.player1.id}.win`,1)
                db.set(`${game.player1.id}.lost`,0)
            }

            if(db.has(game.player0.id)){
                db.add(`${game.player0.id}.lost`,1)
            }else{
                db.set(`${game.player0.id}.lost`,1)
                db.set(`${game.player0.id}.win`,0)
            }
        }
            
    }
}