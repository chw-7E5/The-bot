const Discord = require('discord.js');
require('dotenv').config();
const _Error = require('./misc/error');
const googleIt = require('google-it')
const gamerWords = require('./misc/GamerWords')

const client = new Discord.Client();

const prefix = process.env.prefix;

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', msg=>{
    // On pinged
    if(msg.mentions.has(client.user))
        msg.react('860843557766037525').catch((e) => _Error.msgErrorToSender(e,msg))
    // Return cases:

    if(msg.author.bot) return;
    if(msg.author == client.user) return;
    if(msg.guild === null) {
        msg.reply('No:tm:');
        return;
    }
    // Gamer words
    for(var word in gamerWords){
        if(msg.content.toLowerCase().includes(word))
            if(!gamerWords[word](msg)){
                msg.delete().catch(e=>_Error.msgErrorToSender(e,msg))
                return;
            }
    }
    if(!msg.content.startsWith(prefix)) return;

    // Functions: 
    const fullArg = msg.content.substr(msg.content.indexOf(' ')+1);
    const args = msg.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

    /*if (!args.length) 
        msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    */
   try{
    switch(command){
        case 'shoot':
            client.commands.get('shoot').execute(msg, args)
            break;
        case 'peek':
            client.commands.get('peek').execute(msg, fullArg, client)
            break;
        case 'google':
            client.commands.get('google').execute(msg,fullArg)
            break;
        case 'flash':
            client.commands.get('flash').execute(msg,fullArg)
            break;
        case 'youtube':
            client.commands.get('youtube').execute(msg,args)
            break;
        case 'leave':
        case 'stop':
            client.commands.get('leave').execute(msg)
            break;
        case 'commands':
            client.commands.get('commands').execute(msg,client)
            break;
        default:
            break;
    }
   }catch(e){
       console.log(e);
   }

})

client.once('ready', () =>{
    client.user.setPresence({ activity: { name: 'for !',type: 'WATCHING' }, status: 'online' })
        .catch(console.error);
    console.log('Ready')
});


client.login(process.env.BOT_TOKEN);
