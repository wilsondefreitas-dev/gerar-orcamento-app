/**

classe para criar TextArea. Estende Div.

[arg1] String 	_optionLabel 	  - Label da opção onde o textArea é inserido.
[arg2] function _callBackOnChange - Função executada no evento onChange.

**/

function TextArea(_optionLabel, _callBackOnChange)
{	Div.call(this, "textarea", "TextArea", "textarea"); //Extends DIV
	
	this.optionLabel 	  = _optionLabel;
	this.callBackOnChange = _callBackOnChange || function(){};

	var _that  = this;
	this.value = new Array();

	/**

	- create (construtor)

	Seta o attributo ROWS;
	Executo um timer para executar a função addListener;

	**/

	this.create = function()
	{

		this.setAttribute("rows", "4");
		this.setAttribute("maxlength", "550");
	  	window.setTimeout(function(){ _that.addListener(); }, 1);

  	} 

  	/**

	- addListener 

	Adiciona o listener do evento especifico do objeto.

	Pega o objeto jQuery e adiciona o evento onChange, passando um método como argumento;
	O método executa a função callBackOnChange e seta o valor com o texto inserido pelo usuário;

	**/
	
	this.addListener = function()
	{

		this.getjQueryObject().keyup(
			
			function(){ 

				_that.callBackOnChange();
				_that.setValue(_that.getjQueryObject().val());

				main.navigator.currentSection.setOptionSelected();

				_that.resize();

			}

		)

		/*this.getjQueryObject().keyup(

			function(){
		
				_that.resize();

			}

		)*/

	}

	/**

	- setValue 

	[arg] String _value - valor escrito pelo usuário

	Seta o valor da Array value.
	Sendo [0] - label da opção / [1] - valor inserido pelo usuário;

	**/

	this.setValue = function(_value)
	{

		this.value = [ this.optionLabel, _value ];

	}

	/**

	- Resize
	
	Aumento o textArea conforme o texto.

	**/

	this.resize = function()
	{

		var obj = this.getjQueryObject();
		var scrollHeight = document.getElementById( obj.attr("id") ).scrollHeight;

		while( obj.outerHeight() < ( scrollHeight + parseFloat( obj.css("borderTopWidth") ) + parseFloat( obj.css("borderBottomWidth") ) ) ) {
   			
   			obj.height( obj.height() + 1 );
		}

	}

	//
	//
	//

  	this.create();

}