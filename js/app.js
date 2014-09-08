var gameApp = angular.module('gameApp', ['ngRoute']);

gameApp.config(function($routeProvider, $locationProvider, $provide) {
    //$locationProvider.hashPrefix('');
    $routeProvider

      // route for the home page
      .when('/', {
        templateUrl : 'home.html',
        controller  : 'mainController'
      })

      // route for the game page
      .when('/game', {
        templateUrl : 'game.html',
        controller  : 'gameController'
      })

      // route for the game over page
      .when('/game-over', {
        templateUrl : 'game-over.html',
        controller  : 'mainController'
      })

      // default
      .otherwise({
        redirectTo: '/'
      });
  });

gameApp.controller('mainController', ['$scope', '$location', function($scope, $location){
  $scope.setRoute = function(route){
    $location.path(route);
  };
}])

gameApp.controller('gameController', ['$scope', '$location', 'game', function($scope, $location, game){
  $scope.setRoute = function(route){
    $location.path(route);
  };
    $scope.beginGame = game.startGame;
    $scope.beginGame();
}])

gameApp.service('game', function(){
  $.noConflict();
    // dom elements
        var leftNumber = jQuery('#leftNumber');
        var rightNumber = jQuery('#rightNumber');
        var timerEl = jQuery('#timer')        
        var left = jQuery('.left');
        var right = jQuery('.right');
        var counter = 0;
        var numbers = {};
        var level = 1;
        var timer = 30;
        var gameLevel = 1;

    //get random number

    function random(min, max) {
          var min = min;
          var max = max;
          var rand = min + Math.random()*(max+1-min);
          rand = rand^0;
          return rand; 
        };

    // create new random numbers 
    // check for difficulty level
    function populate() {
        if (gameLevel == 1) {
            populateFirstLevel();
          }

        if (counter === 30) {
          gameLevel = 2;
          populateSecondLevel();
        }
    };

      // first level

      function populateFirstLevel(){
        numbers.leftNum =  random(1,100);
        leftNumber.html(numbers.leftNum);
        numbers.rightNum =  random(1,100);
        if (numbers.rightNum === numbers.leftNum){
          numbers.rightNum =  random(1,100);
        }
          rightNumber.html(numbers.rightNum);
      };

      //second level

      function populateSecondLevel (argument) {
        numbers.leftFirstNum =  random(1,100);
        numbers.leftSecondNum =  random(1,100);

        leftNumber.html(numbers.leftFirstNum + " - " + numbers.leftSecondNum);

        numbers.leftNum =  numbers.leftFirstNum - numbers.leftSecondNum;

        numbers.rightFirstNum =  random(1,100);
        numbers.rightSecondNum =  random(1,100);

        rightNumber.html(numbers.rightFirstNum + " - " + numbers.rightSecondNum);

        numbers.rightNum =  numbers.rightFirstNum - numbers.rightSecondNum;
      }

         function repopulate () {
            populate();
            var numbers = {};
          };

          function getScore(){
            var check = true;
            counter++;
            myCounter.update();
            setTimeout(function(){
              repopulate();
            }, 100);
          }

          function gameLost(){
            var check = false;
            alert ('You lose! Your score is ' + counter);
            myCounter.stop();
            return counter;
          };

           function getResult (a, b) {
            var result = (a > b) ? getScore() : gameLost();
            return result;
          };

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
                //timerEl.animate({'transform': 'scale(1.3)'}, 300);
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

            this.update = function () {
              seconds ++;
            }
          }

          var myCounter = new Countdown({  
              seconds: timer,  // number of seconds to count down
              onUpdateStatus: function(sec){ // callback for each second
                timerEl.html(":" + sec);
              }, 
              onCounterEnd: function(){ 
                console.log('Game Over');
              }// final action
              
          });

        return {
      startGame : function(){    
        
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
      

      myCounter.start();
      populate();
    }
  }
  
});




