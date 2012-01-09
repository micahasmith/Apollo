var _=require('underscore')
  , path=require('path')
  , vmFactory=require('./view-model-helper.js').ViewModelBuilder
	.init({projectName:"Apollo"},_.extend).getViewModel,
	data = require('./apollo-data.js'),
	command = require('./apollo-command.js').Apollo.Command,
	commandHandler = require('./apollo-command.js').Apollo.CommandHandler
	engineFactory = require('./apollo-engine.js').Apollo.Engine,
	engine = engineFactory(data,command,commandHandler)
  , _l=console.log;

/*
 * GET home page.
 */
exports= _.extend(exports, {
	index: function(req, res){
	console.log(req);
	  res.render('index', vmFactory({title:"Home"}));
	},

	engine: function(req,res) {
		var onEnd=function() {
			res.sendfile(fpath);
		};
		Apollo.Engine.processRequest(onEnd);
	},

	assets:function(req,res) {
	  res.render('index',vmFactory({
		title:"Assets",
		pageName:"Assets",
		pageNameSupport:""
		}));
        }
});

