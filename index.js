const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

const config = require("./config.json");

client.login(config.Token); 
const express = require("express");
const fs = require("fs");
const c = require("colors");
const mongo = require("mongoose");

// SQLite (default) w/ filePath (optional)


client.userdb = require("./src/Database/user.js")
client.serverdb = require("./src/Database/guild.js")
client.MongoConnect = () => mongo.connect(config.database)

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
module.exports = client;
client.slashCommands = new Discord.Collection();
require("./src/handler")(client);
client.categories = fs.readdirSync(`./src/commands/`);
fs.readdirSync('./src/commands/').forEach(local => {
    const comandos = fs.readdirSync(`./src/commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))
    for(let file of comandos) {
        let puxar= require(`./src/commands/${local}/${file}`)
        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
});


                                                      

      process.on('multipleResolves', (type, reason, promise) => {
    console.log(c.red(`🚫 Erro Detectado\n\n` + type, promise, reason))
});
process.on('unhandRejection', (reason, promise) => {
    console.log(c.red(`🚫 Erro Detectado:\n\n` + reason, promise))
});
process.on('uncaughtException', (error, origin) => {
    console.log(c.red(`🚫 Erro Detectado:\n\n` + error, origin))
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(c.red(`🚫 Erro Detectado:\n\n` + error, origin))
});

