Empleados 						= new Mongo.Collection("empleado");
Empleados.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});