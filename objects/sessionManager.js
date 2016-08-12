/**
 * Sessions object
 */

'use strict';

module.exports = new Sessions();

function User(id, name) {
	this.id = id;
	this.name = name;
}

function Users(){
	//List of system users
	this.list = [];
	this.newUser = function (id, name) {
		var x;
		for (x in this.list){
			if (this.list[x].id === id){
				return false;
			}
		}
		var user = new User(id, name);
		this.list.push(user);
		return true;
	}
}

function Session(id, user) {
	this.id = id;
	this.user = user;
}

function Sessions() {
	this.users = new Users();
	// List of sessions
	this.list = [];
	this.nextId = 1;
	// Functions
	this.find = function (sessionId) {
		var x;
		for (x in this.list) {
			if (this.list[x].id === sessionId){
				return this.list[x];
			}
		}
		return; // undefined
	}
	this.login = function (userId) {
		var user;
		// Validate user id
		var x;
		for (x in this.users.list){
			if (this.users.list[x].id === userId){
				user = this.users.list[x];
				break;
			}
		}
		if (!user) {
			return -1;
		}
		// Validate session
		for (x in this.list){
			if (this.list[x].user === user){
				return this.list[x].id; // current Id session
			}
		}
		var session = new Session(this.nextId++, user);
		this.list.push(session);
		return session.id; // new Id Session
	}
	this.logout = function (sessionId) {
		var x;
		for (x in this.list){
			if (this.list[x].id === sessionId){
				delete this.list[x];
				return true;
			}
		}
		return false;
	}
	this.newUser = function (id, name) {
		return this.users.newUser(id, name);
	}
}

/**
 * Determine if the sessions handles a given method.
 * @private
 */

Sessions.prototype._handles_method = function _handles_method(method) {
  if (this.methods._all) {
    return true;
  }

  var name = method.toLowerCase();

  if (name === 'head' && !this.methods['head']) {
    name = 'get';
  }

  return Boolean(this.methods[name]);
};

Sessions.prototype.all = function all() {
  var handles = flatten(slice.call(arguments));

  for (var i = 0; i < handles.length; i++) {
    var handle = handles[i];

    if (typeof handle !== 'function') {
      var type = toString.call(handle);
      var msg = 'Sessions.all() requires callback functions but got a ' + type;
      throw new TypeError(msg);
    }

    var layer = Layer('/', {}, handle);
    layer.method = undefined;

    this.methods._all = true;
    this.stack.push(layer);
  }

  return this;
};

