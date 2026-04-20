const questions = [
    { q: "What is 7 × 8?", a: [54, 56, 62, 48], correct: 56 },
    { q: "Calculate: 120 ÷ 5", a: [20, 22, 24, 25], correct: 24 },
    { q: "What is the square root of 144?", a: [10, 11, 12, 14], correct: 12 },
    { q: "Solve: 15 + (3 × 4)", a: [27, 72, 32, 45], correct: 27 },
    { q: "What is 9 squared?", a: [18, 72, 81, 99], correct: 81 },
    { q: "25% of 200 is...", a: [40, 50, 60, 25], correct: 50 },
    { q: "What is 1000 - 345?", a: [655, 665, 755, 645], correct: 655 },
    { q: "Solve: 2^4", a: [8, 12, 16, 32], correct: 16 },
    { q: "What is 11 × 11?", a: [111, 121, 131, 141], correct: 121 },
    { q: "If 3x = 21, what is x?", a: [6, 7, 8, 9], correct: 7 }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionEl = document.getElementById('question-text');
const answerButtonsEl = document.getElementById('answer-buttons');
const resultBox = document.getElementById('result-box');
const questionBox = document.getElementById('question-box');
const scoreText = document.getElementById('score-text');
const timerText = document.getElementById('seconds');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    resultBox.classList.add('hide');
    questionBox.classList.remove('hide');
    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.q;

    currentQuestion.a.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', () => selectAnswer(answer, currentQuestion.correct));
        answerButtonsEl.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(selected, correct) {
    if (selected === correct) score++;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    questionBox.classList.add('hide');
    resultBox.classList.remove('hide');
    scoreText.innerText = `You scored ${score} out of ${questions.length}!`;
}

document.getElementById('restart-btn').addEventListener('click', startQuiz);

startQuiz();