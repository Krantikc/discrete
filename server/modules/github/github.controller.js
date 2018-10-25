const GithubService = require('./github.service');

class GithubController {

  listGITUsers(req, resp) {
    return GithubService.listGITUsers(req, resp);
  }
  
  listGITUserRepos(req, resp) {
    return GithubService.listGITUserRepos(req, resp);
  }
}

module.exports = new GithubController();
