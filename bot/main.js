const Discord = require('discord.js');
const client = new Discord.Client();
var widgets = [
  "button",
  "tab"
];

const prefix = '!';


client.once('ready',() =>{
  console.log('Flutterer is online');
});


client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command == 'w'){
    message.channel.send(widgets);
  }
})





client.login("NjEzMzkyOTU4MTQ5ODg1OTUy.XVwQtQ.kkE_3b9unLdUF9J-vxEk7UTt7So");


