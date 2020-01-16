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

            let classes = $('.container .cards #flip-container-'+i+' .flipper .back img').attr('class').split(' ');
            
            if (classes.length > 1) {
                continue;
            } else {
                return 0;
            }

        }

        clearInterval(interval);

        $('.container #modal .modal-body p').text('Elapsed time: '+$('.container header #timer').text());

        modalEndGame();

    }

    const compareCards = () => {

        compare = 0;
        avalible = 0;

        if (openCards[0].attr('src') == openCards[1].attr('src')) {

            if (openCards[0].attr('class') != openCards[1].attr('class')) {
                
                openCards[0]
                    .addClass('locked')
                    .parent()
                        .parent()
                            .click(false);

                openCards[1]
                    .addClass('locked')
                    .parent()
                        .parent()
                            .click(false);

                endGame();
                
            }

            openCards.splice(0, openCards.length);
            avalible = 1;

        } else {

            setTimeout(() => {
                for (let i = 0; i < 2; i++) {
                    openCards[i]
                    .parent()
                        .parent()
                            .css('transform', 'rotateX(360deg)');
                }

                openCards.splice(0, openCards.length);

                avalible = 1;
                
            }, 800);
        
        }
        
        
    }

    const timer = () => {

        if (time[2] < 59) {

            time[2]++;

        } else {

            if (time[1] < 59) {

                time[1]++;
                time[2] = 0;

            } else {

                time[0]++;
                time[1] = 0;
                time[2] = 0;
                
            }

        } 

        let timeFormatted = time.map((item) => {

                if (item.toString().length < 2) {

                    item = "0" + item.toString();

                }

            return item.toString();
        });

        timeFormatted = timeFormatted.join(':');

        $(".container header #timer p").text(timeFormatted);
    }

    let interval = setInterval(timer, 1000);

    const clickFlip = () => {
        for (let i = 1; i <= 32; i++) {
            $('.container .cards #flip-container-'+i).click(() => {

                if (avalible) {
                    compare++;
                
                    $('.container .cards #flip-container-'+i+' .flipper').css('transform', 'rotateX(180deg)');

                    openCards.push($('.container .cards #flip-container-'+i+' .flipper .back img'));

                    if (compare == 2) {

                        compareCards();
                
                    }
                }
                

            })
        }
    }

    const randImage = () => {

        let arrayImages = Array();
        let arrayCards = Array();
        let quantItemArrayImage = 16;
        let quantItemArrayCard = 32;
        let numImageRand;
        let numCardRand;

        for (let i = 0; i < 16; i++) {
            arrayImages.push('assets/img/faces/'+i+'.svg');
        }

        for (let i = 1; i <= 32; i++) {
            arrayCards.push($('.container .cards #flip-container-'+i+' .flipper .back img'));
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
        $('.container #modal-credits').click(() => {
            $('.modal-container')
                .css('display', 'flex')
                .hide()
                .fadeIn('fast')
        });

        $('.modal-container .modal-footer button').click(() => {
            $('.modal-container').fadeOut('fast')
        })
    }

    const darkmodeBg = () => {
        
        $('.container').toggleClass('darkmode');

        try {
            $('.container header h1 span').toggleClass('title-darkmode');
        } catch (error) {
            console.log("oi");
        }
    }

    const darkmode = () => {
        $('.container header #darkmode').click(() => {
            
            $('.container header #darkmode #lever').toggleClass('move-lever');
            darkmodeBg();

        });
    }

    darkmode();

    modalCredits();

    clickFlip();
    
    randImage();

});