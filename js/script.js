$(function(){

    let time = Array(0, 0, 0);

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

    setInterval(timer, 1000);

    const clickFlip = () => {
        for (let i = 1; i <= 32; i++) {
            $('.container .cards #flip-container-'+i).click(() => {
                
                $('.container .cards #flip-container-'+i+' .flipper').css('transform', 'rotateX(180deg)');

            })
        }
    }

    const randImage = () => {

        let arrayImages = Array();
        let arrayCards = Array();
        let quantItemArrayImage = 15;
        let quantItemArrayCard = 31;
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

            arrayCards.splice(numCardRand, 1); //Removendo card que ja possui imagem do array
            quantItemArrayCard--;

            numCardRand = Math.floor(Math.random() * quantItemArrayCard); //Sorteando numero aleatorio para escolher card aleatorio
            arrayCards[numCardRand].attr('src', arrayImages[numImageRand]); //Adicionando a mesma imagem em outro card
            
            arrayCards.splice(numCardRand, 1); //Removendo card que ja possui imagem do array
            quantItemArrayCard--;

            arrayImages.splice(numImageRand, 1); //Removendo imagem que ja foi utilizada
            quantItemArrayImage--;

        }

    }

    clickFlip();
    
    randImage();

});