var express = require('express');
var router = express.Router();
const DiscordController = require('../helpers/discord');
const NotionUtils = require('../helpers/notion');

/* GET Index page. */
router.get('/', (req, res) => {
	res.json({status: true})
});

router.post('/alert', async(req, res) => {
	const {title, description} = req.body;
	const response = await NotionUtils.setNewAlert(title, description);
	//console.log(response)
    res.send(response);
});

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