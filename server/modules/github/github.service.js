const bcrypt = require('bcrypt');
const Joi = require('joi');
const fetch = require("node-fetch");
const config = require('../../config/config');

class GithubService {
    
    async listGITUsers(req, resp) {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 100;
      const url = `https://api.github.com/users?since=${((page*pageSize)+1)}&per_page=${pageSize}&client_id=${config.clientID}&client_secret=${config.clientSectret}`;
      const response = await fetch(url);
      const users = await response.json();
      return resp.json(users);
    }
    
    async listGITUserRepos(req, resp) {
      let repos = [];
      const username = req.params.username;
      const url = `https://api.github.com/users/${username}/repos?client_id=${config.clientID}&client_secret=${config.clientSectret}`;
      const response = await fetch(url);
      repos = await response.json();
      return resp.json(repos);
    }
}

module.exports = new GithubService();