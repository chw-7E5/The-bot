const Discord = require('discord.js');
const _Error = require('../misc/error');
const misc = require('../misc/misc')

const ytdl = require('ytdl-core');
const { getChannelFromMention } = require('../misc/misc');

module.exports = {
    name: 'flash',
    description: "To flashbang an entire channel \n "
                +"!flash <channel>",
    /** 
     * @param {Discord.Message} msg The message
     * @param {any} Fullarg The full argugment
     */
    async execute(msg, fullArg){
        try{
            let channel = getChannelFromMention(fullArg,msg);
            if(!channel) channel = msg.guild.channels.cache.find(channel=> {
                return channel.name === fullArg && channel.type !== "category"
            });
            if(!channel) return msg.reply("which channel?")
            if(channel.type === "voice"){
                const connection = await channel.join();
                const stream  = ytdl("https://www.youtube.com/watch?v=JXjUQ9aPVg0", {filter: 'audioonly'});
                await new Promise(resolve => setTimeout(resolve, 1000));
                connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () =>{
                    channel.leave();
                })
            }else{
                channel.send("https://www.youtube.com/watch?v=JXjUQ9aPVg0").catch(e=>_Error.msgErrorToSender(e,msg))
            }

        }catch(e){
            _Error.msgErrorToSender(e,msg)
        }
    }
}