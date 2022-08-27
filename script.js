const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startingMinutes = 5;
const quizResults = document.getElementById('Quiz-Results');
var numberOfQuestionsAnswered = 0;
var numbersOfQuestionsRight = 0;


var time = 5 * 60, // timer code
  start = Date.now(),
  mins = document.getElementById('minutes'),
  secs = document.getElementById('seconds'),
  timer;



function countdown() {
  var timeleft = Math.max(0, time - (Date.now() - start) / 1000),
    m = Math.floor(timeleft / 60),
    s = Math.floor(timeleft % 60);

  mins.firstChild.nodeValue = m;
  secs.firstChild.nodeValue = s;

  if (timeleft == 0) clearInterval(timer);
}

timer = setInterval(countdown, 200);

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  numberOfQuestionsAnswered = 0;
  numbersOfQuestionsRight = 0;
  quizResults.innerText = '';
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) { // show question code
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}



function selectAnswer(e) { // select answer code
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct === 'true' ){
    numbersOfQuestionsRight = numbersOfQuestionsRight + 1;
  }
  
  numberOfQuestionsAnswered = numberOfQuestionsAnswered + 1;
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    quizResults.innerText = 'Questions: '+ numberOfQuestionsAnswered + ' Correct: '+ numbersOfQuestionsRight;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


function resetState() {
  // var finalScoreEl = document.getElementById('final-score')
  // finalScoreEl.textContent = time

  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

const questions = [ // list of questions 
  {
    question: 'What does the h1 stand for in HTML?',
    answers: [
      { text: 'A car model', correct: false },
      { text: 'Html', correct: false },
      { text: 'horse', correct: false },
      { text: 'header', correct: true }

    ]
  },
  {
    question: 'What is HTML?',
    answers: [
      { text: 'Hypertext Markup Language, a standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages.', correct: true },
      { text: 'An object-oriented computer programming language commonly used to create interactive effects within web browsers.', correct: false },
      { text: 'A domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system.', correct: false },
      { text: 'A high-level, interpreted, general-purpose programming language.', correct: false }
    ]
  },
  {
    question: 'What does Js stand for?',
    answers: [
      { text: 'JavaScript', correct: true },
      { text: 'Jump', correct: false },
      { text: 'Juice', correct: false },
      { text: 'Jungle', correct: false },

    ]
  },
  {
    question: 'What is Vs Code?',
    answers: [
      { text: 'A type of coding language', correct: false },
      { text: 'A code editor', correct: true }
    ]
  }
]