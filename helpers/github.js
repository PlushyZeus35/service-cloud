const { Octokit, App } = require("octokit");
const DiscordUtils = {}
const {API_KEY} = require('../config');
const octokit = new Octokit({ auth: API_KEY.GITHUB});
const GITHUB_USER = 'PlushyZeus35';
const GITHUB_REPO = 'service-cloud';

DiscordUtils.createIssue = async (title, description, labels=[]) => {
    return octokit.rest.issues.create({
        owner: GITHUB_USER,
        repo: GITHUB_REPO,
        title: title,
        body: description,
        labels: labels
      });
}

module.exports = DiscordUtils;