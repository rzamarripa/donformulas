Meteor.publish("obras",function(){
  	return Obras.find({estatus:true});
});