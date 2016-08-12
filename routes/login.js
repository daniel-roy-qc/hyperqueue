var express = require('express');
var router = express.Router();

var sessionManager = require('../objects/sessionManager')
var utils = require('../objects/utils')

var errorNo = 501;

router.get('/', function(req, res) {
  var queryEvent = utils.getRequestQueryEvent(req, res, errorNo);
  if (!queryEvent) return;
  var event = JSON.parse(queryEvent);
  var userId = utils.getEventUserId(event, res, errorNo);
  if (!userId) return;
  var sessionId = sessionManager.login(userId);
  if (sessionId === -1) {
	  res.status(errorNo).json(utils.getJsonError(errorNo, 'unknown user id'));
	  return
  }
  var keySessionId = utils.eventSessionId;
  res.json({ keySessionId: sessionId });
});

module.exports = router;
