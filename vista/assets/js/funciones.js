'use strict';
function loginUser(){
	// Traemos en una lista los valores del formulario:
	var dataForm = $('#formLogin').serialize();
	// adicionamos el boton concatenando el resultado de serialize con el botón, "&btnlogin=true"
	var datalogin = dataForm+'&btnlogin=true';
	// Comprobar: 	alert (datalogin);
	//Con ajax controlamos el paso de datos al servicio desde el controlador:
	$.ajax({
		type: "POST",
		url: "../controller/login.php",
		data: datalogin,
	}).done(function(res){
		// Parseo el resultado para volverlo entero:
		this.res = parseInt(res);
		if (this.res === 1 ) {
			// Si al volver entero el resultado es 1, entonces se va a mi página de main:
			console.log(res);
			// Método para cambiar de vista en la url:
			window.location = "../vista/main.php";
		}else {
			// Si no es posible convertirlo en numero, entonces me muestra lo que trae res (respuesta):
			$("#resultado").html(res);
		}	
	});
}



// funcion de buscar y mostrar tabla

$(listaruser());


function listaruser(req){

	$.ajax({

		url:"../controller/listar.php",
		type:"POST",
		data:{dato:req},

	}).done(function(tabla){


		$('#resultados').html(tabla);

		console.log(tabla);
	})

}

$(document).on('keyup','#buscador',function(){
	var valorbuscar=$(this).val();

	if (valorbuscar!=null) {
		listaruser(valorbuscar);
	}else{
		listaruser()
	}

})




// Función de guardar:

function cruduser(boton){
	var datoForm = $("#formRegistro").serialize();
	var datoReg = datoForm+'&btnopcion='+boton;
	// alert (datoReg);
	// Control asicronico:
	$.ajax({
		type: "POST",
		url: "../controller/cruduser.php",
		data: datoReg
	})
	.done(function(res){
		console.log(res);
		alert(res);
	})
}

// Buscar Usuario