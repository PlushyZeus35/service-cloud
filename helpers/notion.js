const NotionUtils = {}
const { Client, LogLevel } = require('@notionhq/client');
const {API_KEY, NOTION_ALERT_DB} = require('../config');
const notion = new Client({ auth: API_KEY.NOTION, logLevel: LogLevel.DEBUG });

NotionUtils.setNewAlert = (title, description) => {
    const parentDatabase = {
		type: 'database_id',
		database_id: NOTION_ALERT_DB
	}
	const properties = {
		'Alerta': {
		  type: 'title',
		  title: [
			{
			  type: 'text',
			  text: {
				content: title,
			  },
			},
		  ],
		},
		'Descripcion': {
			"rich_text": [
                {
                    "text": {
                        "content": description
                    }
                }
            ]
		}
	}
    
    
    return notion.pages.create({
          parent: parentDatabase,
          properties: properties
    });
        
}

NotionUtils.getNotionTecnicTickets = () => {
	const filter = {
		property: "Tecnica",
		checkbox: {
		  equals: true,
		},
	}
	return notion.databases.query({
		database_id: NOTION_ALERT_DB,
		filter: filter
	  })
}

NotionUtils.updateTicketIssueId = (pageId, issueId) => {
	return notion.pages.update({
		page_id: pageId,
		properties: {
		  IssueID: {
			rich_text: [{text: {content: issueId.toString()}}],
		  },
		},
	  });
}

module.exports = NotionUtils;