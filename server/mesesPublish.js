Meteor.publish("meses",function(params){
  	return Meses.find(params);
});

Meteor.publish("mesPartida",function(params){
  	return Meses.find(params);
});