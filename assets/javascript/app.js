//page load
$(document).ready(function () {

  //on start button click
  $("#start").on("click", function (event) {
    event.preventDefault();

    //starting trivia
    triviaObj.startTrivia();

  });

});

//  creating an object.
var triviaObj = {

  timeTofinish: 10,
  objsubSet: 0,
  intervalId: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  unattented: 0,

  questions: {
    q1: 'Name of the screen that recognizes touch input is :',
    q2: 'Computer Moniter is also known as :',
    q3: 'Identify the device through which data and instructions are entered into a computer?',
    q4: 'Arrange in ascending order the units of memory TB, KB, GB, MB',
    q5: "Which one of these stores more data than a DVD ?",
    q6: 'The output shown on the computer monitor is called?',
    q7: "Eight Bits make up a",
    q8: "Which one is the result of the output given by a computer?",
    q9: "Which one of these also known as read/write memory ?",
    q10: "The printed output from a computer is called?"
  },
  options: {
    q1: ['Recog screen', 'Point Screen', 'Touch Screen', 'Android Screen'],
    q2: ['DVU', 'UVD', 'VDU', 'CCTV'],
    q3: ['Software', 'Output device', 'Input device', 'Memory'],
    q4: ['TB>MB>GB>KB', 'MB>GB>TB>KB', 'TB>GB>MB>KB', 'GB>MB>KB>TB'],
    q5: ['CD Rom', 'Blue Ray Disk', 'Floppy', 'Red Ray Disk'],
    q6: ['Soft Copy', 'VDU', 'Hard Copy', 'Screen Copy'],
    q7: ['byte', 'megabyte', 'kilobyte', 'None'],
    q8: ['Data', 'Instruction', 'Excursion', 'Information'],
    q9: ['ROM', 'RAM', 'DVD', 'Hard Disk'],
    q10: ['Copy', 'Soft Copy', 'Paper', 'Hard Copy']
  },
  answers: {
    q1: 'Touch Screen',
    q2: 'VDU',
    q3: 'Input device',
    q4: 'TB>GB>MB>KB',
    q5: 'Blue Ray Disk',
    q6: 'Soft Copy',
    q7: 'byte',
    q8: 'Information',
    q9: 'ROM',
    q10: 'Hard Copy'
  },

  startTrivia: function () {

    //resetting variables
    timeTofinish = 10;
    objsubSet = 0;
    intervalId = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    unattented = 0;

    // hide the start button
    $("#start").hide();

    //set the timer in html
    $('#timer').text("Time Remaining : " + triviaObj.timeTofinish + " seconds");
    // call for the question
    triviaObj.questionCall();

  },
  // get question with option and answer
  questionCall: function () {

  
    //question , options , answer
    var getQuestions = Object.values(triviaObj.questions)[triviaObj.objsubSet];
    var getOptions = Object.values(triviaObj.options)[triviaObj.objsubSet];
    var getAnswer = Object.values(triviaObj.answers)[triviaObj.objsubSet];

    //creating html element for question 
    var newQuestionElem = $("<p>").text(triviaObj.objsubSet + 1 + '. ' + getQuestions);
    $("#questionDiv").append(newQuestionElem);
    // creating html element for options
    var optionsElemDiv = $("<div>").addClass("list-group");
    $("#questionDiv").append(optionsElemDiv);
    // for each options
    $.each(getOptions, function (index, key) {

      var optionsElem = $('<a>').addClass("list-group-item list-group-item-action list-group-item-dark option").attr("data-name", key).text(key);
      optionsElemDiv.append(optionsElem);

    })
    //setinterval
    triviaObj.intervalId = setInterval(triviaObj.count, 1000);
    //on click of option
    $(".option").on("click", function () {

      //check the result
      triviaObj.checkResult($(this).attr('data-name'), getAnswer);
      //timer for the result page
      triviaObj.timeTofinish = 2;

    });

  },

  nextquestionCcall: function () {

    // increment to next question set
    triviaObj.objsubSet++;

    $('#results').hide();

    $('#questionDiv').empty();

    $('#questionDiv').show();

    // begin next question
    triviaObj.questionCall();

  },
  checkResult: function (userGuess, answer) {


    //if answer is correct
    if (userGuess === answer) {

      triviaObj.correctAnswers++;
      clearInterval(triviaObj.intervalId);
      $('#results').html('<h3>Correct Answer!</h3>');

    }// if answer is wrong
    else {

      triviaObj.wrongAnswers++;
      clearInterval(triviaObj.intervalId);
      $('#results').html('<h3>Wrong Answer!</h3>');

    }

    $('#questionDiv').hide();
    $('#results').show();
    triviaObj.intervalId = setInterval(triviaObj.delay, 1000);

  },// timer function
  count: function () {

    //decrement timer
    triviaObj.timeTofinish--;
    $('#timer').text("Time Remaining : " + triviaObj.timeTofinish + " seconds");

    //if unattented
    if (triviaObj.timeTofinish === 0) {

      triviaObj.unattented++;
      clearInterval(triviaObj.intervalId);
      $('#questionDiv').hide();
      $('#results').show();
      $('#results').html('<h3>Time Up!</h3>');
      triviaObj.timeTofinish = 2;
      triviaObj.intervalId = setInterval(triviaObj.delay, 1000);

    }// if all questions over
    else if (triviaObj.objsubSet === Object.keys(triviaObj.questions).length) {
      $('#questionDiv').hide();
      clearInterval(triviaObj.intervalId);
    
      $('#results').html('<h4>Number of Correct Answers: ' + triviaObj.correctAnswers +
        '</h4><h4>Number of Wrong Answers: ' + triviaObj.wrongAnswers +
        '</h4><h4>Un-attented: ' + triviaObj.unattented + '</h4>');
      
      $('#timer').empty();
      $('#results').show();
      $("#start").text('PLAY AGAIN').show();


    }
  },//Timer for the alerts and call next question
  delay: function () {

    triviaObj.timeTofinish--;
    if (triviaObj.timeTofinish === 0) {

      clearInterval(triviaObj.intervalId);
      triviaObj.timeTofinish = 11;
      //call next question
      triviaObj.nextquestionCcall();

    }


  }
};






















