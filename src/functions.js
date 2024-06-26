import { get_rng, details, calculateMsToString, gay_images} from './data.js'; 
import { muted_users, client } from './index.js';

async function use_fetch(url) {
    try {
        const resp = await fetch(url);
        const data = await resp.json();

        return data;
    }
    catch(err) {
        console.log(err);
        return "error ";
    }
}

function help(msg) {
    let str = '=== HELP ===\n';
    
    functions.forEach(({description, syntax, call_name}) => {
        str += `${call_name} ➡` + "```" + syntax + "```" + `${description}\n\n`
    })

    msg.reply(str);
}

function active_time(msg) {
    const str = calculateMsToString().string;
    if(str)
        msg.reply(`Active for ${str}`)
    else {
        msg.reply('Just started')
    }
}

function pacanea(msg) {
    let arr = msg.content.split(' ');
    arr.shift()

    if(arr.length == 0) return msg.reply('N ai pus nika');
    msg.reply(`Pacaneaua a decis ${arr[Math.floor(Math.random() * arr.length)]}`);
}

function rng(msg) {
    let arr = msg.content.split(' ');
    arr.shift()

    if(arr.length == 0) return msg.reply('N ai pus nika');
    msg.reply(`Pacaneaua a decis ${arr[Math.floor(Math.random() * arr.length)]}`);
}

function gaymeter(msg) {
    const rng = get_rng(100);
        let idx = 0;
        
        switch(rng) {
            case rng >= 21 && rng < 40:
                idx = 1;
            break;
            case rng >= 41 && rng < 60:
                idx = 2;
            break;
            case rng >= 61 && rng < 80:
                idx = 3;
            break;
            case rng >= 81 && rng < 90:
                idx = 4;
            break;
            case rng >= 91 && rng < 99:
                idx = 5;
            break;
            case rng >= 99 :
                idx = 6;
            break;
        }

        msg.reply({
            content: `Esti ${rng}% gay`,
            files: [{
                attachment: gay_images[idx]
            }]
        })
}

async function futel(msg) {
    let arr = msg.content.split(' ');
        arr.shift()

        async function get_voice_channels_ids() {
            const guild = await client.guilds.fetch(details.SERVER_ID);
            const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).map(channel => channel.id);
    
            return voiceChannels;
        }

        if(arr[0] === `<@${details.MY_ID}>`) return msg.reply("Este administator 🤓");

        const voiceIds = await get_voice_channels_ids();
        
        let user_id = arr[0].slice(2, -1);

        try {
            const guild = await client.guilds.fetch(details.SERVER_ID);
            const user = await guild.members.fetch(user_id);
            
            if(user.voice.channel) {
                msg.reply(`Incepe violul pt <@${user.id}>`)
                voiceIds.forEach(async (channelId) => {
                    try {
                        await user.voice.setChannel(channelId);
                    }
                    catch(err) {
                        return msg.reply(`Nu e in voice`)
                        
                    }
                })
            }else {
                msg.reply(`<@${user.id}> nu e in voice`);
            }
        }   
        catch(err) {
            msg.reply("Nu i bun useru");
        }
}

async function dami(msg) {
    let arr = msg.content.split(' ');
        arr.shift()

        let count = arr[1];
        if(!isNaN(count))  {
            if(count > 5) {
                msg.reply('ABUZ !')
                count = 1;
            }else {
                Number(arr[1])
            }
            
        }else {
            count = 1;
        }
        
        async function get_duck() {
            const data = await use_fetch('https://random-d.uk/api/random')

            sendImage(data.url)
        }

        async function get_cat() {
            const data = await use_fetch('https://api.thecatapi.com/v1/images/search')
            await fetch('https://api.thecatapi.com/v1/images/search').

            sendImage(data[0].url);
        }

        async function get_dog() {
            const data = await use_fetch('https://dog.ceo/api/breeds/image/random')
            await fetch('https://api.thecatapi.com/v1/images/search').

            sendImage(data.message);
        }

        async function get_fox() {
            const data = await use_fetch('https://randomfox.ca/floof/')

            sendImage(data.message);
        }

        async function get_anime(category) {
            const data = await use_fetch(`https://api.waifu.pics/${category.split('-')[1]}/waifu`)

            sendImage(data.url);
        }
        
        async function sendImage(url) {
            const message = await msg.reply({
                files: [{
                    attachment: url
                }],
                fetchReply: true
            });
            
            message.react("1️⃣")
            message.react("2️⃣")
            message.react('3️⃣')
            message.react("4️⃣")
            message.react('5️⃣')
            message.react('6️⃣')
            message.react('7️⃣')
            message.react('8️⃣')
            message.react('9️⃣')
            message.react('🔟')
        }
        let ammount = Number(arr[1])
        if(!isNaN(ammount) && ammount > 1) {
            if(ammount > 10) return msg.reply("Abuz")
            let count = 0;

        const interval = setInterval(() => {
            if(count >= ammount) return clearInterval(interval)
                count++;
                msg.channel.send(`Imaginea ${count}, votati`)
                return_img(arr[0])
                if(count !== ammount - 1) msg.channel.send("Vine alta in 10 secunde...")
            }, 20000);


        }else if(!arr[1]) {
            return_img(arr[0])
        }else {
            msg.reply("Invalid parameters...")
        
        }
    
        function return_img(cat) {
            switch(cat) {
                case "pisica":
                    get_cat();
                break;
    
                case "rata":
                    get_duck();
                break;
    
                case "caine":
                    get_dog();
                break;
    
                case "vulpe":
                    get_fox();
                break;
    
                case "anime-nsfw":
                    get_anime(cat);
                break;
    
                case "anime-sfw":
                    get_anime(cat);
                break;
                
                default:
                    msg.reply("Nu avem");
                break;
            }
        }

        msg.reply("Poftiti domnule");
        
}

function adunarea(msg) {
    const ids = details.important_members
    let arr = msg.content.split(' ');
    arr.shift()

    ids.filter((id) => id != msg.author.id).forEach((id) => msg.channel.send(`${arr[0]} <@${id}>`))
}

async function funnymonke(msg) {
    let arr = msg.content.split(' ');
        arr.shift()
        
        const guild = await client.guilds.fetch(details.SERVER_ID);
        const user = await guild.members.fetch(msg.author.id);

        let channel = await client.channels.fetch(user.voice.channelId);
        
        if(arr[0]) channel = await client.channels.fetch(arr[0]);

        if(channel && channel.isVoiceBased()) {
            const members = channel.members;
            const userIds = members.map(member => member.id).filter((id) => id !== details.MY_ID)

            const rng_user_id = userIds[get_rng(userIds.length)]
            let kick_user = await guild.members.fetch(rng_user_id);
            kick_user.voice.setChannel(null);

            msg.reply("funny monke");
        }
}

async function poll(msg) {
    let arr = msg.content.split(' ');
        arr.shift()

        let poll_name = arr.join(" ")

        const message = await msg.reply({ content: poll_name, fetchReply: false });
        message.react("✅")
        message.react("❌")
}

function mute(msg) {
    let arr = msg.content.split(' ');
        arr.shift()

        let user_id = arr[0].slice(2, -1);
        let remove = arr[1] ? arr[1].trim() : '';
        
        if(remove === 'revoke') {
            if(muted_users.includes(msg.author.id) && user_id !== details.MY_ID) return msg.delete();

            muted_users = muted_users.filter((id) => id !== user_id);
            return msg.reply("Recapatare drepturi")
        }

        if(!user_id) {
            return msg.reply("N ai pus user")
        }

        msg.reply("Pierdere drepturi")
        if(!muted_users.includes(user_id)) muted_users.push(user_id)

}

function spam(msg) {
    let arr = msg.content.split(' ');
    arr.shift()

    let message = arr[0];
    let count = Number(arr[1]) || 1;

    

    for(let i = 0; i < count; i++) {
        msg.channel.send(message);
    }
}


export const functions = [
    {
        call_name: "help",
        callback: help,
        description: "returs a list of available commands",
        syntax: "help"
    },
    {
        call_name: "active-time",
        callback: active_time,
        description: "returns the time since the bot is runnng",
        syntax: "active-time"
    },
    {
        call_name: "pacanea",
        callback: pacanea,
        description: "returns a random values from the ine send by the user",
        syntax: "pacanea [lista cu iteme separate prin spatiu]"
    },
    {
        call_name: "rng",
        callback: rng,
        description: "returns a random number between the given range",
        syntax: "rng [min (optional) ] [max]"
    },
    {
        call_name: "gaymeter",
        callback: gaymeter,
        description: "returns the gayism level of the user",
        syntax: "gaymeter"
    },
    {
        call_name: "futel",
        callback: futel,
        description: "spam the user through all voice channels",
        syntax: "futel [user tag]"
    },
    {
        call_name: "dami",
        callback: dami,
        description: "returns an image with rating buttons 1-10",
        syntax: "dami [caine, pisica, vulpe, anime-nsfw, anime-sfw] [count <= 15]"
    },
    {
        call_name: "adunarea",
        callback: adunarea,
        description: "calls the members of the server for a meeting",
        syntax: "adunarea [message]"
    },
    {
        call_name: "funnymonke",
        callback: funnymonke,
        description: "disconnects a random user form the voice channel",
        syntax: "funnymonke [channel id]"
    },
    {
        call_name: "poll",
        callback: poll,
        description: "creates a poll for the members to vote",
        syntax: "poll [message]"
    },
    // {
    //     call_name: "mute",
    //     callback: mute,
    //     description: "mutes an user",
    //     syntax: "mute [user tag] [revoke]"
    // },
    {
        call_name: "spam",
        callback: spam,
        description: "spam a message",
        syntax: "spam [message] [count]"
    },   
]