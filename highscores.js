const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<ol type="1" class="high-score">${score.name} - ${score.score}</ol>`
}).join("")