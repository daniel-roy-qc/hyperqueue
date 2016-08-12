/**
 * http://usejsdoc.org/
 */

'use strict';

module.exports = new Utils();

function Utils () {
	// Formatters
	this.createJson = function (key1, value1, key2, value2, key3, value3) {
		var jsonObject = {};
		if (key1) {
			jsonObject[key1] = value1;
		}
		if (key2) {
			jsonObject[key2] = value2;
		}
		if (key3) {
			jsonObject[key3] = value3;
		}
		return jsonObject;
	}
	this.keyError = 'error';
	this.keyNo = 'no';
	this.keyMsg = 'msg';
	this.getJsonError = function (errorNo, errorMsg) {
	  return this.createJson( this.keyError, this.createJson(this.keyNo, errorNo, this.keyMsg, errorMsg));
	}
	this.keyStatus = 'status';
	this.valusStatusNone = 'none';
	this.valusStatusOk = 'ok';
	this.getJsonStatusNone = function () {
		  return this.createJson( this.keyStatus, this.valusStatusNone);
	}
	this.getJsonStatusOk = function () {
		  return this.createJson( this.keyStatus, this.valusStatusOk);
	}
	// Getters/Validators
	this.getRequestQuery = function (req, res, errorNo) {
	  if (!req || !req.query) {
		  res.status(errorNo).json(this.getJsonError(errorNo, 'Programming error: the object must be a HttpRequest'));
		  return;
	  }
	  return req.query;
	}
	this.getRequestQueryEvent = function (req, res, errorNo) {
	  var rq = this.getRequestQuery(req, res, errorNo)
	  if (!rq) return;
	  if (rq.event) return rq.event;
	  res.status(errorNo).json(this.getJsonError(errorNo, 'event token mandatory'));
	  return; // undefined
	}
	this.getEventKeyValue = function (event, key, res, errorNo){
		if (!event[key]){
		  res.status(errorNo).json(this.getJsonError(errorNo, key + ' key is mandatory'));
		  return;
		}
		return event[key];
	}
	// Request Query Events
	this.eventKeyCommand = 'command';
	this.getEventCommand = function (event, res, errorNo){
		return this.getEventKeyValue(event, this.eventKeyCommand, res, errorNo);
	}
	this.eventKeyName = 'name';
	this.getEventName = function (event, res, errorNo){
		return this.getEventKeyValue(event, this.eventKeyName, res, errorNo);
	}
	this.eventKeySessionId = 'sessionid';
	this.getEventSessionId = function (event, res, errorNo){
		return this.getEventKeyValue(event, this.eventKeySessionId, res, errorNo);
	}
	this.eventKeyUserId = 'userid';
	this.getEventUserId = function (event, res, errorNo){
		return this.getEventKeyValue(event, this.eventKeyUserId, res, errorNo);
	}
	
}
