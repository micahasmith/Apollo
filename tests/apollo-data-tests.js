var vows = require('vows'),
 	eyes = require('eyes'),
    assert = require('assert'),
	Apollo = require('../apollo-data.js').Apollo;

vows.describe('apollo data').addBatch({
	"getNewUserId":{
		topic:function() {
			Apollo.Data.getNewUserId(null,this.callback);
		},
		'can get a new user id':function(err,callback){
			assert.isNull(err);
			assert.isNumber(arguments[1]);
			assert.notEqual(arguments[1],0);
		}
	}
		

	
}).run();
