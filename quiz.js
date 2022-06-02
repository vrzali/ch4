const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 75
let questionCounter = 0
let availableQuestions = []
let allAnswersIncorrect = true;

let questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        choice1: 'Strings',
        choice2: 'Booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer:3,
    },
    {
        question: 'The condition in an if/else statement is enclosed with _______.',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parenthesis',
        choice4: 'square brackets',
        answer:3,
    },
    {
        question: 'Arrays in JavaScript can be used to store ______.',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer:4,
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1: 'JavaScript',
        choice2: 'terminal/bash',
        choice3: 'for looops',
        choice4: 'console.log',
        answer:4,
    }
]

const MAX_QUESTIONS = 4

decreaseTimer = () => {
    score = score - 1
    if (score < 0) {
        score = 0;
    }
    document.getElementById("score").innerHTML = score
}

startGame = () => {
    questionCounter = 0
    score = 75
    availableQuestions = [...questions]
    setInterval(decreaseTimer, 1000)
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        if (allAnswersIncorrect) {
            score = 0
        }
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'incorrect') {
            score = score - 10;
        } else if (classToApply === 'correct') {
            allAnswersIncorrect = false;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

startGame()