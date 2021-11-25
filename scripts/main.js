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
});

// // Exit Button Clicked
// $(".buttons").on('click', exit_btn, e => {
//     rule_box.removeClass("activeRule");
// });

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

const  next_btn = $(".next_btn");

// Next Button Clicked
next_btn.click(e => {
    if (question_count < questions.length - 1) {
        question_count++;
        question_number++;
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

function questionCounter(question_number) {
    const bottom_counter = $(".total_questions");
    let totalQuestion_tag = '<span><p>' + question_number + '</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_counter.html(totalQuestion_tag);
}


function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(lineVisual);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;
    // let allOptions = $(".option_list").children.length;
    
    if (userAnswer == correctAnswer) {
        answer.classList.add("correct")
        // console.log("Correct Answer")
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
        lineFraction = Math.ceil(100 - ((timeLength / timeValue) * 100)) + "%";
        lineWidth = timer_visual_line.css("width", lineFraction);
        // console.log(lineFraction)
        if (lineFraction == "20%") {
            timer_visual_line.css("background", "#d41a2d");
        }
        timeLength++;

        if (timeLength > timeValue) {
            clearInterval(lineVisual);
        }
    }
}