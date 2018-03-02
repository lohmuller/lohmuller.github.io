/**
 Insere texto no balão de mensagem do personagem
 **/
function ianText(text,time){
    ballonText('ian', text,time)
    //	$(".bubble").textillate({ in: { effect: 'rollIn' } });
}

function ballonText(idCharacter, text,time){
	$("#textbox").css("display","none");
	if(text != null && text.length > 0) {
		$("#textbox").css("display","");
		$("#textbox").text(text);
	}
//    $("#"+idCharacter).find(".bubble").text(text);
//    $("#"+idCharacter).find(".bubble").css('display', '');
}

var mapArray = [
    [1,1,1,1,1,1,1],
    [1,0,2,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1]
];

var tilesize = 64;

function drawMap() {
    for (var y = 0; y < mapArray.length; y++) {
        for (var x = 0; x < mapArray[y].length; x++) {
            var posx = x * tilesize;
            var posy = y * tilesize;
            if (parseInt(mapArray[y][x]) == 2) {
                addPersonagem('ian', 'ian',posx,posy);
            }
            else if (parseInt(mapArray[y][x]) == 1) {
 //               var tile = new createjs.Bitmap('images/tile2.png');
            }
        }
    }
}

function addPersonagem(id, sprite, posX, posY) {
    console.log('adiciounou #'+id);
    var model = $("#modelo-personagem").html();
    model = model.replace('{{sprite}}', sprite);
    model = model.replace('{{id}}', id);
    model = $($.parseHTML(model));
    $("#cenario").append(model);
    $("#"+id).css("top",posY+"px");
    $("#"+id).css("left",posX+"px");
}

drawMap();


var myVar = false;
function movePersonagem(personagem, x, y, eventCallback){
    personagem = "#"+personagem;

    if(typeof myVar != "boolean") return;
    $(personagem).css("transition-property","top, left");
    $(personagem).css("transition-duration","0.7s");
    var dist = tilesize;
    var targetX = x*dist;
    var targetY = y*dist;
    dist = dist/4;

    var posTop = parseInt($(personagem).css("top"));
    var posLeft = parseInt($(personagem).css("left"));

    $(personagem).attr("data-position" , "andando");

    if (eventCallback !== undefined)
    eventCallback('start', personagem);

    myVar = setInterval(function(){
        var personagem = $("#ian");
        if(personagem.length <= 0 ) {console.error("não existe!"); return;}
        var frame = parseInt($(personagem).attr("data-frame"));
        $(personagem).attr("data-frame", (frame+1));
        if($(personagem).attr("data-frame") > 1){
            $(personagem).attr("data-frame" , "0");
        }

        if(targetX > posLeft) {
            posLeft += dist;
            virarPersonagem(personagem, "direita");
        } else if(targetX < posLeft) {
            posLeft -= dist;
            virarPersonagem(personagem, "esquerda");
        }
       // else if(targetY + dist > posTop || targetY - dist > posTop) {
			
			else if(targetY > posTop) {
				posTop +=  dist;
				virarPersonagem(personagem, "baixo");
			} else if(targetY < posTop) {
				posTop -= dist;
				virarPersonagem(personagem, "cima");
			} else {
				clearInterval(myVar);
				myVar = false;
				$(personagem).attr("data-position" , "parado");
				$(personagem).attr("data-frame" , "0");

				if (eventCallback !== undefined)
				eventCallback('finish', personagem);
				return;
			}
		/*}else {
				clearInterval(myVar);
				myVar = false;
				$(personagem).attr("data-position" , "parado");
				$(personagem).attr("data-frame" , "0");

				if (eventCallback !== undefined)
				eventCallback('finish', personagem);
				return;
			}*/


        $(personagem).css("top", posTop+"px");
        $(personagem).css("left", posLeft+"px");
        if (eventCallback !== undefined)
        eventCallback('walked', personagem);

    }, 250);
}

function virarPersonagem (personagem, direction){
    //personagem = "#"+personagem;
    $(personagem).attr("data-direction" , direction);
}


movePersonagem('ian', 3, 3, function(event, personagem){


    if (event == '') {

    }
    if(event == 'finish') {
        ianText("Bem vindo ao meu Portfolio!",0);
    }

});



$("[id^='obj-']").on("click", function(){

    var obj = $(this).attr("id").substr(4);



    objList = {
        "cama" : [2,3],
        "telefone" : [2,1],
        "janela" : [3,1],
        "computador" : [1,1],
        "estante" : [0,1]
    }

    var txtTmp = {
        cama : "Hmmm!",
        telefone : "Opa! Vamos entrar em contato",
        computador : "Sobre mim!",
        estante : "Meus projetos!",
    }

    var callback = {
        "cama" : function(event, personagem) {
            if(event == 'finish') {
                ianText("ZZZzzz",0);
            }
        },
        "telefone" : function(event, personagem) {
            if(event == 'finish') {
				virarPersonagem(personagem, "cima");
				$("#textbox").css("display","none");
              //  $("[href='#contato']").trigger("click");
            }
        },
        "janela" : function(event, personagem) {
			if(event == 'finish') {
				virarPersonagem(personagem, "cima");
            }
		},
        "computador" : function(event, personagem) {
            if(event == 'finish') {
				virarPersonagem(personagem, "cima");
				$("#textbox").css("display","none");
                $("[href='#sobre']").trigger("click");
            }
        },
        "estante" : function(event, personagem) {
            if(event == 'finish') {
				virarPersonagem(personagem, "cima");
				$("#textbox").css("display","none");
                $("[href='#projetos']").trigger("click");
            }
        },
    }

    ianText(txtTmp[obj],0);

    movePersonagem("ian", objList[obj][0], objList[obj][1], callback[obj]);

});


