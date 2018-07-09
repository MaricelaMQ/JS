
window.onload = function(){
	calculadora.inicia()
}

var teclas = document.getElementsByClassName('tecla')
var pantalla = document.getElementById('display')
var numero = pantalla.innerText;

var operacion = 0;
var operacionGuardada = '';
var verificar = 0;

var calculadora = {

	inicia : function(){
		this.presionar()

	},

	presionar : function(){

		for (var i = 0; i < teclas.length; i++) {

			teclas[i].addEventListener('mousedown', function(){
				this.style.border= '3px solid #999999';
				this.style.borderRadius= '0px';
				var digito = this.id
				if(!isNaN(digito)){
					calculadora.nuevoNumero(digito);
				}else{
					calculadora.opera(digito)
				}
			})
			teclas[i].addEventListener('mouseup', function(){
				this.style.border= '0px';
			})
		}
	},

	nuevoNumero : function(digito){

		if(verificar == 1){
			this.reiniciar();
		}
		var newNumber = digito
		numero = pantalla.innerText
		if(numero.length<8){
			if(numero == 0 && newNumber !== 0 && numero != '0.' ){
				pantalla.innerText = newNumber
			}
			if(numero != 0 && newNumber !== 0 || numero == '0.'){
				pantalla.innerText = numero+newNumber
			}
			verificar = 0
		}
	},

	opera : function(operador){
		if(operador == 'on'){
			console.log(operador);
			this.reiniciar();
		}else if(operador == 'punto'){
			this.decimal();
		}else if(operador == 'signo'){
			this.negativos()
		}else{
			this.operaciones(operador);
		}
	},

	operaciones: function(operador){
		numero = pantalla.innerText
		pantalla.innerText = ''
		if(operacion == 0){
			operacion = +numero
			operacionGuardada = operador
		}else{
			switch(operacionGuardada){
				case 'mas':
					operacion = +operacion + +numero;
					break;
				case 'menos':
					operacion = +operacion - +numero;
					break;
				case 'por':
					operacion = +operacion * +numero;
					break;
				case 'dividido':
					operacion = +operacion / +numero;
					break;
			}
		}

		if(operador == 'igual'){
    	console.log(operador);
			operacion = this.valida(operacion)
      console.log(operacion);
			pantalla.innerText = operacion
			operacion = 0;
			verificar = 1;
		}else{
			verificar = 0
			operacionGuardada = operador
     		}
  	},

	reiniciar : function(){
		pantalla.innerText = 0;
		operacion = 0;
	},

	decimal : function(){
		numero = pantalla.innerText
		if(numero.length<8){
			var esDec = Number(numero)
			if(Number.isInteger(esDec) && numero != '0.'){
				pantalla.innerText = numero+'.'
			}
		}
	},

	negativos : function(){
		numero = pantalla.innerText
		if(numero != 0){
			if(numero<0){
				pantalla.innerText = numero.substring(1)
			}else{
					pantalla.innerText = '-'+pantalla.innerText
			}
		}
	},

	valida : function(result){
		result = result.toString()
		if(result.length > 8){
			result = result.substr(0,8)
		}
    	return result
	},
}
