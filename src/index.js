
import { Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv'

import { cron_setup } from './cron_setup.js';
import { functions } from './functions.js';

dotenv.config({path: "../.env"});

export const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        
    ],
});

client.on('ready', (c) => {
    console.log(`botalau ${c.user.tag} functioneste`);

    const channel = client.channels.cache.get('969264040541028422')
    if(channel) {
        channel.send({
            content: `Functionez`,
            files: [{
                attachment: '../start.jpg'
            }]
        })
    }
});

cron_setup.init()

export let muted_users = [];

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return;

    let command = msg.content.split(' ')[0].toLowerCase();    
    console.log(`Command: ${command}, user: ${msg.author.displayName}`);

    
    functions.forEach(({call_name, callback, description}) => {
        if(command === call_name) callback(msg);
    }) 
    
    if(muted_users.includes(msg.author.id)) {
        try {
            return await msg.delete();
        }
        catch(err) {
            return msg.reply("S a futu cv")
        }
    }

});

client.login(process.env.DISCORD_TOKEN);
