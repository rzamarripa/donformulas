Meteor.publish("planes",function(){
  	return Planes.find({estatus:true});
});