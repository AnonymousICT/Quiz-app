const state = {
	currentQuestion:-1,
	currentScore:0
};
//the first thing the user sees
function getStartPage() {
	return `<section id="quizStart" role="section">
					<h1>Test your knowledge!</h1>
					<button type="button" id="startButton" class='col-2'>Embark!</button>
			</section>`

}

//upon hitting the start button this will bring up the question for the quiz
function getQuestionPage() {
	if (state.currentQuestion < STORE.length) {
		return `<div class="questionAnswerForm question-${state.currentQuestion}">
    		<h2>${STORE[state.currentQuestion].question}</h2>
		    <form>
		    <fieldset>
		    	${STORE[state.currentQuestion].answers.map(a => `<label class="answerOption">
			    <input type="radio" value="${a}" name="answer" required>
			    ${a} <br />
			    </label>`).join('')}
			    
		    	<button type="submit" class="submitButton">Submit Answer</button>

		    </fieldset>
		    </form>
	    </div>`; //copy and paste if form is okay
	} else {
		renderResults();
		restartQuiz();
		$('.state.currentQuestion').text(10)
	}
};

function userSubmitAnswer() {
	$('form').submit(function(event){
		event.preventDefault();
		 let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[state.currentQuestion].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
	});
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[state.currentQuestion].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[state.currentQuestion].icon}" alt="${STORE[state.currentQuestion].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[state.currentQuestion].correctAnswer}`;
  // let iconImage = `${STORE[state.currentQuestion].icon}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[state.currentQuestion].icon}" alt="${STORE[state.currentQuestion].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  changeScore();
  $('.score').text(state.currentScore);
}

function changeScore() {
	state.currentScore ++;
}

function changeQuestionNumber () {
	state.currentQuestion++;
	$('.questionNumber').text(state.currentQuestion);
}

function renderNextQuestion() {
	$('main').on('click', '.nextButton', function() {
		alert('this works')
	renderContent();
	changeQuestionNumber();
	userSubmitAnswer();
	});
}
// function userSubmitAnswer2() {
// 	$('main').on('click', '.submitButton', function() {
// 		event.preventDefault();
// 		alert('potato');
// 	});
// }

function startQuiz(){
	state.currentQuestion++;
	//here
	renderContent();
}
function renderContent(){
	if(state.currentQuestion < 0) {
		renderMain(getStartPage());
	}else{
		renderMain(getQuestionPage());
	}
}
function renderMain(markup) {
	$('main').html(markup)
}

function initializeQuiz() {
	$('body').on('click','#startButton',function() {
		startQuiz();
		userSubmitAnswer();
		renderNextQuestion();
	})

	renderContent();
}

$(window).ready(() => {
	initializeQuiz()
});