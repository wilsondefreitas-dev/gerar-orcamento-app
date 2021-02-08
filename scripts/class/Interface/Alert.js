/**

classe para criar os botões de navegação 

[arg1] String _label 	  - Label do botão.
[arg2] String _actionType - Tipo da função a ser executada no evento clique.

**/

function Alert(_subOptions)
{ 	Div.call(this, "alert", "Alert SmallFont MediumColor"); //Extends Div
	
	this.subOptions = _subOptions;

	var _that = this;

	/**

	- create (construtor)

	Adiciono as subOpções disponiveis dentro desse Alert;

	**/
	
	this.create = function()
	{

		for(w in this.subOptions) this.appendOnInnerContent(this.subOptions[w]);

	}

	/**

	- open 

	Mostra o Alert.

	Pego o objeto Jquery do alert e seto o atributo css display como block;

	**/

	this.open = function()
	{

		//_that.getjQueryObject().css("display", "block");

		if(_that.opened) return
		_that.getjQueryObject().slideToggle( 100, function() { _that.opened = true; });

	}

	/**

	- close 

	Esconde o Alert.

	Pego o objeto Jquery do alert e seto o atributo css display como none;

	**/

	this.close = function()
	{

		//_that.getjQueryObject().css("display", "none");

		if(!_that.opened) return
		_that.getjQueryObject().slideToggle( 100, function() { _that.opened = false; });

	}

	//
	//
	//

	this.create();


}