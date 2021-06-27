const prefixSchema = require("../models/prefix");


module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    const newData = await prefixSchema.create({
      GuildID: guild.id,
      Prefix: "*",
    });


    console.log(`Created data for new guild ${guild.name}`);
  },
};
