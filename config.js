require('dotenv').config();
module.exports = {
    API_KEY: {
        NOTION: process.env.NOTION_API_KEY,
        DISCORD: process.env.DISCORD_BOT_TOKEN,
        GITHUB: process.env.GITHUB_PERSONAL_TOKEN
    },
    NOTION_ALERT_DB: process.env.NOTION_DB_ID,
    DISCORD_ROOMS: {
        GENERAL: '',
        ALERTS: '',
        COMMENTS: ''
    },
    DISCORD_ID: '1093591381034938388',
    GITHUB: {
        USER: 'PlushyZeus35',
        REPOSITORY: 'service-cloud'
    }
}