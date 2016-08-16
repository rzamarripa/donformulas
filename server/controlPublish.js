Meteor.publish("control",function(params){
return Control.find(params)
});
