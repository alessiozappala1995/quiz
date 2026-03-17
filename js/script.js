const quiz = [
  {
    question: "In che anno è stata lanciata la prima air max?",
    answers: ["1980", "1987", "1990", "1995"],
    correct: 1
  },
  {
    question: "A quale struttura architettonica si ispira la prima air max 1?",
    answers: ["Centre Pompidou", "Westminster", "Reichstag", "Duomo di Milano"],
    correct: 0
  },
  {
    question: "In quale occasione viene lanciata Vapormax?",
    answers: ["30° anniversario", "20°", "10°", "15°"],
    correct: 0
  },
  {
    question: "Chi ha creato Air max 1?",
    answers: ["Bowerman", "Knight", "Hatfield", "Johnson"],
    correct: 2
  },
  {
    question: "In quale paese ha avuto maggior successo air Max 98?",
    answers: ["Germania", "Svizzera", "Australia", "Giappone"],
    correct: 3
  },
  {
    question: "La tomaia ondulata di Air max TN a cosa si ispira?",
    answers: ["Alle palme delle spiagge della Florida", "Alle onde del mare", "Alla pelle di un serpente", "Al vento"],
    correct: 0
  },
  {
    question: "In quale anno viene inaugurata la prima air max 90 in collaborazione con Off White?",
    answers: ["2015", "2017", "2020", "2022"],
    correct: 1
  },
  {
    question: "In che giorno viene celebrato l’air max day?",
    answers: ["26 marzo", "30 aprile", "26 maggio", "17 febbraio"],
    correct: 0
  },
  {
    question: "A chi venne l’idea di ideare la tecnologia Air?",
    answers: ["Da un professore di Harvard", "Da un chirurgo canadese", "Da un coach di pallacanestro", "Da un ingegnere della Nasa"],
    correct: 3
  },
  {
    question: "Quale Air max ha introdotto la versione FlyEase?",
    answers: ["Air max plus", "Air max 97", "Air max 90", "Vapormax"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let time = 60;
let timerInterval;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");

function loadQuestion() {
  resetState();
  startTimer();

  const q = quiz[currentQuestion];
  questionEl.textContent = q.question;
  progressEl.style.width = ((currentQuestion / quiz.length) * 100) + "%";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("answer-btn");
    btn.onclick = () => selectAnswer(index);
    answersEl.appendChild(btn);
  });
}

function startTimer() {
  time = 60;
  timerEl.style.display = "block";
  timerEl.textContent = "Tempo: " + time;

  timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = "Tempo: " + time;

    if (time <= 0) {
      clearInterval(timerInterval);
      autoFail();
    }
  }, 1000);
}

function autoFail() {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  // evidenzia solo la risposta corretta
  buttons[quiz[currentQuestion].correct].classList.add("correct");

  // messaggio chiaro di timeout
  const feedback = document.createElement("p");
  feedback.textContent = `⏱ Tempo scaduto! La risposta corretta era: ${quiz[currentQuestion].answers[quiz[currentQuestion].correct]}`;
  feedback.style.color = "orange";
  feedback.style.fontWeight = "bold";
  feedback.style.marginTop = "10px";

  answersEl.appendChild(feedback);
  nextBtn.style.display = "block";
}

function resetState() {
  clearInterval(timerInterval);
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
}

function selectAnswer(index) {
  clearInterval(timerInterval);

  const q = quiz[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");

  let feedback = document.createElement("p");
  feedback.style.fontWeight = "bold";
  feedback.style.marginTop = "10px";

  buttons.forEach((btn, i) => {
    if (i === q.correct) btn.classList.add("correct");
    else btn.classList.add("wrong");
    btn.disabled = true;
  });

  if (index === q.correct) {
    score++;
    feedback.textContent = "✅ Corretto!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `❌ Sbagliato! La risposta corretta era: ${q.answers[q.correct]}`;
    feedback.style.color = "red";
  }

  answersEl.appendChild(feedback);
  nextBtn.style.display = "block";
}

// passa alla prossima domanda o mostra punteggio finale
nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  questionEl.textContent = `SCORE: ${score} / ${quiz.length}`;
  answersEl.innerHTML = "";
  progressEl.style.width = "100%";
  timerEl.style.display = "none";

  nextBtn.textContent = "RESTART";
  nextBtn.style.display = "block";
  nextBtn.onclick = () => location.reload();
}

// avvia il quiz
loadQuestion();
