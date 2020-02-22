const { Octokit } = require("@octokit/rest");
const { secret } = require("./credentials");
const octokit = new Octokit({
  auth: secret,
  userAgent: "GithubApiPlayground"
});

octokit.pulls
  .list({
    owner: "L4B0MB4",
    repo: "acwj"
  })
  .then(function(res) {
    res.data.forEach(element => {
      octokit.pulls
        .get({
          owner: "L4B0MB4",
          repo: "acwj",
          pull_number: element.number
        })
        .then(function(pull) {
          console.log(pull.data.merged);
          console.log(pull.data.created_at);
        });
    });
  });

octokit.issues
  .listForRepo({
    owner: "sprinteins",
    repo: "ghost"
  })
  .then(issues => {
    octokit.issues
      .get({
        issue_number: issues.data[20].number,
        owner: "sprinteins",
        repo: "ghost"
      })
      .then(issue => {
        console.log(issue.data.body);
        console.log(issue.data.title);
      });
  });
