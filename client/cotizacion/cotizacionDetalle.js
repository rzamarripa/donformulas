angular.module("inoxica")
.controller("CotizacionDetalleCtrl", CotizacionDetalleCtrl);  
function CotizacionDetalleCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);


    this.subscribe('materiales',()=>{
	return [{estatus:true}] 
    });
     this.subscribe('cotizacion',()=>{
	return [{estatus:1}] 
    });
      this.subscribe('clientes',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('productos',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('unidades',()=>{
	return [{estatus:true}] 
    });

    console.log($stateParams)
    var cantidad = $stateParams.cantidad

      
  
	this.helpers({
	  cotizacion : () => {
		  return Cotizacion.findOne({_id : $stateParams.cotizacion_id});
	  },
	  cotizacionProductos : () => {
		  return Cotizacion.find({tipo : "producto" });
	  },
	  materiales : () => {
		  return Materiales.find();
	  },
	   clientes : () => {
		  return Clientes.find();
	  },
	  productos : () => {
		  return Productos.find();
	  },
	   unidades : () => {
		  return Unidades.find();
	  },
  });
  

  this.nuevo = true;
  this.guardar = true; 
  this.tabla 	= false; 
  this.action = true;


  this.cotizacion = {};
      this.cotizacionProducto = {};
      this.cotizacion.detalle = [];
      this.subTotal = 0.00;
      this.cotizacionManual = {};
      this.productoIndice = 0;
	  this.clienteSeleccionado = {};
	  this.productoSeleccionado = {};
	 
  this.nuevoCotizacion = function()
  {
    this.action = true;
    this.productoTipo = true;
    this.nuevo = !this.nuevo;
    this.cotizacion = {};
    this.cotizacion.detalle = [];
  };
  
  this.agregarManual = function(cotizacionManual)
	{ 
		//cotizacion.material_id = this.material_id;
		console.log(this.cotizacion)
		cotizacionManual.tipo = "manual";
		this.cotizacion.detalle.push(cotizacionManual);
		this.cotizacion.estatus = 1;
		console.log(this.cotizacion);
		this.guardar = false; 
		this.productoTipo = false;
		this.on = false;
		this.tabla 	= true;
		this.subTotal += (cotizacionManual.precio + (cotizacionManual.precio * cotizacionManual.utilidad /100)  * cotizacionManual.cantidad)
		* cotizacionManual.cantidad ;
		this.cotizacionManual = {};
		
	};
	this.agregarProducto = function(cotizacionProducto)
	{ 
		cotizacionProducto.tipo = "producto";
		this.cotizacion.detalle.push(cotizacionProducto);
		this.cotizacion.estatus = 1;
		console.log(this.cotizacion);
		this.guardar = false; 
		this.productoTipo = false;
		_.each(cotizacionProducto.detalle, function(detalle){
			rc.subTotal += (cotizacionManual.precio + (cotizacionManual.precio * cotizacionManual.utilidad /100)  * cotizacionManual.cantidad)
		* cotizacionManual.cantidad ;
		});
		this.productoSeleccionado = {};
	};

	 this.guardarCotizacion = function(cotizacion)
	{
		
		console.log(this.cotizacion);
		_.each(rc.cotizacion.detalle, function(cotizacion){
			delete cotizacion.$$hashKey;
			});	
		 var total = 0;
		_.each(rc.cotizacion.detalle,function(detalle){ total +=
		 ((detalle.precio * detalle.utilidad /100 + detalle.precio)  * detalle.cantidad)});
		_.each(rc.cotizacion.detalleProducto,function(producto){total += producto.precio * producto.cantidad});
		this.cotizacion.subTotal = total;
		this.cotizacion.total = total - total*0.16;
		this.cotizacion.nombrePrimerProducto = this.cotizacion.detalle[0].nombre 
		this.cotizacion.estado = true;
		
		this.cotizacion.folio = parseInt(cantidad) + 1;			
		Cotizacion.insert(this.cotizacion);
		toastr.success('Cotizacion guardada.');
		this.cotizacion = {};
		this.cotizacionProducto = {};
     	this.cotizacion.detalle = [];
    	this.cotizacionManual = {};  
    	this.clienteSeleccionado = {};
        this.productoSeleccionado = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		this.guardar = true; 
		this.productoTipo = true;
		this.tabla = false;
		$state.go('root.cotizacion')
	};
	
	this.editar = function(id)
	{
    this.cotizacion = Cotizacion.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	this.editarProducto = function($index)
	{
    this.productoSeleccionado = rc.cotizacion.detalle[$index];

    this.agregar = false;
    this.cancelar = true;
    this.productoIndice = $index;
    console.log(this.productoSeleccionado);

	};
	this.editarMaterial = function($index)
	{
    this.materialSeleccionado = rc.producto.detalleProducto[$index];
    this.agregar = false;
    this.cancelar = true;
    this.materialIndice = $index;
    console.log(this.materialSeleccionado);

	};
	
	this.actualizar = function(cotizacion)
	{
		console.log(this.cotizacion);
		_.each(rc.cotizacion.detalle, function(cotizacion){
			delete cotizacion.$$hashKey;
			});
		var idTemp = cotizacion._id;
		delete cotizacion._id;		
		Cotizacion.update({_id:idTemp},{$set:cotizacion});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		console.log(cotizacion);
		$state.go('root.cotizacion')
	};

	this.cambiarEstatus = function(id)
	{
		var cotizacion = Cotizacion.findOne({_id:id});
		if(cotizacion.estatus == 1)
			cotizacion.estatus = 2;
		else
			cotizacion.estatus = 3;
		
		Cotizacion.update({_id: id},{$set :  {estatus : cotizacion.estatus}});
    };

    this.getProductos= function(producto_id)
	{
		console.log(producto_id);
		rc.productoSeleccionado = Productos.findOne(producto_id);
		console.log(rc.productoSeleccionado)
	};
	this.clientillo = false;
	this.getClientes= function(cliente_id)
	{
		 rc.clienteSeleccionado = Clientes.findOne(cliente_id);
		 this.clientillo = true;

	};
	this.tabla = false
	this.Mostrartabla= function()
	{
		 
		 this.tabla = true;
	};

	 this.getUnidad= function(unidad_id)
	{
		var unidad = Unidades.findOne(unidad_id);
		if(unidad)
		return unidad.nombre;
	}; 

	this.SumaPrecioProductos = function(){
		total = 0;
		_.each(rc.cotizacion.detalle,function(detalle){ total += (
		(detalle.precio * detalle.utilidad /100 + detalle.precio)  * detalle.cantidad)});
		return total
	};

	this.aumentoIva = function () 
	{
		this.on = !this.on;

		console.log(this.on)		
		
   };




};









