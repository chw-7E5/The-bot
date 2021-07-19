const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
 
module.exports = {
    name: 'youtube',
    description: 'To play something from youtube \n'+
    '!youtube <song name or link>',
    async execute(msg, args) {
        const voiceChannel = msg.member.voice.channel;
 
        if (!voiceChannel) return msg.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) return msg.reply('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return msg.reply('you dont have the correct permissins');
        if (!args) return msg.channel.send('?');
        
        // Check if the user is sending a URL
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
        
        // Playing URL
        if(validURL(args[0])){
 
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                msg.channel.send('leaving channel');
            });
 
            await msg.reply(`playing ${args[0]}`)
 
            return
        }
 
        const  connection = await voiceChannel.join();
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
 
        }
 
        const video = await videoFinder(args.join(' '));
 
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
 
            await msg.reply(`playing ***${video.title}***\n${video.url}`)
        } else {
            msg.channel.send('No video results found');
        }
    }
}