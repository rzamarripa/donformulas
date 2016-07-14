Meteor.publish("gI",function(){
  	return GastosIndirectos.find({estatus:true});
});