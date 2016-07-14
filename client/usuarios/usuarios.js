angular
.module("formulas")
.controller("UsuariosCtrl", UsuariosCtrl);
function UsuariosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
$reactive(this).attach($scope);

	this.subscribe('usuarios');
	this.subscribe('empresas');
	
  this.action = true;
 
  this.helpers({
	  usuarios : () => {
		  return Usuarios.find();
	  },
	  empresas : () => {
		  return Empresas.find();
	  },
		usuarios : () => {
		  return Meteor.users.find();
	  }
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
			username: this.usuario.nombreUsuario,
			password: this.usuario.contrasena,
			profile: {
				 nombre: this.usuario.nombre,
				 apellidos: this.usuario.apPaterno + " " + this.usuario.apMaterno,
				 nombreCompleto: this.usuario.nombre + " " + this.usuario.apPaterno + " " + this.usuario.apMaterno,
				 estatus: true,
				 tipoUsuario: "usuario"
			},function(err) {
				if (err)
				   console.log(err);
				  else
				    console.log('success!');
				}
		});
		this.usuario.estatus = true;
		usuario.nombreCompleto = this.usuario.nombre + " " + this.usuario.apPaterno + " " + this.usuario.apMaterno;
		console.log(this.usuario);
		Usuarios.insert(this.usuario);
		toastr.success('usuario guardado.');
		this.usuario = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.Usuarios');
		
	};
	
	this.editar = function(id)
	{
    this.usuario = Usuarios.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	
	this.actualizar = function(usuario)
	{
		var idTemp = usuario._id;
		delete usuario._id;		
		Usuarios.update({_id:idTemp},{$set:usuario});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var usuario = Usuarios.findOne({_id:id});
		if(usuario.estatus == true)
			usuario.estatus = false;
		else
			usuario.estatus = true;
		
		Usuarios.update({_id:id}, {$set : {estatus : usuario.estatus}});
	};

	 this.tomarFoto = function(){
		$meteor.getPicture().then(function(data){
			this.usuario.fotografia = data;
		});
	};


};