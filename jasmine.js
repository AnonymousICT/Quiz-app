var qNum = 0;
var score = 0;
$(document).ready(function() {
  // console.log('document is ready');

  $('#mainPage').on('click', '.submitAnswer', function () {
    event.preventDefault();
    var userAnswer = $('input[name="q'+qNum+'"]:checked').val();
    console.log('You submitted an answer for question',qNum,':');

    //check answer
    var correctAnswer = dataStore[qNum].correct;
    // console.log("your answer:",userAnswer,"\ncorrect answer:",correctAnswer)

    if(userAnswer == correctAnswer) {
      feedbackStr = 'Your answer was correct!'
      score++;
    } else {
      feedbackStr = 'Your answer is wrong';
    }

    if (qNum < dataStore.length-1) {
      qNum++;
      renderQuestion(qNum,feedbackStr);
    } else {
      renderResults(score);
    }
  });

  $('button.startQuiz').click(function() {
      // console.log('You started the quiz!');
      renderQuestion(0);
    }
  )

  function renderQuestion(qNum,str) {
    // console.log('Question',qNum,dataStore[qNum]);
    $('#mainPage').html('<h2>Question '+(qNum+1)+':</h2><h3>Current Score: '+score+'/'+(dataStore.length)+'</h3><h3>'+dataStore[qNum].q+':</h3><form>');
    for(var i=0;i<dataStore[qNum].a.length;i++){
      // console.log(i,dataStore[qNum].a[i]);
      // $('#mainPage').append('<p>'+i+': </p>');
      $('#mainPage form').append('<input type="radio" name="q'+qNum+'" value="'+i+'" id="'+dataStore[qNum].a[i]+'" /><label for="'+dataStore[qNum].a[i]+'">'+dataStore[qNum].a[i]+'</label><br />');
    };
    // $('#mainPage form').append('<input class="submitAnswer" type="submit" /></form>');
    $('#mainPage form').append('<button class="submitAnswer">Submit</button>');
    if (str) {
      $('#mainPage').prepend('<div style="background:magenta;border:10px solid black;">'+feedbackStr+'</div>')
    }
  };

  function renderResults(score) {
    let percentage = (score*100.0)/dataStore.length;
    $('#mainPage').html('<h2>Your final score is: '+score+'/'+dataStore.length+' ('+percentage+'%)</h2>');
  }
});