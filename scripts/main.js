// Getting all the required elements
const start_btn = $(".start_btn button");
// const start_btn = $("button");
const rule_box = $(".rule_box");
const exit_btn = $(".buttons .quit_quiz");
// const exit_btn = $("button .quit_quiz");
const commence_btn = $(".buttons .start_quiz");
// const commence_btn = $("button .start_quiz");
const quiz_box = $(".quiz_box");
const timeCounter = $(".timer_sec");
const timer_visual_line = $(".timer_visual_line");
const quit_quiz_completely_btn = $(".quit_quiz_completely");
const start_quiz_again_btn = $(".start_quiz_again");

// Start Quiz Clicked
start_btn.click(e => {
    rule_box.addClass("activeRule");
});

// // Start Quiz Clicked
// $(".start_btn").on('click', start_btn, e => {
//     rule_box.addClass("activeRule");
// });

// Exit Button Clicked
exit_btn.click(e => {
    rule_box.removeClass("activeRule");
    // result_box.removeClass("activeResult");
});

// // Exit Button Clicked
// $(".buttons").on('click', exit_btn, e => {
//     rule_box.removeClass("activeRule");
// });

// End Button Clicked At The End
quit_quiz_completely_btn.click(e => {
    window.location.reload();
});

// Restart Button Clicked At The End
start_quiz_again_btn.click(e => {
    window.location.reload();
    // result_box.removeClass("activeResult");

    // setTimeout(quiz_box.addClass("activeQuiz"), 3000);
    // showQuestions(0);
    // questionCounter(1);
    // startTimer(15);
    // timerLine(0);

    // question_count = 0;
    // question_number = 1;
    // timeValue = 15;
    // timeBar = 0;
    // userScore = 0;
});

// Start Button Clicked
commence_btn.click(e => {
    rule_box.removeClass("activeRule");
    quiz_box.addClass("activeQuiz");
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
    timerLine(0);
});  

// // Start Button Clicked
// $(".buttons").on('click', commence_btn, e => {
//     rule_box.removeClass("activeRule");
//     quiz_box.addClass("activeQuiz");
//     showQuestions(0);
//     questionCounter(1);
// });

let question_count = 0;
let question_number = 1;
let counter;
let timeValue = 15;
let timeBar = 0;
let userScore = 0;

const  next_btn = $(".next_btn");
const result_box = $(".result_box");



// Next Button Clicked
next_btn.click(e => {
    if (question_count < questions.length - 1) {
        question_count++;
        question_number++;
    } else {
        showResult();
    }
    showQuestions(question_count);
    questionCounter(question_number);

    clearInterval(counter);
    startTimer(timeValue);

    clearInterval(lineVisual);
    timerLine(timeBar);
    
    next_btn.css("display", "none");

});

function showQuestions(index) {
    const question_text = $(".question_text");
    const option_list = $(".option_list");
    let question_tag = '<span>' + questions[index].number + '. ' + questions[index].question + '</span>'
    let option_tag =    '<div class="option one"><span>' + questions[index].options[0] + '</span></div>' +
                        '<div class="option two"><span>' + questions[index].options[1] + '</span></div>' +
                        '<div class="option three"><span>' + questions[index].options[2] + '</span></div>' +
                        '<div class="option four"><span>' + questions[index].options[3] + '</span></div>';

    question_text.html(question_tag);
    option_list.html(option_tag);

    const option = $(".option").attr("onclick", "optionSelected(this)");
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(lineVisual);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;
    // let allOptions = $(".option_list").children.length;
    
    if (userAnswer == correctAnswer) {
        answer.classList.add("correct")
        userScore += 1;
        console.log(userScore)
    } else {
        // console.log("Too Bad")
        answer.classList.add("wrong")

        // Show correct answer
        if ($(".one").children().html() == correctAnswer) {
            $(".one").attr("class", "correct");
        }

        if ($(".two").children().html() == correctAnswer) {
            $(".two").attr("class", "correct");
        }

        if ($(".three").children().html() == correctAnswer) {
            $(".three").attr("class", "correct");
        }

        if ($(".four").children().html() == correctAnswer) {
            $(".four").attr("class", "correct");
        }
    }

    // Disable options after first selection
    $(".option").addClass("disable");

    next_btn.css("display", "block");
}

function showResult() {
    rule_box.removeClass("activeRule");
    quiz_box.removeClass("activeQuiz");
    result_box.addClass("activeResult");

    const scoreText = $(".score_text");
    if (userScore < (questions.length / 4)) {
        let useScore_tag = '<span>Unfortunately, you only got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.html(useScore_tag);
    } else if (userScore < (questions.length / 2)) {
        let useScore_tag = '<span>Not bad, you got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.html(useScore_tag);
    } else if (userScore < ((questions.length / 4) * 3)) {
        let useScore_tag = '<span>Good Job, you got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.html(useScore_tag);
    } else {
        let useScore_tag = '<span>Congratulation, you got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.html(useScore_tag);
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCounter.html(time);
        time--;

        if (time < 0) {
            clearInterval(counter);
            timeCounter.html(0);
            // Disable options when timer runs out
            $(".option").addClass("disable");
            next_btn.css("display", "block");
        }
    }
}

let lineWidth;
let lineFraction;

function timerLine(timeLength) {
    lineVisual = setInterval(visualLine, 1000);
    timer_visual_line.css("background", "#007bff");

    function visualLine() {
        lineFraction = ((timeLength / timeValue) * 100) + "%";
        lineWidth = timer_visual_line.css("width", lineFraction);
        // console.log(lineFraction)
        if (lineFraction == "80%") {
            timer_visual_line.css("background", "#d41a2d");
        }
        timeLength++;

        if (timeLength > timeValue) {
            clearInterval(lineVisual);
        }
    }
}

function questionCounter(question_number) {
    const bottom_counter = $(".total_questions");
    let totalQuestion_tag = '<span><p>' + question_number + '</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_counter.html(totalQuestion_tag);
}