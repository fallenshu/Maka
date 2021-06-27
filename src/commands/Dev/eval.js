
const Discord = require("discord.js")


module.exports = {
    name: 'eval',
    ownerOnly: true,
    desc: 'Run code through the bot.',
    category: 'OwnerOnly',
     async execute(message, client, args, p, m) {

            message.delete()
        const input = args.join(' ');
        if (!input) return message.channel.send(`Please supply me something to run!`)
        if(!input.toLowerCase().includes('token')) {

          try {
             eval(input);
    
          } catch(err) {
            message.channel.send(`\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
          }
  
    
        } else {
          message.channel.send('Cant send any messages that involve my token!');
        }
      
    }
}
