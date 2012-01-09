var vows = require('vows'),
 	eyes = require('eyes'),
    assert = require('assert'),
	data = require('../apollo-data.js').Apollo.Data,
	command = require('../apollo-command.js').Apollo.Command,
	commandHandler = require('../apollo-command.js').Apollo.CommandHandler
	engineFactory = require('../apollo-engine.js').Apollo.Engine,
	engine = engineFactory(data,command,commandHandler);

var testc = new command.factory("pv",["arg1","arg2"],"http://localhost:80/page1");


var mockReq={
	noCookie:{
		cookies:{}
	},
	idCookie:{
		cookies:{
			apolloid:"2"
		}
	},
	functional:{
		cookies:{
			apolloid:"2"		
		},
		getMap:{},
		get:function(key) {
			return this.getMap[key];
		},
		headers:{
			host:"hostname",
			url:"urlname"
		}
	},
	newuser:{
		cookies:{
					
		},
		getMap:{},
		get:function(key) {
			return this.getMap[key];
		},
		headers:{
			host:"hostname",
			url:"urlname"
		}
	}
};

var mockRes={
	cookie:function(a,b){var i=0;}
};

// Create a Test Suite
vows.describe('apollo engine').addBatch({
    'processRequest': {
        topic: function() {
			engine.processRequest(null,null,null,this.callback);
		},
        'fires the callback': function (err,callback){
            assert.isNull(err);
        }
    },"getRequestUserId when passed a req without a cookie": {
		topic:function() {
			engine.getRequestUserId(null,mockReq.noCookie,{},this.callback);
		},
		'will create a new userid':function(err,id) {
			assert.isNull(err);
			assert.isNumber(id);
		}
	},"getRequestUserId when passed a req with a cookie": {
		topic:function() {
			engine.getRequestUserId(null,mockReq.idCookie,{},this.callback);
		},
		'will get the userid':function(err,id) {
			assert.isNull(err);
			assert.equal(id,"2");
		}
	},"getData on an existing user":{
		topic:function(){
			var req=mockReq.functional;
			req.getMap={zc:"name",za:"val1,val2"};
			engine.getData(null,req,{},this.callback);
		},
		'will pass the correct data to the callback':function(err,userId,commands) {
			assert.isNull(err);
			//console.log("willpass",arguments);
			assert.equal(userId,"2");
			assert.equal(commands.command,"name");
			assert.equal(commands.source,"hostnameurlname");
		}
	},"getData on a new user":{
		topic:function(){
			var req=mockReq.newuser;
			req.getMap={zc:"name",za:"val1,val2"};
			engine.getData(null,req,{},this.callback);
		},
		'will pass the correct data to the callback':function(err,userId,commands) {
			assert.isNull(err);
			//console.log("willpass",arguments);
			assert.isNumber(userId);
			assert.equal(commands.command,"name");
			assert.equal(commands.source,"hostnameurlname");
		}
	},"setData func":{
		topic:function(){
			//this.callback(null);
			//console.log(this);
			engine.setData(null,mockRes,testc,1,this.callback); 
		},
		'will call the callback': function(err,another) {
			assert.isNull(err);
		}
	}
}).run();
