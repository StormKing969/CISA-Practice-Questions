// Getting all the required elements
const start_btn = $(".start_btn button");
const rule_box = $(".rule_box");
const exit_btn = $(".buttons .quit_quiz");
const commence_btn = $(".buttons .start_quiz");
const quiz_box = $(".quiz_box");

// Start Quiz Clicked
start_btn.click(e => {
    rule_box.addClass("activeRule");
});

// Exit Button Clicked
exit_btn.click(e => {
    rule_box.removeClass("activeRule");
});

// Exit Button Clicked
commence_btn.click(e => {
    rule_box.removeClass("activeRule");
    quiz_box.addClass("activeQuiz");
    showQuestions(0);
    questionCounter(1);
});

let question_count = 0;
let question_number = 1;

const  next_btn = $(".next_btn");

// Next Button Clicked
next_btn.click(e => {
    if (question_count < questions.length - 1) {
        question_count++;
        question_number++;
    }
    showQuestions(question_count);
    questionCounter(question_number);
});

function showQuestions(index) {
    const question_text = $(".question_text");
    const option_list = $(".option_list");
    let question_tag = '<span>' + questions[index].number + '. ' + questions[index].question + '</span>'
    let option_tag =    '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
                        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
                        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
                        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    question_text.html(question_tag);
    option_list.html(option_tag);
}

function questionCounter(question_number) {
    const bottom_counter = $(".total_questions");
    let totalQuestion_tag = '<span><p>' + question_number + '</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_counter.html(totalQuestion_tag);
}