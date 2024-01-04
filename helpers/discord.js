const { Client,  GatewayIntentBits, ActionRowBuilder, ButtonBuilder, REST, Routes, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
});

const {DISCORD_COMMANDS} = require('../dsCommands');

const {API_KEY, DISCORD_ID} = require('../config');
const DiscordController = {};

const TOKEN = API_KEY.DISCORD; // Reemplaza con tu propio token de bot

/*
  Initialization method
*/
client.once('ready',async () => {

  const rest = new REST({ version: '10' }).setToken(TOKEN);
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(DISCORD_ID), { body: DISCORD_COMMANDS });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
  console.log(`Bot está listo como ${client.user.tag}`);
});

DiscordController.sendQuote = async function(issueId, issueLink, issueTitle, issueDescription){
	description = 'Se ha abierto la incidencia #' + issueId + ' en Github!'
	const embed = new EmbedBuilder()
	.setColor('#ff0000')
	.setTitle('Nueva incidencia')
	.setAuthor({ name: 'Service Cloud', iconURL: 'https://imgur.com/bw862LX.jpeg', url: 'https://github.com/PlushyZeus35/service-cloud' })
	.setThumbnail('https://imgur.com/bw862LX.jpeg')
	.setURL(issueLink)
	.setDescription(description)
	.addFields(
		{ name: 'Titulo', value: issueTitle },
		{ name: 'Descripción', value: issueDescription },
	)
	const channel = await client.channels.fetch('850879796401405952'); // Reemplaza con el ID del canal
  	await channel.send({ embeds: [embed] });
}

const wait = require('node:timers/promises').setTimeout;

// Iniciar el bot
client.login(TOKEN).then(() => {
	console.log("LOGIN succesful")
});


module.exports = DiscordController;