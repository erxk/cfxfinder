const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, MessageAttachment  } = require('discord.js');
const bot = new Discord.Client()
const fetch = require("node-fetch")
const https = require("https")

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login("")

bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'coded by ervk#0001',
            type: "PLAYING"
        }
    });
});

bot.on('message', msg => {
    
    if(msg.content.startsWith("?cfind")){

        const args3 = msg.content.slice("?cfind".length).split(' ');

        var code = args3[1]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        https.get(urlfivem, function(res) {
            if(res.statusCode == 404){

                const emb = new Discord.MessageEmbed()
                .setColor("#cc0000")
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter("by ervk#0001")
                msg.channel.send(emb);

            }else{
                fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {
                    
                    if(!out["Data"]["connectEndPoints"][0].startsWith("http")){
        
                        var split =  `${out["Data"]["connectEndPoints"][0]}`.split(":")
                        var urlip = "http://ip-api.com/json/"+split[0]
                        fetch(urlip)
                        .then(res => res.json())
                        .then((out2) => {
                        
                        if(out["icon"]){
                            var icon = out2["icon"]
                            let file = new Buffer.from(icon, 'base64')
                            const att = new Discord.MessageAttachment(file, "graph.png")
                            const mensaje = new Discord.MessageEmbed()

                            .setColor("#c73e10")
                            .setAuthor(msg.author.tag, msg.author.avatarURL())
                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n FX-Artifacts: \`${out["Data"]["server"]}\`\n Resource Count: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter("Galaxy Finderino")
                            .setThumbnail("attachment://graph.png")
                            .attachFiles(att)

                            msg.channel.send(mensaje);
                        }else{
                            const mensaje = new Discord.MessageEmbed()
                            .setColor("#c73e10")
                            .setAuthor(msg.author.tag, msg.author.avatarURL())
                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n FX-Artifacts: \`${out["Data"]["server"]}\`\n Resource Count: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter("by ervk#0001")
                            msg.channel.send(mensaje);
                        }
                        
                    
                        })
        
                    }else{
                        const emb = new Discord.MessageEmbed()
                        .setColor("#cc0000")
                        .setAuthor(msg.author.tag, msg.author.avatarURL())
                        .setDescription("```\n Server details not found...```")
                        .addField("Cfx Url", `\`${out["Data"]["connectEndPoints"][0]}\``)
                        .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n FX-Artifacts: \`${out["Data"]["server"]}\`\n Resource Count: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                        .setFooter("by ervk#0001")
                        msg.channel.send(emb);
                    }
                })
            }
        
        })
    }
})