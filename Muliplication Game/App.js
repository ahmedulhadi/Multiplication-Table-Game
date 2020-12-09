var playing = false;
var score;
var action;
var timeremaining;
var correctAnswr;
var wrongAnswer;
// when click started 
document.getElementById('startreset').onclick = function () {
    // if we are playing
    if (playing == true) {
        location.reload(); // reload page
        
    } else {// if we are not playing
        //chang to playing
        playing = true;
        score = 0;
        document.getElementById('score-value').innerHTML = score;
        //show countdown num
        show('timeremaining');
        timeremaining = 100;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide('gameover')

        //change to reset
        document.getElementById('startreset').innerHTML = 'Reset Game';

        // start countdown
        startCountDown()

        //gerate new questions
        generateQA();
    }
}
//clciking on asnwer box

for (i = 1; i < 5; i++) {
    document.getElementById('box' + i).onclick = function () {
        
        // if we playing

        if (playing == true) {
            if (this.innerHTML == correctAnswr) {
                //correct answer
                // console.log('correct runnig..');
                score++
                document.getElementById('score-value').innerHTML = score;
                hide('wrong');
                show('correct')
                setTimeout(function () {
                    hide('correct')
                }, 1500);

                //generate new question
                generateQA();
                // setTimeout(function () {

                // }, 1500);


            } else {
                //wrong answer
                // console.log('wrong runnig..');
                hide('correct');
                show('wrong')
                setTimeout(function () {
                    hide('wrong')
                }, 1500);
            }
        }
    }
}
// functions
function startCountDown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        if (timeremaining == 0) { //gameover
            stopCountDown();
            //show gameover
            show('gameover');
            document.getElementById('gameover').innerHTML = "<p>Game Over!</p> <p>Your Score is " + score + ".</p>"
            //time remaining disappear
            hide('timeremaining');
            hide('correct');
            hide('wrong');
            playing = false;
            document.getElementById('startreset').innerHTML = 'Start Game'

        }
    }, 1000);
}

// stop the counter
function stopCountDown() {
    clearInterval(action)
}

//hide elements
function hide(id) {
    document.getElementById(id).style.display = 'none';
}

//show elements
function show(id) {
    document.getElementById(id).style.display = 'block';
}

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswr = x * y;
    document.getElementById('question').innerHTML = x + 'x' + y;

    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById('box' + correctPosition).innerHTML = correctAnswr // fill one box with correct answer

    //fill others with wrong ans
    var answers = [correctAnswr]
    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()))
            }
            while (answers.indexOf(wrongAnswer) > -1)
            
            document.getElementById('box' + i).innerHTML = wrongAnswer
            answers.push(wrongAnswer)
        }
    }
}



