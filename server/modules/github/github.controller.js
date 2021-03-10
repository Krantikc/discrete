const GithubService = require('./github.service');

class GithubController {

  listGITUsers(req, resp) {
    return GithubService.listGITUsers(req, resp);
  }
  
  listGITUserRepos(req, resp) {
    return GithubService.listGITUserRepos(req, resp);
  }

  listGITUserReposByQuery(req, resp) {
    return GithubService.listGITUserReposByQuery(req, resp);
  }
}

module.exports = new GithubController();
