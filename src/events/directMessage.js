
const userTickets = new Map();
const { MessageEmbed } = require("discord.js");
const accept = "858351578472775700";
const decline = "858351578238025729";

module.exports = {
  name: "directMessage",
  async execute(message, client, m) {
    if (message.author.bot) return;


    if (!userTickets.has(message.author.id)) {
      await message.react("✅");
      const e = new MessageEmbed()
      .setDescription(`Hello ${message.author.username}! While you wait for the developer to get back to you feel free to check out my website!`)
      .addFields({
          name: 'Links',
          value: `[Website](https://kojadb.net) | Invite `
      })
        .setColor(m)

      message.channel.send(`**${message.author.username}**, Your report has been sent to the developer.`,e);

      userTickets.set(message.author.id, message.guild);

  
            //Getting the guild id.
            const guildID = client.guilds.cache.get("858341609543303228");
            const channel = await guildID.channels.create(`${message.author.tag}`); 
            channel.setParent("858714247911440384");

      if (channel) {
        const embed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setDescription(message.content)
          .setColor(m);
     const msg = await channel.send(embed)

                await msg.react(accept);
                await msg.react(decline)

                try {
                    const reactionFilter = (reaction, user) => [accept, decline].includes(reaction.emoji.id) && !user.bot;
                    const reactions = await msg.awaitReactions(reactionFilter, { max: 1, time: 36e+6, errors: ['time'] });
                    const choice = reactions.get(accept) || reactions.get(decline);
                    if (choice.emoji.id === accept) {
                        channel.send(`Report accpeted.`)
                        await handlerCollectors(channel, message);
                        userTickets.delete(message.author.id)
                    } else if (choice.emoji.id === decline) {
                        channel.delete();
                        message.author.send("Your report has been denied.");
                        setTimeout(() => {
                            userTickets.delete(message.author.id);
                        }, 30000)
                    }
                } catch (err) {
                    console.log(err)
                    message.author.send('The developer has not responsed to your report. Please wait 30 seconds before sending another report.');
                    userTickets.delete(message.author.id)
                }
      } else {
        message.channel.send(
          `**${message.author.username}**,something went wrong. Please contact a staff member.`
        );
        userTickets.delete(message.author.id);
      }
    }
  },
};

function handlerCollectors(channel, message) {
  const filter = (m) => m.author.id === message.author.id;
  const guildChannelCollectorFilter = (m) =>
    m.channel.id === channel.id && !m.author.bot;
  const dmCollector = message.channel.createMessageCollector(filter);
  const guildChannelCollector = channel.createMessageCollector(
    guildChannelCollectorFilter
  );
  return new Promise((resolve, reject) => {
     
        dmCollector.on("collect", async (m) => {
          await m.react("✅") .catch((err) => {return;})
          const sentEmbed = new MessageEmbed()
            .setTitle(`New Report`)
            .setAuthor(m.author.tag, m.author.displayAvatarURL())
            .setDescription(`${m.content}`)
            .setColor(m)
          channel.send(sentEmbed);
        });

        guildChannelCollector.on("collect", async (m) => {
          if (m.content.toLowerCase() === "m*close") {
            guildChannelCollector.stop();
            dmCollector.stop();
            resolve();
            await m.react("✅").catch((err) => {return;})

            message.channel.send(`**${m.author.username}**, Your report has been closed.`).catch((err) => {return;})
            await channel.delete();

          } else {
            await m.react("✅").catch((err) => {return;})
  
            message.channel.send(`**${m.author.tag}:** ${m.content}`).catch((err) => {return;})
          }
        });
  });
}


