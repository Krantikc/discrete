const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../modules/user/user.controller');

const { GithubController } = require('../modules/github');
const router = express.Router();
module.exports = router;

router.get('/users', GithubController.listGITUsers);

router.get('/users/:username/repos', GithubController.listGITUserRepos);

