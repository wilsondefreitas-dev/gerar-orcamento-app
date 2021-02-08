/**

classe para criar Question (topo das seções). Estende Div.

[arg] Array _data - Dados da questão (topo).

**/

function Question(_data)
{	Div.call(this, "question", "Question DarkColor"); //Extends DIV
		
	this.data = _data;

	/**

	- create (construtor)

	Cria uma nova Div, insere a questão na nova div e insere a nova div dentro desse Question;
	Cria uma nova Div, insere a descrição na nova div e insere a nova div dentro desse Question;

	**/

	this.create = function()
	{

		if(main.curDataFile != "data/hub.xml") this.appendOnInnerContent( new Button("X", "reset", "Reset") );
		new Div("label", "Label BigFont").writeInnerAndAppendOnDiv(this.data.question, this);
		new Div("description", "Description SmallFont").writeInnerAndAppendOnDiv(this.data.description, this);

	}

	//
	//
	//

	this.create();

}