var	events = require('events'),
	Apollo = Apollo || {};

Apollo.Command=(function(){
	var factory=function(cname,args,source) {
		this.command=cname;
		this.args=args;
		this.source=source;
	}, parser=function(zc,za,source,callback) {
		var c=new factory(zc,za.split(','),source);
		return callback(null,c);
	};
	return {parser:parser,factory:factory};
})();

Apollo.CommandHandler=(function(){
	var e = new events.EventEmitter;
		that={
			handleCommand:function(command,userid){
				e.emit("ApolloCommand",{command:command,userid:userid});
			},
			onCommand:function(fn) {
				e.on("ApolloCommand",fn);
			}
		};
	
	return that;
})();

exports.Apollo=Apollo;
