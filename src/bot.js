require('dotenv').config();

const { Client, Message } = require('discord.js');
const client = new Client();
const PREFIX = '!';

// Movie DB
const mdb = require('moviedb')('process.env.TMDB_TOKEN');

//Letterboxd
const lb = require('letterboxd-search');

client.on('ready', () =>{
    console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) => {
    if (message.author.bot) return; 
    console.log(message.content);
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        if (CMD_NAME === 'mdb'){
            if (args.length === 0) return message.reply('Welchen Film suchst du?');
            const msg = args.join(' ');

            lb.search(msg)
            .then(film => {
                console.log(film);
                const filmObjToString = JSON.stringify(film);

                const toJSONFilm = JSON.parse(filmObjToString);
                
                console.log(toJSONFilm.url)

                message.reply(toJSONFilm.url)
            })
            .catch(err => {
                console.error(err);
                message.reply('Film nicht gefunden.')
            });

        };
    }
});



client.login(process.env.DISCORDJS_BOT_TOKEN);