Meses 						= new Mongo.Collection("meses");
Meses.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});