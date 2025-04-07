// https://opentdb.com/api.php?amount=10&category=12&type=multiple


const _question = document.getElementById('question')
const _options = document.querySelector('.quiz-options');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');


let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

//listeners
function eventListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;

});

async function loadQuestion(){
    const APIURLI = 'https://opentdb.com/api.php?amount=10&category=12&type=multiple';
    const result = await fetch(`${APIURLI}`);
    const data = await result.json();
    _result.innerHTML = "";
    showQuestion(data.results[0]);
}

//Kysymykset ja vaihtoehdot
function showQuestion(data){
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;

    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);


    _question.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`;
    _options.innerHTML =`${optionsList.map((option, index) => `<li> ${index + 1}. <span> ${option} </span> </li>
        `).join('')}
    `;

    selectOption();
}

//Valitseminen
function selectOption(){
    _options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');

        });
    });
    
    console.log(correctAnswer);
}

function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p> <i class = "fas fa-check"></i>Oikea Vastaus!</p>`
        } else {
           _result.innerHTML = `<p> <i class = "fas fa-times"></i>Väärä Vastaus!</p> <p> <small> <b>Oikea vastaus: </b> ${correctAnswer}</small></p>`
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Valitse vaihtoehto </p>`;
        _checkBtn.disabled = false;
    }
}

function HTMLDecode(textString){
let doc =new DOMParser().parseFromString(textString, "text/html");
return doc.documentElement.textContent;
}


//Valuen 5000 muuttaminen saataa räjäyttää API:n koska tämän request limit on tosi pieni
function checkCount(){
    askedCount++
    setCount();
    if(askedCount == totalQuestion){
        _result.innerHTML = `<p> Pisteesi ovat ${correctScore}. </p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";

    }else{
        setTimeout(() => {
            loadQuestion();
        }, 5000);
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}