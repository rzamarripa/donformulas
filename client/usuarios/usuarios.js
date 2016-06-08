angular.module("formulas")
.controller("UsuariosCtrl", UsuariosCtrl);
 function UsuariosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('usuarios');
 
  this.helpers({
	  usuarios : () => {
		  return Meteor.users.find();
	  },
  });
  
  this.nuevo = true;  
  this.nuevoUsuario = function()
  {
	this.action = true;
    this.nuevo = !this.nuevo;
    this.usuario = {}; 
  };
 
	this.guardar = function(usuario)
	{
		Accounts.createUser({
			username: this.usuario.usuario,
			password: this.usuario.contrasena,
			profile: {
				 nombre: this.usuario.nombre,
				 apellidos: this.usuario.apPaterno + " " + this.usuario.apMaterno,
				 estatus:true,
			},function(err) {
				if (err)
				   console.log(err);
				  else
				    toastr.success('Usuario guardado.');
				}
		});
		
		toastr.success('Ya se registró el usuario.');
		this.usuario = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.usuarios');
		
	};
	
	this.editar = function(id)
	{
    this.usuario = Meteor.users.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(usuario)
	{
		var idTemp = usuario._id;
		delete usuario._id;		
		usuarios.update({_id:idTemp},{$set:usuario});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		Meteor.call("cambiarEstatusUsuario", id);
	};

	 this.tomarFoto = function(){
		$meteor.getPicture().then(function(data){
			this.usuario.fotografia = data;
		});
	};
};