
/**

classe responsável pela tela final no mobile.

**/


// MobileResult.animate = new Animate();

function MobileResult()
{	Div.call(this, "MobileResult", "MobileResult MediumColor"); //Extends DIV
		
	var _that = this;

	/**

	- create (construtor)

	**/

	this.create = function()
	{	

        this.appendOnDiv( $( "body" ) );
        this.writeContent();
		this.show();

    }
    
    /**

	- writeContent

	**/

	this.writeContent = function()
	{

		var container = new Div("MobileContainer", "MobileContainer");

        new Div("title", "Label BigFont", "p").writeInnerAndAppendOnDiv("Orçamento gerado!", container);
        container.appendOnInnerContent( new Button( "Editar", "editResult", "Button DarkColor DarkColorHover" ) );
		container.appendOnInnerContent( new Button( "Enviar por e-mail", "sendMail", "Button DarkColor DarkColorHover" ) );

        container.appendOnDiv(this);

    }
    
    this.sendMail = function()
    {



    }

	//
	//
	//

	this.create();

}