'use strict'

let questionNumber = 0;
let score = 0;
let wrongAnswer = 0;

function renderStartPage() {
    if (questionNumber > STORE.length) {
        renderResults();
    } else if (questionNumber === 0) {
        $('main').html(`<section role="region" id="quizStart" role="section">
    		<img src="images/MHLogo.png" alt="Monster Hunter logo"/>
			<h1>Test your knowledge!</h1>
			<button type="button" id="startButton">Embark!</button>
		</section>`);
    } else {
        renderQuestionPage();
    }

}
function renderResults() {
    if (score >= 8) {
        $('main').html(`
			<section role="region" id="quizResults">
				<h1>You passed the quiz!</h1>
				<ul class="finalScore">
					<li>Score: ${score} /10</li>
					<li>Wrong: ${wrongAnswer} /10<li>
				</ul>
			</section>
			<p><button id="restartButton">Restart</button></p>
		`);
    } else {
        $('main').html(`
			<section role="region" id="quizResults">
				<h1>In Monster Hunter, if you die more than twice than you fail the mission. I have decided to stay true to this convention. Please try again!</h1>
				<ul class="finalScore">
					<li>Score: ${score} /10</li>
					<li>Wrong: ${wrongAnswer} /10<li>
				</ul>
			</section>
			<p><button id="restartButton">Restart</button></p>
		`)
    }
}
function renderQuestionPage() {
    $('main').html(`
			<section role="region" class="statusBar">
				<ul>
					<li>Question: ${questionNumber} /10</li>
					<li>Score: ${score} /10</li>
					<li>Wrong: ${wrongAnswer} /10<li>
				</ul>
			</section>
			<section role="region" class="quizForm question-${questionNumber - 1}">
				<form>
				<fieldset>
				<legend><h2>${STORE[questionNumber - 1].question}</h2>
				</legend>
					${_.shuffle(STORE[questionNumber - 1].answers).map(a => `<label class="answerOption">
			    <input type="radio" value="${a}" name="answer" required>
			    ${a} <br />
			    </label>`).join('')}
				</fieldset>
				<input type="submit" class="submitButton" value="Submit" />
				</form>
			</section>
			`)

};
function determineUserAnswer() {
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber - 1].correctAnswer}`;
    if (answer === correctAnswer) {
        score++;
        $('main').html(`
			<section role="region" class="statusBar">
				<ul>
					<li>Question: ${questionNumber} /10</li>
					<li>Score: ${score} /10</li>
					<li>Wrong: ${wrongAnswer} /10<li>
				</ul>
			</section>
			<section role = "region" class="quizFeedback">
				<div class="icon">
					<img src="${STORE[questionNumber - 1].icon}" alt="${STORE[questionNumber - 1].alt}">
					<p>You got it right!</p>
				</div>
				<button type = "button" class="nextButton">Next</button>
			</section>
			`);
    } else {
        wrongAnswer++;
        $('main').html(`
			<section role="region" class="statusBar">
				<ul>
					<li>Question: ${questionNumber} /10</li>
					<li>Score: ${score} /10</li>
					<li>Wrong: ${wrongAnswer} /10<li>
				</ul>
			</section>
			<section role = "region" class="quizFeedback">
				<div class="icon">
					<img src="${STORE[questionNumber - 1].icon}" alt="${STORE[questionNumber - 1].alt}">
					<p>You got it wrong!<br />
				</div>
						The correct answer is "${correctAnswer}"</p>
				<button type = "button" class="nextButton">Next</button>
			</section>
			`);
    }
};


function intializeEvents() {
    $('main').on('click', '.nextButton', function () {
      	questionNumber++;
        renderStartPage();
    });

    $('main').on('submit', 'form', function (event) {
        event.preventDefault();
        
        determineUserAnswer();
    });

    $('main').on('click', '#startButton', function () {
        questionNumber++;
        renderQuestionPage();
    });
    $('main').on('click', '#restartButton', function(){
    	questionNumber = 0;
    	score=0;
    	wrongAnswer=0;
    	renderStartPage();
    })

}

function initializeQuiz() {
    renderStartPage();
    intializeEvents();
}
$(window).ready(function() {initializeQuiz() })