Meteor.publish("gastosIndirectos",function(){
  	return GastosIndirectos.find({estatus:true});
});


Meteor.publish("GI",function(params){
  	return GastosIndirectos.find(params);
});