/**

classe para criar e trabalhar div/tags no HTML. 

[arg1] String _id 	 - ID da tag HTML.
[arg2] String _class - Classe da tag HTML.
[arg3] String _tag   - Tipo da tag HTML.

**/

// Static Vars
Div.serie = 1;
Div.animate = new Animate();

function Div(_id, _class, _tag){
 	
 	this.id     = _id;
	this.class  = _class;
	this.tag 	= _tag || "div";

	var _that 		  = this;
	this.parentDiv 	  = new Object();
	this.attributes   = new Array();
	this.innerContent = new String();

	/**

	- create (construtor)

	Cria e seta o ID da Div;

	**/

	this.create = function()
	{

		this.createID();

	}

	/**

	- appendOnInnerContent 

	Insere conteúdo dentro da div.

	[arg] String || Div _content - Conteúdo para inserir dentro da Div

	Se o argumento for um objeto Div;
		Seta o parentDiv do argumento igual a essa Div;
		Pega o código HTML do argumento e insere dentro dessa Div;
	
	Caso o argumento seja uma String;
		Insere a string dentro dessa Div;

	Retorna essa Div;

	**/

	this.appendOnInnerContent = function(_content)
	{	

		if(this.getjQueryObject() && _content.getScript){

			_content.setParentDiv( this );
			this.innerContent += _content.getScript();
			this.getjQueryObject().append( _content.getScript() );

		}else{
		
			if(_content.getScript){

				_content.setParentDiv(this);
				this.innerContent += _content.getScript();

			}else if(typeof _content == "string"){

				this.getjQueryObject().html(_content);
				this.innerContent += _content;

			}

		}
		
		return this;

	}

	/**
	
	- setAttribute

	Seta atributos na Div.

	[arg1] String _attribute - nome do atributo
	[arg2] String _value 	 - valor do atributo

	Insere  o argumento na Array attributes;
	Se a tag ja estiver no DOM, insere o atributo nela;

	Retorna essa Div.

	**/

	this.setAttribute = function(_attribute, _value)
	{
		this.attributes.push([_attribute, _value]);
		if(this.getjQueryObject()) this.getjQueryObject().attr(_attribute, _value);

		return this;
	
	}

	/**
	
	- appendOnDiv

	Insere essa Div dentro de outra.

	[arg] String || Div _div - Div aonde essa Div será inserida

	Seto o argumento como parentDiv dessa Div;
	O argumento pode ser um objeto Div ou apenas um ID;

	Retorna essa Div.
	
	**/

	this.appendOnDiv = function(_div)
	{
		
		this.setParentDiv(_div);

		if(_div.getjQueryObject){

			_div.getjQueryObject().append(this.getScript());

		}else if($(_div)){

			_div.append(this.getScript());

		}
		
		return this;

	}

	/**
	
	- writeInnerAndAppendOnDiv

	Insere um conteúdo na Div e a insere em outra Div.

	[arg1] String _innerContent - conteúdo dessa Div
	[arg2] Div _divWhereAppend 	- Div aonde inserir essa Div

	Insere conteúdo dentro dessa Div;
	A insere como conteúdo da Div recebida como argumento;

	Retorna essa Div.

	**/

	this.writeInnerAndAppendOnDiv = function(_innerContent, _divWhereAppend)
	{

		this.appendOnInnerContent(_innerContent);
		_divWhereAppend.appendOnInnerContent(this);

		return this;

	}

	/**
	
	- setParentDiv

	Seta o objeto Div ParentDiv.

	[arg] Div _div - valor de parentDiv

	**/

	this.setParentDiv = function(_div)
	{

		this.parentDiv = _div;

	}

	/**
	
	- getParentDiv

	Retorna o objeto Div parentDiv;

	**/

	this.getParentDiv = function()
	{

		return this.parentDiv;

	}

	/**
	
	- getInnerContent

	Retorna o conteúdo interno da Div;

	**/

	this.getInnerContent = function()
	{

		return this.innerContent;

	}

	/**
	
	- getAttribute

	Retorna uma string contendo o código HTML dos atributos.

	Cria uma String contendo o código HTML de todos atributos na Array attributes;

	Retorna a String criada.

	**/

	this.getAttribute = function()
	{

		var attributesToWrite = new String();

		for(var w = 0; w < this.attributes.length; w++) {

			attributesToWrite += (this.attributes[w][0] + "='" + this.attributes[w][1] + "'")

		}

		return attributesToWrite;
	
	}

	/**
	
	- getjQueryObject

	Retorna o objeto Jquery da DIV.

	**/

	this.getjQueryObject = function()
	{

		if( $("#" + this.id).html ) {

			return $("#" + this.id)

		}else{

			return false ;

		}

	}

	/**

	- getScript 

	Retorna uma String com o codigo HTML da tag.

	**/

	this.getScript = function()
	{
		return  "<" + this.tag + " id='" + this.id + "' class='" + this.class + "' " 
					+ this.getAttribute()
					+ ">" + this.getInnerContent() + "</" + this.tag + ">";

	}


	/**
	
	- show

	Faz animação de Fade In na Div;

	[arg] Function _callBack - função para executar após finalizar a animação

	Usando o objeto static Animate, executa a animação de Fade In passando a função de callback como argumento;

	**/

	this.show = function(_callBack){

		Div.animate.fadeIn(this, _callBack);

	}

	/**
	
	- hide

	Faz animação de Fade Out na Div;

	[arg] Function _callBack - função para executar após finalizar a animação

	Usando o objeto static Animate, executa a animação de Fade Out passando a função de callback como argumento;

	**/

	this.hide = function(_callBack){

		Div.animate.fadeOut(this, _callBack);
	}
	

	/**
	
	- enable

	Habilita/desabilita clique na div;

	[arg] Boolean _boolean - (true) habilita / (false) desabilita

	Pega o objeto jQuery dessa Div e altera a opacidade e o atributo CSS pointer-events;

	**/

	this.enable = function(_boolean)
	{

		this.getjQueryObject().css('opacity', (_boolean) ? '1' : '0.5');
		this.getjQueryObject().css('pointer-events', (_boolean) ? 'auto' : 'none'); 

	}

	/**
	
	- newID

	Adicona um número randomico no fim do ID da Div;

	**/

	this.createID = function(){

		this.id = ( this.id + ( Math.floor( ( Div.serie += 1 ) * Math.random() * 100 ) ) );

	}

	/**

	- remove

	**/	

	this.remove = function()
	{

		this.getjQueryObject().remove();

	}

	//
	//
	//

	this.create();

}
