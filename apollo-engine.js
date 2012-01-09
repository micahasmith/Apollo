var underscore=require('underscore')
  , v=require('valentine')
  , Apollo=require('./apollo-command.js').Apollo;

var Apollo = Apollo || {};

Apollo.Engine=function(data,command,commandHandler) {
	var that= {
			processRequest:function(err,req,res,callback) {
				//first, get the user and commands
				
				v.waterfall(
					function(fn) {
						getData(null,req,res,fn);
					},
					function(fn,userid,com){
						console.log("v2w",arguments);
						setData(null,res,com,userid,fn);
					},
					callback
				);
				
			},
			//get the userid, creating a new one if possible
			//get the command passed
			//callback gets passed (error,userid,command)
			getData:function(err,req,res,callback) {
				var f1=this.getRequestUserId,
					f2=this.getRequestCommands;
				v.parallel(
					function(fn) { 
						f1(null,req,res,fn);
					}
					,function(fn) {
						f2(err,req,fn);
					}
					,callback
				);
			},
			//set the response userid
			//persist command data
			setData:function(err,res,command,userid,callback) {
				var f1=this.setRequestUserId,
					f2=data.handleCommand;

				v.parallel(
					function(cb){
						f1(null,userid,res,cb);
					},
					function(cb){
						//console.log(data);
						data.handleCommand({command:command,userid:userid},cb);
					},
					function(e){
						callback(e);
					}
				);
			},
			getRequestUserId:function(err,req,res,callback) {
				if(err) return console.log(err);
				
				if(typeof req.cookies.apolloid==='undefined') {
					//console.log("getRequestUserId",'new user');
					//this.createUser(null,callback);
					callback(null,3);
				} else {
					//console.log("getRequestUserId",'old user');
					callback(null,req.cookies.apolloid);
				}
			},
			createUser:function(err,callback) {
			 	data.getNewUserId(null,callback);
			},
			setRequestUserId:function(err,userid,res,callback) {
				res.cookie('apolloid',userid);
				callback(null);
			},
			getRequestCommands:function(err,req,callback) {
				//console.log("getRequestCommands",arguments,req.get('za'));
				command.parser(req.get("zc"),req.get("za"),req.headers.host+req.headers.url,callback);
			},
			registerEvent:function(err,res,callback) {
			  
			}
		};
	
	//set up the PageView Command Handler
	commandHandler.onCommand(function(data) {
		switch(data.command.command){
			case "pv":
			
			break;
			default:

			break;
		}
	});	


	return that;
};

exports.Apollo=Apollo;

