var express = require('express');
var router = express.Router();

var sessionManager = require('../objects/sessionManager')
var utils = require('../objects/utils')

var errorNo = 501;

router.get('/', function(req, res) {
  var queryEvent = utils.getRequestQueryEvent(req, res, errorNo);
  if (!queryEvent) return;
  var event = JSON.parse(queryEvent);
  var sessionId = utils.getEventSessionId(event, res, errorNo);
  if (!sessionId) return;
  var isLogout = sessionManager.logout(sessionId);
  if (!isLogout) {
	  res.status(errorNo).json(utils.getJsonError(errorNo, 'unknown session id'));
	  return;
  }
  var keySessionId = utils.eventSessionId;
  res.json(utils.getJsonStatusOk());
});

module.exports = router;
