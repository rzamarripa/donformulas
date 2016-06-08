Meteor.methods({
  createUsuario: function (usuario, rol, grupo) {
		var usuario_id = Accounts.createUser({
			username: usuario.nombreUsuario,
			password: usuario.contrasena,			
			profile: {
				email: usuario.correo,
				nombre: usuario.nombre,
				apellidos: usuario.apPaterno + " " + usuario.apMaterno,
				nombreCompleto : usuario.nombre  + " " + usuario.apPaterno + " " + usuario.apMaterno,
				fotografia : usuario.fotografia
			}
		});
		
		Roles.addUsersToRoles(usuario_id, rol, grupo);
		
	},
	userIsInRole: function(usuario, rol, grupo, vista){
		if (!Roles.userIsInRole(usuario, rol, grupo)) {
	    throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);
	  }
	},
	cambiarEstatusUsuario : function(usuario_id){
		var usuario = Meteor.users.findOne({_id:usuario_id});
		var estatus = false;
		if(usuario.profile.estatus == true)
			estatus = false;
		else
			estatus = true;
		Meteor.users.update({_id:usuario_id}, {$set : {'profile.estatus' : estatus}});
	}
});