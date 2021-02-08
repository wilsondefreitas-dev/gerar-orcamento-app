/**

classe para executar animações. 

**/

function Animate(){

	this.speed = 250;

	/**

	- fadeOut

	Esconde um objeto;

	[arg1] Div 		_div 	  - Div que irá animar.
	[arg2] Function _callBack - O que fazer quando finalizar a animação.
	[arg3] Number 	_speed    - Velocidade da animação (se não definida, segue o padrão).

	**/
	
	this.fadeOut = function(_div, _callBack, _speed){

		var _objectJQuery = _div.getjQueryObject();
		_callBack = _callBack || function(){};
		_speed = _speed || this.speed;

		if(main.isMobile) _speed = 1;
		_objectJQuery.animate({ opacity: 0 }, _speed, function(){ _objectJQuery.css("display", "none");  _callBack(); });

	}

	/**

	- fadeIn

	Mostra um objeto;

	[arg1] Div 		_div 	  - Div que irá animar.
	[arg2] Function _callBack - O que fazer quando finalizar a animação.
	[arg3] Number 	_speed    - Velocidade da animação (se não definida, segue o padrão).

	**/

	this.fadeIn = function(_div, _callBack, _speed){

		var _objectJQuery = _div.getjQueryObject();
		_callBack = _callBack || function(){};
		_speed = _speed || this.speed;

		if(main.isMobile) _speed = 1;

		_objectJQuery.css("display", "block");
		_objectJQuery.animate({ opacity: 1}, _speed, function(){ _callBack() } );

	}

}