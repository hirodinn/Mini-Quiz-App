const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High Tech Modern Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  },
  {
    question: "Which is used for Connect To Database?",
    options: ["PHP", "HTML", "JS", "All"],
    answer: "PHP"
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    optionsEl.appendChild(li);
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  }
});

loadQuestion();
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

let score = 0;
let timer;
let timeLeft = 15;

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = `Time: ${timeLeft}s`;
  timer = setInterval(updateTimer, 1000);

  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectAnswer(li, currentQuiz.answer));
    optionsEl.appendChild(li);
  });
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = `Time: ${timeLeft}s`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    nextQuestion();
  }
}

function selectAnswer(selected, correctAnswer) {
  const allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(option => option.style.pointerEvents = "none");

  if (selected.textContent === correctAnswer) {
    selected.classList.add("correct");
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    selected.classList.add("wrong");
    allOptions.forEach(option => {
      if (option.textContent === correctAnswer) option.classList.add("correct");
    });
  }
}
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  finalScoreEl.textContent = `${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";
  document.getElementById("quiz").classList.remove("hidden");
  resultEl.classList.add("hidden");
  loadQuestion();
});

loadQuestion();

