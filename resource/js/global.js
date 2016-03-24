

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
	
	
var myVar = false;
function movePersonagem(personagem, x, y, speed){
	
	console.log(typeof myVar );
	if(typeof myVar != "boolean") return;
	$(personagem).css("transition-property","top, left");
	$(personagem).css("transition-duration","0.7s");
	var dist = 32;
	var targetX = x*dist;
	var targetY = y*dist;
	dist = dist/4;
	
	var posTop = parseInt($(personagem).css("top"));
	var posLeft = parseInt($(personagem).css("left"));
	
	$(personagem).attr("data-position" , "andando");
		myVar = setInterval(function(){ 
		var personagem = $("#ian");
		if(personagem.length <= 0 ) {alert("não existe!"); return;}
		var frame = parseInt($(personagem).attr("data-frame"));
		$(personagem).attr("data-frame", (frame+1));
		if($(personagem).attr("data-frame") > 1){
			$(personagem).attr("data-frame" , "0");
		}		
		
		if(targetX > posLeft) {
			posLeft += dist;
			$(personagem).attr("data-direction" , "direita");
		} else if(targetX < posLeft) {
			posLeft -= dist;
			$(personagem).attr("data-direction" , "esquerda");
		}
		else if(targetY > posTop) {
			posTop +=  dist;
			$(personagem).attr("data-direction" , "baixo");
		} else if(targetY < posTop) {
			posTop -= dist;
			$(personagem).attr("data-direction" , "cima");
		} else {
			clearInterval(myVar);
			myVar = false;
			$(personagem).attr("data-position" , "parado");
			$(personagem).attr("data-frame" , "0");
			ianText("Cheguei!",0);
			return; 
		}

		$(personagem).css("top", posTop+"px");
		$(personagem).css("left", posLeft+"px");
		
	}, 400);

}

	$("#ian").css("top","64px");
	$("#ian").css("left","64px");
	movePersonagem("#ian",3,3,1);
	
	
	$("[id^='obj-'").on("click", function(){
		
		var obj = $(this).attr("id").substr(4);
		ianText(obj,0);
		
		objList = {
			"cama" : [3,4],
			"telefone" : [3,2],
			"janela" : [4,2],
			"computador" : [2,2],
			"estante" : [1,2]
		
		}
		
		movePersonagem("#ian", objList[obj][0], objList[obj][1], 1)
		//ianText("Clickou no "+objList[obj][0],0);
		
	});
	
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
	
