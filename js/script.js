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

    clickFlip();
    
    

});