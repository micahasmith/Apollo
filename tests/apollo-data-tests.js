var vows = require('vows'),
 	eyes = require('eyes'),
    assert = require('assert'),
	Data = require('../apollo-data.js').Apollo.Data,
	Command = require('../apollo-command.js').Apollo.Command;

	var testc = new Command.factory("pv",["arg1","arg2"],"http://localhost:80/page1");
vows.describe('apollo data').addBatch({
	"getNewUserId":{
		topic:function() {
			Data.getNewUserId(null,this.callback);
		},
		'can get a new user id':function(err,callback){
			assert.isNull(err);
			assert.isNumber(arguments[1]);
			assert.notEqual(arguments[1],0);
		}
	},"handleCommand":{
		topic:function(){
			Data.handleCommand({command:testc,userid:1},this.callback);
		},
		'calls callback':function(err,callback) {
			assert.isNull(err);
		}

	},"commands:pageview":{
		topic:function(){
			var nohash=function(v){return v;};
			Data.commands.pv({command:testc,userid:1},nohash,this.callback);
		},'calls callback':function(err,callback) {
			assert.isNull(err);
		}

	}
}).run();
