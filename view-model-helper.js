var ViewModelBuilder=(function(){
  return { 
	init:function(defaults,extendFunc) {
		  var _defaults={projectName:"Project Name"};
		  _defaults=extendFunc(_defaults,defaults);
		   return {
			getViewModel:function(locals) {
			    return extendFunc(_defaults,locals);
			}
		   }
  		}
	};
}());

exports.ViewModelBuilder=ViewModelBuilder;
