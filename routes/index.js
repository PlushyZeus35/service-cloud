var express = require('express');
var router = express.Router();
const DiscordController = require('../helpers/discord');
const NotionUtils = require('../helpers/notion');
const GithubUtils = require('../helpers/github')

/* GET Index page. */
router.get('/', (req, res) => {
	res.json({status: true})
	GithubUtils.createIssue('tEST2 ASF', 'DESCRIPCION DEL ISSUE');
});

router.post('/alert', async(req, res) => {
	const {title, description} = req.body;
	const response = await NotionUtils.setNewAlert(title, description);
	//console.log(response)
    res.send(response);
});

router.post('/issue', async(req, res) => {
	const {title, description} = req.body;
	const response = await GithubUtils.createIssue(title, description);
	res.json(response);
})

router.get('/syncIssues', async(req, res) => {
	const created = [];
	const tickets = await NotionUtils.getNotionTecnicTickets();
	const result = tickets.results;
	for(const ticket of result){
		// Retrieve info form notion ticket
		const ticketId = ticket.id;
		const githubIssueId = ticket.properties.IssueID.rich_text;
		const ticketTitle = ticket.properties.Alerta.title[0].text.content;
		const ticketDescription = ticket.properties.Descripcion.rich_text[0].text.content;
		// Github issue property is empty
		if(githubIssueId.length==0){
			// Create issue in Github
			const githubIssue = await GithubUtils.createIssue(ticketTitle, ticketDescription, ['Notion']);
			const githubUrl = githubIssue.data.html_url;
			// Issue creation successful
			if(githubIssue.status==201){
				// Update Notion record with issue number
				const issueId = githubIssue.data.number;
				await NotionUtils.updateTicketIssueId(ticketId, issueId);
				// Send message to Discord
				DiscordController.sendQuote(issueId, githubUrl, ticketTitle, ticketDescription);

				const newTicket = {
					title: ticketTitle,
					description: ticketDescription,
					githubIssue: issueId,
					githubUrl: githubUrl
				}
				created.push(newTicket);
			}
		}
	}
	res.json(created)
})

router.get('/discord', async (req, res) => {
	console.log('ds');
	DiscordController.sendEmbedMessage();
	res.json({status: true})
})

router.get('/discord/quote', async (req, res) => {
	console.log('ds');
	DiscordController.sendQuote();
	res.json({status: true})
})

router.post('/interaction', (req, res) => {
	const { type, data } = req.body;
  
	if (type === 1) {
	  // Button click interaction
	  const customId = data.custom_id;
	  // Handle the interaction based on the customId
  
	  // Respond to the interaction
	  res.status(200).json({
		type: 1, // Type 1 represents acknowledging the interaction
	  });
	} else {
	  // Handle other interaction types if needed
  
	  // Respond to the interaction
	  res.status(200).json({
		type: 1, // Type 1 represents acknowledging the interaction
	  });
	}
  });

router.post('/issue', async (req, res) => {
  const {title, description} = req.body;
  console.log({title, description});
  NotionUtils.setNewAlert(title, description);
  res.json({status: true})
})
  

module.exports = router;