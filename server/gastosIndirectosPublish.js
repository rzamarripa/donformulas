Meteor.publish("gastosIndirectos",function(){
  	return Gastos.find({estatus:true});
});