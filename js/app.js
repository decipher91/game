$.noConflict();

//might me a good idea to wrap
//jQuery( document ).ready(function( $ ) {

// dom elements
  var leftNumber = jQuery('#leftNumber');
  var rightNumber = jQuery('#rightNumber');
  
  var left = jQuery('.left');
  var right = jQuery('.right');

//initial values

  /*jQuery(window).load(function() {
    populate();
    //var startTimer = setInterval(gameTimer, 1000); //1000 will  run it every 1 second
});*/

  var counter = 0;
  var numbers = {};
  var level = 1;
  var timer = 30;

//functions

function random (min, max) {
  var min = min;
  var max = max;
  var rand = min + Math.random()*(max+1-min);
  rand = rand^0;
  return rand; 
  };

  function populate() {
  numbers.leftNum =  random(1,100);
  leftNumber.html(numbers.leftNum);
  numbers.rightNum =  random(1,100);
  if (numbers.rightNum === numbers.leftNum){
    numbers.rightNum =  random(1,100);
  }
  rightNumber.html(numbers.rightNum);
  }

function repopulate () {
  populate();
  var numbers = {};
};

function getScore(){
  var check = true;
      counter++;
      myCounter.seconds = myCounter.seconds + 10;
      setTimeout(function(){
        repopulate();
      }, 100);
}

function gameLost(){
    var check = false;
    alert ('You lose! Your score is ' + counter);
};

function getResult (a, b) {
  var result = (a > b) ? getScore() : gameLost();
  return result;
}

//game mechanics
  
  //check clicks

  left.on('click', function() {
    getResult(numbers.leftNum, numbers.rightNum);
  });

  right.on('click', function() {
    getResult(numbers.rightNum,numbers.leftNum);
  });

  // and also key events

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        getResult(numbers.leftNum, numbers.rightNum);
    }
    else if (e.keyCode == '39') {
        // right arrow
        getResult(numbers.rightNum,numbers.leftNum);
    }
}

document.onkeydown = checkKey;

// timer 
/*

function gameTimer(){
  timer--;
  if (timer <= 0){
     clearInterval(timer);
     //counter ended
     alert('Time\'s up! Your score is ' + counter);
     return;
  }

  timerEl.html(":" + timer);
}

*/
var timerEl = jQuery('#timer') 


// game levels 

function checkLvl () {
  if (counter === 30) level ++;
  if (counter === 60) level ++; 
}

function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    if (seconds < 29){
      // animation goes here!!!!
      timerEl.animate({'transform': 'scale(1.3)'}, 300);
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}

var myCounter = new Countdown({  
    seconds: timer,  // number of seconds to count down
    onUpdateStatus: function(sec){ // callback for each second
      timerEl.html(":" + sec);      
    }, 
    onCounterEnd: function(){ alert('Time\'s up! Your score is ' + counter);}// final action
    
});

myCounter.start();

//});