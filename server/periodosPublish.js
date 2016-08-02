Meteor.publish("periodos",function(params){
  	return Periodos.find(params);
});


Meteor.publish("periodo",function(params){
  	return Periodos.find(params);
});

Meteor.publish("presupuestosCampo",function(params){
  	return PresupuestosCampo.find(params);
});