$(function(){

    let time = Array(0, 0, 0);
    let compare = 0;
    let openCards = Array();
    let avalible = 1; //Variavel de controle para que o card seja marcada apenas quando os ultimos estiverem ocultos

    $('.container #modal').hide();

    const modalEndGame = () => {
        $('.container .background-modal').fadeIn();
        $('.container #modal').fadeIn();
    }

    const endGame = () => {

        for (let i = 1; i <= 32; i++) {

            let classes = $('.container .cards #flip-container-'+i+' .flipper .back img').attr('class').split(' '); //Transformando classes da img em um array
            
            if (classes.length > 1) {
                continue;
            } else {
                return 0;
            }

        }

        clearInterval(interval); //Se todos possuirem duas classes (x, locked) o jogo termina

        $('.container #modal .modal-body p').text('Elapsed time: '+$('.container header #timer').text());

        modalEndGame();

    }

    const compareCards = () => {

        compare = 0; //Contador de cartas viradas - se for dois, esta na hora de comparar
        avalible = 0; //Semafora para bloquear a escolha de cartas enquanto duas ainda esta para cima ou sendo guardadas

        if (openCards[0].attr('src') == openCards[1].attr('src')) {

            if (openCards[0].attr('class') != openCards[1].attr('class')) { //Sendo o caminho igual, se possuirem classes distintas (0, 1) elas sao pares - sendo assim e evitado o erro de clicar na mesma carta e bloquela
                
                openCards[0]
                    .addClass('locked')
                    .parent()
                        .parent()
                            .click(false); //Removendo a funcao de click da carta

                openCards[1]
                    .addClass('locked')
                    .parent()
                        .parent()
                            .click(false); //Removendo a funcao de click da carta

                endGame(); //Verificar se o jogo ja terminou
                
            }

            openCards.splice(0, openCards.length); //Removendo cartas abertas
            avalible = 1; //Liberando semaforo

        } else {

            setTimeout(() => {
                for (let i = 0; i < 2; i++) {
                    openCards[i]
                    .parent()
                        .parent()
                            .css('transform', 'rotateX(360deg)'); //Se nao forem iguais, elas rotacionam para posicao anterior
                }

                openCards.splice(0, openCards.length); //Removendo cartas abertas
                avalible = 1; //Liberando semaforo
                
            }, 800);
        
        }
        
    }

    const timer = () => { //Cronometro

        if (time[2] < 59) {

            time[2]++; //Segundos

        } else {

            if (time[1] < 59) {

                time[1]++; //Minutos
                time[2] = 0;

            } else {

                time[0]++; //Horas
                time[1] = 0;
                time[2] = 0;
                
            }

        } 

        let timeFormatted = time.map((item) => {

                if (item.toString().length < 2) {

                    item = "0" + item.toString(); //Adicionando 0 para os horarios com um digito

                }

            return item.toString();
        });

        timeFormatted = timeFormatted.join(':');

        $(".container header #timer p").text(timeFormatted); //Adicionado hora no dom
    }

    const clickFlip = () => {

        for (let i = 1; i <= 32; i++) {

            $('.container .cards #flip-container-'+i).click(() => { //Funcao quando card for clicado

                if (avalible) { //Semaforo bloqueando o click se estiver indisponivel

                    compare++;
                
                    $('.container .cards #flip-container-'+i+' .flipper').css('transform', 'rotateX(180deg)'); //Girando card

                    openCards.push($('.container .cards #flip-container-'+i+' .flipper .back img')); //Adicionando ao vetor de cards para cima

                    if (compare == 2) {

                        compareCards(); //Comparar os cards abertos
                
                    }
                }
                
            })
        }
    }

    const randImage = () => {

        let arrayImages = Array(); //Array de caminho de imagens
        let arrayCards = Array(); //Array de cards
        let quantItemArrayImage = 16; //Valor maximo para sortear um num aleatorio para escolher a imagem
        let quantItemArrayCard = 32; //Valor maximo para sortear um num aleatorio para escolher o card
        let numImageRand;
        let numCardRand;

        for (let i = 0; i < 16; i++) {
            arrayImages.push('assets/img/faces/svg/'+i+'.svg'); //Adicionando imagens ao array
        }

        for (let i = 1; i <= 32; i++) {
            arrayCards.push($('.container .cards #flip-container-'+i+' .flipper .back img')); //Adicionando cards ao array
        }

        for (let i = 0; i < 16; i++) {

            numImageRand = Math.floor(Math.random() * quantItemArrayImage); //Sorteando numero aleatorio para escolher imagem aleatoria
            
            numCardRand = Math.floor(Math.random() * quantItemArrayCard); //Sorteando numero aleatorio para escolher card aleatorio
            
            arrayCards[numCardRand].attr('src', arrayImages[numImageRand]); //Adicionando imagem no card
            arrayCards[numCardRand].attr('class', '0'); //Classe para distinguir do outro card com a mesma imagem

            arrayCards.splice(numCardRand, 1); //Removendo card que ja possui imagem do array
            quantItemArrayCard--;

            numCardRand = Math.floor(Math.random() * quantItemArrayCard); //Sorteando numero aleatorio para escolher card aleatorio
            arrayCards[numCardRand].attr('src', arrayImages[numImageRand]); //Adicionando a mesma imagem em outro card
            arrayCards[numCardRand].attr('class', '1'); //Classe para distinguir do outro card com a mesma imagem
            
            arrayCards.splice(numCardRand, 1); //Removendo card que ja possui imagem do array
            quantItemArrayCard--;

            arrayImages.splice(numImageRand, 1); //Removendo imagem que ja foi utilizada
            quantItemArrayImage--;

        }

    }

    const modalCredits = () => {

        $('.container #modal-credits').click(() => { //Ativando modal creditos

            $('.modal-container')
                .css('display', 'flex')
                .hide()
                .fadeIn('fast');

        });

        $('.modal-container .modal-footer button').click(() => { //Desativando modal creditos

            $('.modal-container').fadeOut('fast')

        })
    }

    const darkmodeChange = () => { //Alteracoes a serem feitas no darkmode

        $('.container').toggleClass('darkmode'); //Cor de fundo da pagina

        $('.container header h1 span').toggleClass('title-darkmode'); //Cor do texto "memory"

        $('.container #modal-credits button').toggleClass('button-darkmode'); //Cor do botao modal

        $('.container #play a button').toggleClass('button-darkmode'); //Cor do botao iniciar game

        $('.container header #darkmode #lever').toggleClass('lever-darkmode'); //Cor da alavanca para ativar darkmode

        $('.container header #darkmode').toggleClass('container-lever-darkmode'); //Cor do container da alavanca para ativar darkmode

        $('.container header #darkmode #lever').toggleClass('move-lever'); //Deslocamento da alavanca

        $('.container header #exit a i').toggleClass('darkmode'); //Cor do botao para sair do jogo

    }

    const darkmode = () => {

        $('.container header #darkmode').click(() => { //Ativar/desativar darkmode
            
            darkmodeChange(); //Alteracoes a serem feitas

            if ($('.container header #darkmode').css('background-color') == "rgb(0, 0, 0)") { //Darkmode desativado

                localStorage['darkmode'] = false; //Varivel se sessao recebe false para que a pagina do game nao recebe darkmode

            } else {

                localStorage['darkmode'] = true; //Varivel se sessao recebe true para que a pagina do game recebe darkmode

            }

        });

    }

    let darkmodeActive = localStorage['darkmode']; //Obtendo variavel de sessao
    
    if (darkmodeActive == "true") { //Se o darkmode estiver ativo, a pagina do game tambem recebera o estilo
        
        darkmodeChange();

    }

    let interval = setInterval(timer, 1000);

    darkmode();

    modalCredits();

    clickFlip();
    
    randImage();
    
});