var vows = require('vows'),
 	eyes = require('eyes'),
    assert = require('assert'),
	Apollo = require('../apollo-command.js').Apollo;

var testc = new Apollo.Command.factory("cname",["arg1","arg2"]);

vows.describe('apollo commands').addBatch({
	"the command factory":{
		topic:function(){
			Apollo.Command.parser("name","val1,val2","source",this.callback);
		},
		'can parse passed vals correctly':function(err,command,callback) {
			assert.isNull(err);
			//console.log(arguments);
			assert.equal(command.command,"name");
			assert.equal(command.args[0],"val1");
			assert.equal(command.args[1],"val2");
			assert.equal(command.source,"source");
		}
	}
}).addBatch({
	"the command handler":{
		topic:function(){
			Apollo.CommandHandler.onCommand(this.callback);
			Apollo.CommandHandler.handleCommand(testc,1);
		},
		'passes the command':function(data,callback) {
			//console.log(arguments);
			assert.equal(data.command,testc);
			
		},
		'passes the userid':function(data,callback) {
			//console.log(arguments);
			assert.equal(data.userid,1);
			
		}
	}
}).run();
