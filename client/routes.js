angular.module("formulas").run(function ($rootScope, $state, toastr) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	toastr.error("Acceso Denegado");
				toastr.error("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }
/*
    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }
*/
  });
});

angular.module('formulas').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/login/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {
          return $meteor.logout().then(
            function () {
	            toastr.success("Vuelva pronto.");
              $state.go('anon.login');
            },
            function (error) {
              toastr.error(error.reason);
            }
          );
        }]
      }
    });

  /***************************
   * Login Users Routes
   ***************************/
  $stateProvider
    .state('root', {
      url: '',
      abstract: true,
      templateUrl: 'client/layouts/root.ng.html',
      controller: 'RootCtrl',
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'client/home/home.ng.html',      
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.estadisticas', {
      url: '/',
      templateUrl: 'client/estadisticas/estadisticas.ng.html',
      controller: 'EstadisticasCtrl as est',
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
/*
    .state('root.estadisticas', {
      url: '/estadisticas',
      templateUrl: 'client/estadisticas/estadisticas.ng.html',
      controller: 'EstadisticasCtrl as est',
    })
*/
    .state('root.empresas', {
      url: '/empresas',
      templateUrl: 'client/empresas/empresas.ng.html',
      controller: 'EmpresasCtrl as empr',
    })
    .state('root.obras', {
      url: '/obras',
      templateUrl: 'client/obras/obras.ng.html',
      controller: 'ObrasCtrl as obr',
    })
    .state('root.tipoProyecto', {
      url: '/tipoProyecto',
      templateUrl: 'client/tipoProyecto/tipoProyecto.ng.html',
      controller: 'TipoProyectoCtrl as tipopro',
    })
    .state('root.empleados', {
      url: '/empleados',
      templateUrl: 'client/empleados/empleados.ng.html',
      controller: 'EmpleadosCtrl as empl',
    })
    .state('root.usuarios', {
      url: '/usuarios',
      templateUrl: 'client/usuarios/usuarios.ng.html',
      controller: 'UsuariosCtrl as usu',
    }); 
}]);     