/**
 * Queue object
 */

'use strict';

var utils = require('../objects/utils')

module.exports = new QueueManager();

// List of supported command
var commandList = '/foo/moo/bar/baz/';
var separator = '/';

// Object Event
function Event(offset, command, userid) {
	this.offset = offset;
	this.command = command;
	this.userid = userid;
	this.isConsumed = false;
}

// Object Queue
function Queue(command) {
	this.lastConsumed = -1;
	this.command = command;
	this.events = [];
}

// Object QueueManager
function QueueManager() {
	this.nextOffset = 1;
	this.queues = {};
	// Functions
	this.get = function (command) {
		var queue = getQueue(command, this.queues);
		if (!queue) return utils.getJsonError(500, 'unknown command'); // error
		// What to consume
		if (queue.lastConsumed === (queue.events.length - 1 )) return utils.getJsonStatusNone(); // undefined
		var event = queue.events[++queue.lastConsumed];
		event.isConsumed = true;
		return event;
	}
	this.put = function (command, userid) {
	  var queue = getQueue(command, this.queues);
	  if (!queue) return utils.getJsonError(500, 'unknown command'); // error
	  // Queued event
	  var event = new Event(this.nextOffset++, command, userid);
	  queue.events.push(event);
	  return event;
	}
	this.read = function (command, fromIndex, toIndex) {
		var queue = getQueue(command, this.queues);
		if (!queue) return utils.getJsonError(500, 'unknown command'); // error
		var list = [];
		var x;
		for (x = fromIndex; x <= toIndex; x++) {
			var event = queue[x];
			if (!event) continue;
			list.push(event);
		}
		return list;
	}
	this.status = function (command) {
		var queue = getQueue(command, this.queues);
		if (!queue) return utils.getJsonError(500, 'unknown command'); // error
		return {"status": { "produced": queue.events.length, "consumed": queue.lastConsumed, "to consume": queue.events.length - queue.lastConsumed}};
	}
};

// Function to validate command and getting the command queue
var getQueue = function (command, queues) {
	// Validate command
	var pattern = separator + command + separator;
	console.log(commandList.search(pattern));
	if (-1 === commandList.search(pattern))	return;
	// Find queue
	var queue = queues[command];
	if (queue) return queue;
	// Create new queue
	queues[command] = new Queue(command);
	return queues[command];
}