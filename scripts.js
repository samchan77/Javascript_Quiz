
// start
$(".btn-dark").on("click", function () {
    // remove homepage from view 
    $(".card").hide();
    console.log("user clicked start");
    //Get the first question
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 120")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();
    document.getElementById('userInput').value = " ";
})

// reset
$(".btn-secondary").on("click", function () {
    console.log("user clicked Restart");
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 120")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;

    quizQuestion.getQuestion();
})

$("#submitInitials").on("click", function () {
    console.log("user clicked submit initials for high scores");
    $(".highScorePage").show();
    quizQuestion.highScorePage();
})

$("#resetScores").on("click", function () {
    console.log("user clicked reset high scores");
    localStorage.clear();
    $("#hsArray").hide();
})

$("#goBack").on("click", function () {
    console.log("user clicked to return from high scores high scores");
    clearInterval(quizQuestion.countDownTimer);
    $(".question-display").hide();
    $("#button-display").hide();
    $(".highScorePage").hide();
    $(".card").show();
    $(".timer").show();
    $(".timer").html("Time: 120");

    $(".highScore").show();
    $("#hsArray").empty();

})


$(".highScore").on("click", function () {
    console.log("user clicked highScore");
    quizQuestion.counter = 0;
    quizQuestion.highScorePage();
})


$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e); 
    var selectedAnswer = $(e.target).attr("data-name");
    console.log(e);
    console.log(e.target);
    console.log(e.target.data);
    console.log($(e.target).attr("data-name"));
    quizQuestion.checkAnswer(selectedAnswer);
})

var Counter = 0;
var hrLine = document.createElement("hr");
var highScore = 0;
var quizQuestion = {
    // current question
    currentQuestion: "",
    // correct answers 
    correctGuesses: 0,
    // incorrect answers 
    incorrectGuesses: 0,
    // counter 
    counter: 0,
    countDownTimer: null,
    // question number 
    questionNumber: 0,


    questions: [
        {
            // Questions from W3Schools.com
            questionText: "The JavaScript syntax defines two types of values - fixed and variables.",
            questionAnswer: ["<true>", "<false>"],
            
            answer: "<true>",
        },
        {
            questionText: "In JavaScript, these are containers for data values.",
            questionAnswer: ["Operators", "Events", "Variables", "Objects"],
            answer: "Variables",
        },
        {
            questionText: 'The CSS box model is a box that wraps around every HTML element. It consists of:',
            questionAnswer: ['<margins and borders >', '<content>', '<padding>', '<all of the above>'],
            answer: '<all of the above>',
        },
        {
            questionText: 'Use a "div" element with class .jumbotron to create a jumbotron',
            questionAnswer: ['<true>', '<false>'],
            answer: '<true>',
        },
        {
            questionText: 'Single line comments in JavaScript can be done with the use of:',
            questionAnswer: ['<$$>', '<\\>' , '<//>', '<##>'],
            answer: '<//>'

        }
    
    ],

    run: function () {
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        quizQuestion.counter = 120;
    },

    decrement: function () {
        quizQuestion.counter--;
        $(".timer").html("Time: " + quizQuestion.counter);
        if (quizQuestion.counter <= 0) {
            $("#timeout")[0].play();
            quizQuestion.counter = 0;
            clearInterval(quizQuestion.countDownTimer);
            quizQuestion.finalPage();
            
            //$("#initials").html("Sorry!  You timed out.")
            $(".question-display").hide();
            $("#button-display").hide();
        }
    },

    getQuestion: function () {
        
        // clear and hide a bunch of things when the question loads
        $(".question-display").empty();
        $(".areYouRight").empty();
        $(".ready").empty();
        // display question 
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>");
        this.buttonGenerator();
    },
    
    buttonGenerator: function () {
        //empty buttons 
        $("#button-display").empty();
        // for loop to display answer buttons on the screen 
        
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            $("#button-display").append("<li>");
            var a = $("<button>");
            a.addClass("answerButton");
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]);
            a.text(this.questions[this.questionNumber].questionAnswer[i]);
            //display button
            $("#button-display").append(a);  
            $("#button-display").append("</li>");          
        };
    },

    checkAnswer: function (selectedAnswer) {
        //determine if the answer is correct 
        console.log(this.questions[this.questionNumber]);

        if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");
            $("#win")[0].play();
            // increment the number correct 
            this.correctGuesses++;
            console.log(this.correctGuesses);
            // display win message with teal hr
            $(".areYouRight").html("<hr id='win'/>Correct!");
            // next question 
            this.questionNumber++;
        }
        else {
            $("#lose")[0].play();
            console.log("lose");
            // increment incorrect guess 
            this.incorrectGuesses++;
            console.log(this.incorrectGuesses);
            //Deduct 5 seconds for incorrect answer
            quizQuestion.counter = quizQuestion.counter - 10;
            // display lose message with red hr
            $(".areYouRight").html("<hr id='lose'/> Wrong!");
            // next question   
            this.questionNumber++;
        }
        this.answerPage();
    },
    
    answerPage: function () {
        // check for last question
        setTimeout(function () {
            if (quizQuestion.questionNumber < quizQuestion.questions.length) {
                quizQuestion.getQuestion();
            }
            else {
                quizQuestion.finalPage();
            }
        }, 1000
        )
    },

    viewHighScore: function () {
        $(".highScore").html("Highscore: " + highScore);
    },

    finalPage: function () {
        // empty and hide divs
        $(".question-display").empty();
        
        $("#button-display").empty();
        $(".areYouRight").empty();
        $(".timer").hide();
        $(".final-page").show();
        $("#message").html("<h2>All done!</h2><p>Here are your results:</p>");
        $("#score").html("Your final score is " + quizQuestion.counter);
        $("#correct").html("Correct Guesses: " + this.correctGuesses);
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses);
        clearInterval(quizQuestion.countDownTimer);
    },
    highScorePage: function () {
        // Hide elements on page for highScorePage Element
        clearInterval(quizQuestion.countDownTimer);
        
        $(".card").hide();
        $(".final-page").hide();
        $(".timer").hide();
        $(".timer").html("Time: 75")
        $(".highScore").hide();
        $(".question-display").hide();
        $("#button-display").hide();
        $(".highScorePage").show();
        $("#hsArray").show();
        
        console.log("completed highScore Page");

        
        var boxValue = document.getElementById('userInput').value.toUpperCase().substring(0, 4); 
        //boxValue = document.getElementById('userInput').value.substring(0, 3);
        if (boxValue == false){
            console.log("no value entered for initials:" + boxValue);
            boxValue = "***";
        };
        
        const scoreValues = {
            score: quizQuestion.counter,   
            initials: boxValue   
        };

        const MAX_HIGH_SCORES = 5;

        console.log(scoreValues);
        
        const highScoresArray = JSON.parse(localStorage.getItem("highScoresArray")) || [];
        console.log(highScoresArray);
        
        highScoresArray.push(scoreValues);
        console.log(highScoresArray);
  
        highScoresArray.sort((a, b) => b.score - a.score);
        console.log(highScoresArray);
      
        highScoresArray.splice(5);
        
        localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
        console.log(highScoresArray);

        // Create the list
        const highScoresList = document.getElementById("#hsArray");
        const highScores = JSON.parse(localStorage.getItem("highScoresArray")) || [];

            highScoresArray.map(scoreValues => {
                if(scoreValues.score !=0){
                console.log(scoreValues.initials + " --- " + scoreValues.score);
                $("#hsArray").append('<li>' + scoreValues.initials + " --- " + scoreValues.score + '</li>');
                }
            });
    }
}