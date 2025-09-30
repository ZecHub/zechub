const Engine = require('./engine.interface');
const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder, Events, REST, Routes } = require('discord.js');
const QRCode = require('qrcode');

class DiscordEngine extends Engine {
    async start(ua) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.MessageContent,
            ]
        });

        // Store unified address
        this.address = ua;

        // Register global slash command: /address
        this.client.once(Events.ClientReady, async() => {
            const rest = new REST({ version: '10'}).setToken(this.cfg.token);
            const commands = [
                {name: 'address', description: 'Show the shielded address + QR Code'},
            ];
            await rest.put(
                Routes.applicationCommands(this.client.user.id),
                    { body: commands }                    
            );
            console.log('DISCORD SLASH COMMAND REGISTERED');
        });

        //Handle slash command
        this.client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
            if (interaction.commandName !== 'address') return;

            try {
                const png = await QRCode.toBuffer(this.address, {
                    errorCorrectionLevel: 'M',
                    type: 'png',
                    margin: 1,
                    scale: 6,
                });
                const file = new AttachmentBuilder(png, {name:'zec-address.png'});

                const embed = new EmbedBuilder()
                .setColor(0xf4b728)
                .setTitle('Send a Shieled Zcash memo')
                .setDescription('Please send your message through the **Shielded Zcash address** below. The Memo will be replicated on all supported platforms.')
                .setImage('attachment://zec-address.png');

                await interaction.reply({
                    embeds: [embed],
                    files: [file],
                    ephemeral: true, // true ephemeral
                });                
            } catch (err) {
                console.error('Slash command error', err);
            if(!interaction.replied) {
                await interaction.reply({ content: 'Error generating QR.', ephemeral: true});
            }
        }
        
        // Fetch and store channel id
        try {
            this.channel = await this.client.channels.fetch(this.cfg.channelId);
        } catch(err){
            console.error('Fetch channel error:', err);
            }
            console.log('Discord engine ready');
        });
        await this.client.login(this.cfg.token);
    }

    async post(message, value, txid) {
        if (!this.channel) throw new Error('Discord engine not started');
        const msgEmbed = new EmbedBuilder()
        .setColor(0xf4b728)
        .setAuthor({name: this.client.user.username, iconURL: this.client.user.avatarURL()})
        .addFields([
            {name: 'Value', value: `${value /10**8} ZEC`, inline: false},
            {name: 'Transaction ID', value: `[🔗${txid}](https://mainnet.zcashexplorer.app/transactions/${txid})`, inline: false},    
            {name: 'Message', value: `${message}`, inline: false},
        ]);

        await this.channel.send({embeds:[msgEmbed]});
    }
}

module.exports = DiscordEngine;