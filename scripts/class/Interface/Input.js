//class Input extends Div
function Input(_type, _callBackOnChange)
{	Div.call(this, _type, _type, "input"); //Extends DIV
	
	this.type 			  = _type;
	this.callBackOnChange = _callBackOnChange || function(){};

	var _that = this;

	/**

	- create (construtor)

	Seto os atributos type e name com o tipo do input;
	Executo um timer para executar a função addListener;

	**/

	this.create = function(){

		this.setAttribute("type", this.type);
		this.setAttribute("name", main.navigator.currentSection.id);
		
	  	window.setTimeout( function(){ _that.addListener(); }, 1);

  	} 

  	/**

	- addListener 

	Adiciona o listener do evento especifico do objeto.

	Pega o objeto jQuery e adiciona o evento click, passando o método _callBackOnChange como argumento;

	**/

	this.addListener = function(){
		
		this.getjQueryObject().click(
			
			function(){ 

				_that.callBackOnChange();

			}

		)

	}


	//
	//
	//

  	this.create();

}