/**

classe para criar sub-opções das opções. Estende Div.

[arg1] Objeto 	_data  - Dados da subopção.
[arg2] function _index - Número ordinal da subopção.

**/

function SubOption(_data, _index)
{	Div.call(this, "subOption", "SubOption"); //Extends DIV

	this.data  = _data;
	this.index = _index;

	this.selectedValue = new Object();

	/**

	- create (construtor)

	Verifico o tipo da subopção;
	Se for select;
		Crio uma nova Div chamada label, escrevo o label dentro dela e a insiro dentro dessa subOpção;
		Insiro um objeto Select dentro dessa subOpção contendo as opções (choices);

	**/

	this.create = function()
	{

		switch(this.data.type){

			case "Select":
				
				new Div("label", "Label", "div").writeInnerAndAppendOnDiv( this.data.label, this );
				this.appendOnInnerContent( new Select( this.data.choices ) );

			break;

		}
		
	} 

	/**

	- setSelectedValue 

	Seta o valor do objeto selectedValue.

	[arg] Objeto _selectedValue - valor escolhido pelo usuário.
	
	Executo o método setSubOptionValue do objeto Option, passando como argmento o valor selecionado e o index (número ordinal) da subopção;

	**/

	this.setSelectedValue = function(_selectedValue, _index)
	{

		this.selectedValue = _selectedValue;
		this.getParentDiv().getParentDiv().setSubOptionSelected( this.selectedValue, _index );

	}

	//
	//
	//

	this.create();

}