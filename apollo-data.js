var underscore=require('underscore')
  , v=require('valentine')
  , r=require('redis')
  , redis=r.createClient()
  , c=require('crypto');

var Apollo = exports.Apollo || {};

Apollo.Data=(function(r){
	return {
		getNewUserId:function(err,callback) {
			//console.log("getNewUserID args",arguments);
			r.incr('userid',function(e,val) {
				//console.log("got",val);
				callback(e,val);
			});
		},
		handleCommand:function(data,callback) {
			
			var cname=data.command.command;
			if(v.is.def(this.commands[cname])){
				this.commands[cname](data,this.md5it,callback);
			}else{
				throw new Error("unhandled command:"+cname);
			}
			//redis.get("events:"+
			
			
		},
		commands:{
			pv:function(data,hasher,callback) {
				//console.log(data);
				var cname=data.command.command,
				cargs=data.command.args,
				user="user:"+data.userid+":",
				source=data.command.source,
				smd5=hasher(source),
				pmd5="page:"+smd5,
				nilfunc=function(cb){ return function(e,val){cb(e);};}

				if(v.is.und(data.userid)) throw new Error("must pass data.userid");

				v.parallel(
					//incr total user pageviews
					function(cb){
						r.incr(user+"pageviews",nilfunc(cb));
						
					},
					//add page to pages
					function(cb){
						//get the page id
						r.get(pmd5,function(e,val)
						{
							//if there is no page with this id
							if(val===null){
								//get the page id here
								r.incr("pageid",function(e1,val){
									//create the page entity
									if(e!==null)cb(e);
									//ensure non-dups
									r.setnx(pmd5,val,function(e2,val){
										cb(e,val);
									});
								})
							} else {
								//if there is a page with this id
								cb(e,val);
							}
						});
					},
					//with a reference to the page, now we can...
					function(e,pageid,cb){
						var page="page:"+pageid+":";
						v.parallel(
							//incr page entity's views
							function(cb){
								r.incr(page+"pageviews",nilfunc(cb));
							},
							//add page to user's viewed pages
							function(cb){
								r.sadd(user+"pages",pageid,nilfunc(cb));
							},
							//add user to page's viewers
							function(cb){
								r.sadd(page+"users",data.userid,nilfunc(cb));
							},
							//add the page to all pages
							function(cb){
								r.sadd("pages",source,nilfunc(cb));
							},
							function(e){
								
								callback(e);
							}
						);
					}
				);
				
			}
		},
		md5it:function(url){
			return c.createHash('md5').update(url).digest('base64');
		}
	};
})(redis);

exports.Apollo=Apollo;
