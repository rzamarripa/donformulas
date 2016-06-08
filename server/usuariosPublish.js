Meteor.publish("usuarios", function(){
	return Meteor.users.find();
});