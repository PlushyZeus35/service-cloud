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

// Función asincrona para enviar un mensaje
DiscordController.sendTestMessage = async function() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('example_button')
      .setLabel('Click Me')
      .setStyle('Primary'),
      new ButtonBuilder()
      .setCustomId('delete_button')
      .setLabel('Click Me')
      .setStyle('Danger')
  );
  const channel = await client.channels.fetch('850879796401405952'); // Reemplaza con el ID del canal
  await channel.send({ content: 'Click the button below:', components: [row] });
}

DiscordController.sendEmbedMessage = async function(){
	const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		const channel = await client.channels.fetch('850879796401405952'); // Reemplaza con el ID del canal
  		await channel.send({ embeds: [exampleEmbed] });
}

DiscordController.sendQuote = async function(){
	const embed = new EmbedBuilder()
	.setColor('#ff0000')
	.setDescription('<@&772162600275279883> Esto es un ejemplo de quote')
	const channel = await client.channels.fetch('850879796401405952'); // Reemplaza con el ID del canal
  	await channel.send({ embeds: [embed] });
}

/*
  Every message in the discord server execute this method
*/
client.on("messageCreate", async function(message) {
  console.log(message);
  if (message.author.bot) return;
  //?Best practices
  /*if (!message.content.startsWith(prefix)) return;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);              
  }*/
  if(message.content==='!ping'){
    message.reply('Pong!');
  }
  if(message.content==='!interaction'){

  }
});

const wait = require('node:timers/promises').setTimeout;
client.on('interactionCreate', async interaction => {

  //if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
		await wait(2000);
		await interaction.editReply('Pong again!')
	}

	if(interaction.customId === 'example_button'){
		const select = new StringSelectMenuBuilder()
			.setCustomId('starter')
			.setPlaceholder('Make a selection!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Bulbasaur')
					.setDescription('The dual-type Grass/Poison Seed Pokémon.')
					.setValue('bulbasaur'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Charmander')
					.setDescription('The Fire-type Lizard Pokémon.')
					.setValue('charmander'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Squirtle')
					.setDescription('The Water-type Tiny Turtle Pokémon.')
					.setValue('squirtle'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);
		interaction.reply({
			content: 'Choose your starter',
			components: [row]
		})
	}
	if(interaction.customId === 'delete_button'){
		console.log('delete example' + typeof(interaction))
		await interaction.update({
		content: 'Action executed!',
		components: []
		})
	}
	if(interaction.customId === 'starter'){
		console.log("starter");
		console.log(interaction.values[0]);
		interaction.update({
			content: `${interaction.values[0]} selected!`,
			components: []
		})
	}
});

// Iniciar el bot
client.login(TOKEN).then(() => {
	console.log("LOGIN succesful")
});


module.exports = DiscordController;