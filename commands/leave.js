module.exports = {
    name: 'leave',
    description: 'Make the bot leave the channel\n' 
                +'!leave',
    async execute(msg) {
        const voiceChannel = msg.member.voice.channel;
 
        if(!voiceChannel) return msg.channel.send("you will need to be in a voice channel to stop me!");
        await voiceChannel.leave();
 
    }
}