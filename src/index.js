
import { Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        
    ],
});

const SERVER_ID = '689569910141091876';

client.on('ready', (c) => {
    console.log(`botalau ${c.user.tag} functioneste`);

    const channel = client.channels.cache.get('994337722552549466')
    if(channel) {
        channel.send({
            content: `Functionez`,
            files: [{
                attachment: '../start.jpg'
            }]
        })
    }
  
});



client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return;

    let command = msg.content.split(' ')[0].toLowerCase();
    console.log(`Command: ${command}, user: ${msg.author.displayName}`);
    
    function get_rng(range, floor = true) {
        if(floor)
            return Math.floor(Math.random() * range);
    
        return Math.random() * range;
    }


    if(command === 'help') {

        const commands = [
            "help", 
            'pacanea [lista jocuri separate prin spatiu]', 
            "rng [min optional] [max]", 
            "gaymeter",
            "futel [user]",
            "pisica",
            "adunarea",
            "dami [pisica, caine, rata, vulpe, anime-nsfw, anime-sfw] [count (max 5)]",
        ]

        let str = '+-----------COMMANDS-----------+\n';
        commands.forEach((command) => {
            str += `➡ ${command}\n`
        })
        str += '+---------------------------------+'
        msg.reply(str);
    };

    if(command === 'pacanea') {
        let arr = msg.content.split(' ');
        arr.shift()

        if(arr.length == 0) return msg.reply('N ai pus nika');
        msg.reply(`Pacaneaua a decis ${arr[Math.floor(Math.random() * arr.length)]}`);
    }

    if(command === 'rng') {
        // get params
        let arr = msg.content.split(' ');
        arr.shift()

        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let n1 = Number(arr[0]);
        let n2 = Number(arr[1]);

        if(arr.length === 0) return msg.reply('N ai pus limite');

        if(arr.length === 1) return msg.reply(    
            Math.floor(Math.random() * n1).toString()
        );
        
        if(arr.length >= 2) return msg.reply(
            randomIntFromInterval(n1, n2).toString()
        );
    }

    if(command === 'gaymeter') {
        const rng = get_rng(100);
        let idx = 0;
        const gay_images = [
            "https://i.pinimg.com/736x/25/17/a1/2517a1621222cbcae5929033803ab285.jpg", // 0 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 1,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 2,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 3,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 4,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSa7WAb9Mr5fAAMxa1ymUiuDzodx_iYHFZA&s", // 5,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFD43stXr5qQjjUh29GMx04TcLjd-P9B11w&s", // 6
        ]
        
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

    if(command === 'futel') {
        let arr = msg.content.split(' ');
        arr.shift()

        async function get_voice_channels_ids() {
            const guild = await client.guilds.fetch(SERVER_ID);
            const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).map(channel => channel.id);
    
            return voiceChannels;
        }

        if(arr[0] === '<@375320688669491200>') return msg.reply("Este administator 🤓");

        const voiceIds = await get_voice_channels_ids();
        
        let user_id = arr[0].slice(2, -1);

        try {
            const guild = await client.guilds.fetch(SERVER_ID);
            const user = await guild.members.fetch(user_id);
            
            if(user.voice.channel) {
                msg.reply(`Incepe violul pt <@${user.id}>`)
                voiceIds.forEach(async (channelId) => {
                    try {
                        await user.voice.setChannel(channelId);
                    }
                    catch(err) {
                        msg.reply(`Error, stutdown`)
                        return ''
                    }
                })
            }else {
                msg.reply(`<@${user.id}> nu e in voice`);
            }
        }   
        catch(err) {
            msg.reply("Nu i bun useru ");
        }
        
    }

    if(command === 'dami') {
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
            await fetch('https://random-d.uk/api/random').then((resp) => resp.json()).then((x) => {
                msg.reply({
                    files: [{
                        attachment: x.url
                    }]
                })
            })
            .catch((err) => {
                console.log(err);
                msg.reply("S-a futut API");
            })
        }

        async function get_cat() {
            await fetch('https://api.thecatapi.com/v1/images/search').then((resp) => resp.json()).then((x) => {
                msg.reply({
                    files: [{
                        attachment: x[0].url
                    }]
                })
            })
            .catch((err) => {
                console.log(err);
                msg.reply("S-a futut API");
            })
        }

        async function get_dog() {
            await fetch(' https://dog.ceo/api/breeds/image/random').then((resp) => resp.json()).then((x) => {
                msg.reply({
                    files: [{
                        attachment: x.message
                    }]
                })
            })
            .catch((err) => {
                console.log(err);
                msg.reply("S-a futut API");
            })
        }

        async function get_fox() {
            await fetch('https://randomfox.ca/floof/').then((resp) => resp.json()).then((x) => {
                msg.reply({
                    files: [{
                        attachment: x.image
                    }]
                })
            })
            .catch((err) => {
                console.log(err);
                msg.reply("S-a futut API");
            })
        }

        async function get_anime(category) {
            await fetch(`https://api.waifu.pics/${category.split('-')[1]}/waifu`).then((resp) => resp.json()).then((x) => {
                msg.reply({
                    files: [{
                        attachment: x.url
                    }]
                })
            })
            .catch((err) => {
                console.log(err);
                msg.reply("S-a futut API");
            })
        }
        
        for(let i = 0; i < count; i++) {
            switch(arr[0]) {
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
                    get_anime(arr[0]);
                break;
    
                case "anime-sfw":
                    get_anime(arr[0]);
                break;
                
                default:
                    msg.reply("Nu avem");
                break;
            }

            msg.reply("Poftiti domnule");
        }


    }    

    if(command === 'adunarea') {
        const ids = [
            '375320688669491200',
            '759830191311945769',
            '493858296785272875',
            "232085801737912320",
        ]

        ids.filter((id) => id != msg.author.id).forEach((id) => msg.channel.send(`hai <@${id}>`))
    }

    if(command === "bancuri") {
        const bancuri = [];
    }

    if(command === "") {

    }
});


client.login(process.env.DISCORD_TOKEN);
