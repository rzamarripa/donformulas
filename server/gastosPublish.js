Meteor.publish("gastosIndirectos",function(){
  	return GastosIndirectos.find({estatus:true});
});