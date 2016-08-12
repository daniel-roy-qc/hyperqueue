var express = require('express');
var router = express.Router();

var sessionManager = require('../objects/sessionManager')
var queueManager = require('../objects/queueManager')
var utils = require('../objects/utils')

var errorNo = 501;

router.get('/', function(req, res) {
  var queryEvent = utils.getRequestQueryEvent(req, res, errorNo);
  if (!queryEvent) return;
  var event = JSON.parse(queryEvent);
  var sessionId = utils.getEventSessionId(event, res, errorNo);
  if (!sessionId) return;
  var session = sessionManager.find(sessionId);
  if (!session) {
	  res.status(errorNo).json(utils.getJsonError(errorNo, 'unknown session id'));
	  return;
  }
  var command = utils.getEventCommand(event, res, errorNo);
  if (!command) return;
  var resultat = queueManager.put(command, session.user);
  if (resultat.error) return resultat;
  res.json(utils.getJsonStatusOk());
});

module.exports = router;
