var underscore=require('underscore')
  , v=require('valentine')
  , r=require('redis')
  , redis=r.createClient();

var Apollo = Apollo || {};

Apollo.Data=(function(redis){
	return {
		getNewUserId:function(err,callback) {
			//console.log("getNewUserID args",arguments);
			redis.incr('userid',function(e,val) {
				//console.log("got",val);
				callback(e,val);
			});
		},
		handleCommand:function(data,callback) {
			var cname=data.command.command,
				cargs=data.command.args,
				userid=data.userid;
			//redis.get("events:"+
			
		}
	};
})(redis);

exports.Apollo=Apollo;
