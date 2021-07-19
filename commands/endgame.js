module.exports = {
    name: 'endgame',
    description: 'Make the bot stop the game on the channel\n' 
                +'!endgame',
    async execute(msg,client) {
        const voiceChannel = msg.member.voice.channel;
 
        if(client.currentGames.delete(msg.channel.name))
            msg.channel.send("Game ended").catch(e=>_Error.msgErrorToSender(e,msg))
        else msg.channel.send("No game found").catch(e=>_Error.msgErrorToSender(e,msg))
    }
}