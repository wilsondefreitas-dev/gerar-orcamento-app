/**

classe para criar Select. Estende Div.

[arg] Objeto _data - Dados do select.

**/

function Select(_data)
{	Div.call(this, "select", "Select", "select"); //Extends DIV
	
	this.data = _data;

	var _that = this;

	/**

	- create (construtor)

	Insere as opções no select;
	Executa um timer para executar a função addListener e setDefaultValue;

	**/

	this.create = function()
	{

		this.appendOptions();

	  	window.setTimeout( function(){ 
	  	
	  		_that.addListener();
	  		_that.setOptionSelectedValue();
	  	
	  	}, 1);

  	} 

  	/**

	- addListener 

	Adiciona o listener do evento especifico do objeto.

	Pega o objeto jQuery e adiciona o evento click, passando um método como argumento;
	O método executa a função setSelectedValue do objeto subOption onde o select esta inserido, passando o valor da seleção do usuário como lowerCase;
	e executa o método saveOptionSelected do objeto Option;

	**/

	this.addListener = function()
	{

		this.getjQueryObject().change(
			
			function(){ 

				_that.setOptionSelectedValue();
				_that.getParentDiv().getParentDiv().getParentDiv().saveOptionSelected();
				
			}

		)

	}

	/**

	- appendOptions 

	Insere as opções dentro do select.

	Faço um laço for até o número total de opções;
		Crio uma nova div chamada option;
		seto o atributo value dessa nova div como a label da opção;
		insiro a label da opção dentro da nova div.
		Insiro a nova div dentro desse select;

	**/

	this.appendOptions = function()
	{	

		for(w = 0; w < this.data.length; w++){

			var newOption = new Div("option", "SelectOption", "option");

			newOption.setAttribute("value", this.data[w].label);
			newOption.appendOnInnerContent(this.data[w].label);

			this.appendOnInnerContent(newOption);

		}

	}

	/**

	- setOptionSelectedValue 

	Executa o método setSelectedValue passando o objeto da opção selecionada.

	O método executa a função setSelectedValue do objeto subOption onde o select esta inserido, passando o valor default como lowerCase;

	**/

	this.setOptionSelectedValue = function()
	{

		var thisValue = _that.getjQueryObject().val();

		for(var w in _that.data) {

			if(_that.data[w].label == thisValue) {
			
				_that.getParentDiv().setSelectedValue( _that.data[w], _that.getParentDiv().index );
				
			}

		}

	}


	//
	//
	//

  	this.create();

}