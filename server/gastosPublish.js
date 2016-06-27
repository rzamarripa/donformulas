Meteor.publish("gastos",function(){
  	return Gastos.find({estatus:true});
});