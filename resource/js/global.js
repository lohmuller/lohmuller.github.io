

$(window).on('load', function() {
	 $("body").removeClass("loader");
	 
	 var target = window.location.hash;
	 if(target[0] == "#"){
		 target = target.replace("#", "");
		 $("body").addClass("show-page-"+target);
	 } else {
		$("body").addClass("show-page-inicial");
	 }
	ianText("Olá",0);
	
	$("[href='#sobre']").on("click", function(){
		setPage(this, "sobre");
	});		
	$("[href='#projetos']").on("click", function(){
		setPage(this, "projetos");
	});	
	$("[href='#contato']").on("click", function(){
		setPage(this, "contato");
	});	
	$("[href='#']").on("click", function(){
		setPage(this, "inicial");
	});
	
	
setInterval(function(){ 
	var personagem = $("#ian");
	if(personagem.length <= 0 ) {alert("não existe!"); return;}
	var frame = parseInt($(personagem).attr("data-frame"));
	$(personagem).attr("data-frame", (frame+1));
	if($(personagem).attr("data-frame") > 1){
		$(personagem).attr("data-frame" , "0");
	}
}, 500);

	
});

function setPage(obj, target){	
	sairJogo(obj, target);
}


/**
Insere texto no balão de mensagem do personagem
**/
function ianText(text,time){	
	$(".bubble").text(text);
	//	$(".bubble").textillate({ in: { effect: 'rollIn' } });
}


function sairJogo(obj, target) {
	var config = {}
	if(target == 'inicial'){
				$("body").removeClass("show-page-inicial");
			$("body").removeClass("show-page-sobre");
			$("body").removeClass("show-page-projetos");
			$("body").removeClass("show-page-contato");
			$(".active").removeClass("active");
			$(obj).parents("li").addClass("active");
			$("body").addClass("show-page-"+target);
		config = {
			"left": "0px",
			"opacity": 1
		}
	} else {
		config = {
			"left": "-80px",
			"opacity": -10
		}
	}
	
     $('#cenario').animate(config, 600,	 function(){
			$("body").removeClass("show-page-inicial");
			$("body").removeClass("show-page-sobre");
			$("body").removeClass("show-page-projetos");
			$("body").removeClass("show-page-contato");
			$(".active").removeClass("active");
			$(obj).parents("li").addClass("active");
			$("body").addClass("show-page-"+target);
    });
}



$.getJSON("/projetos/projetos.json", function(data){
	var campoPadrao = $(".projeto-thumb").parent().html();
	$(".projeto-thumb").remove();
	var tempCampo = '';
	$.each(data,function(key,value){
		tempCampo = campoPadrao;
		$.each(value,function(key2,value2){
			tempCampo = tempCampo.replace("{"+key2+"}", value2); 
		});
		$("#pagina-projetos").append(tempCampo);
	});
	

	
});
	
