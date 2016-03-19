

$(document).ready( function(){
	 $("body").removeClass("loader");
	 $("body").addClass("show-page-1");
	//alert("carregou!");
	ianText("Olá",0);
});

/**
Insere texto no balão de mensagem do personagem
**/
function ianText(text,time){	
	$(".bubble").text(text);
	//	$(".bubble").textillate({ in: { effect: 'rollIn' } });
	}
	
