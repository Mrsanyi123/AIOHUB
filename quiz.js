const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const timeText = document.querySelector(".time_left_txt");
const timeCount = document.querySelector(".timer_sec");
const nextBtn = document.querySelector(".next_btn");
const bottomQuesCounter = document.querySelector(".total_que");

let timeValue = 15, queCount = 0, queNumb = 1, userScore = 0, counter, counterLine;

startBtn.onclick = () => infoBox.classList.add("activeInfo");
infoBox.querySelector(".quit").onclick = () => infoBox.classList.remove("activeInfo");
infoBox.querySelector(".restart").onclick = startQuiz;
nextBtn.onclick = nextQuestion;

function startQuiz() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
    startTimerLine(0);
}

function showQuestions(index) {
    const queText = document.querySelector(".que_text");
    const question = questions[index];
    queText.innerHTML = `<span>${question.numb}. ${question.question}</span>`;
    optionList.innerHTML = question.options.map(opt => `<div class="option"><span>${opt}</span></div>`).join('');
    optionList.querySelectorAll(".option").forEach(opt => opt.onclick = () => optionSelected(opt));
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);

    const userAns = answer.textContent;
    const correcAns = questions[queCount].answer;
    answer.classList.add(userAns === correcAns ? "correct" : "incorrect");
    answer.insertAdjacentHTML("beforeend", `<div class="icon ${userAns === correcAns ? 'tick' : 'cross'}"><i class="fas fa-${userAns === correcAns ? 'check' : 'times'}"></i></div>`);

    if (userAns !== correcAns) {
        [...optionList.children].forEach(opt => {
            if (opt.textContent === correcAns) opt.classList.add("correct");
        });
    }

    [...optionList.children].forEach(opt => opt.classList.add("disabled"));
    nextBtn.classList.add("show");
    if (userAns === correcAns) userScore++;
}

function nextQuestion() {
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        resetTimer();
        resetTimerLine();
        timeText.textContent = "Time Left";
        nextBtn.classList.remove("show");
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score_text");
    scoreText.innerHTML = `<span>and ${userScore > 3 ? 'congrats! 🎉' : userScore > 1 ? 'nice 😎' : 'sorry 😐'}, You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
}

function startTimer(time) {
    counter = setInterval(() => {
        timeCount.textContent = time < 10 ? `0${time}` : time;
        if (--time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            showCorrectAnswer();
            nextBtn.classList.add("show");
        }
    }, 1000);
}

function startTimerLine(time) {
    counterLine = setInterval(() => {
        document.querySelector(".time_line").style.width = `${++time}px`;
        if (time > 549) clearInterval(counterLine);
    }, 29);
}

function showCorrectAnswer() {
    const correcAns = questions[queCount].answer;
    [...optionList.children].forEach(opt => {
        if (opt.textContent === correcAns) opt.classList.add("correct");
        opt.classList.add("disabled");
    });
}

function queCounter(index) {
    bottomQuesCounter.innerHTML = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
}

function resetTimer() {
    clearInterval(counter);
    startTimer(timeValue);
}

function resetTimerLine() {
    clearInterval(counterLine);
    startTimerLine(0);
}
