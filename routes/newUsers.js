var express = require('express');
var router = express.Router();

var sessionManager = require('../objects/sessionManager')
var utils = require('../objects/utils')

var errorNo = 500;

router.get('/', function(req, res) {
  var queryEvent = utils.getRequestQueryEvent(req, res, errorNo);
  if (!queryEvent) return;
  var event = JSON.parse(queryEvent);
  var userId = utils.getEventUserId(event, res, errorNo);
  if (!userId) return;
  var name = utils.getEventName(event, res, errorNo);
  if (!name) return;
  if (!sessionManager.newUser(userId, name)) {
	  res.status(errorNo).json(utils.getJsonError(errorNo, 'user id is used'));
	  return;
  }
  res.json(utils.createJson(utils.eventKeyUserId, userId));
});

module.exports = router;
