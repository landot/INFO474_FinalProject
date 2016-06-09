var introApp = angular.module('introApp',[]);

introApp.controller('introController', ['$scope', '$window', function($scope, $window) {
  console.log("loaded angular!!!?");
  $scope.intro = true;
  $scope.firstBlock = true;
  $scope.secondBlock = false;
  $scope.thirdBlock = false;
  $scope.fourthBlock = false;
  $scope.fifthBlock = false;
  $scope.visualization = false;
  
   $scope.showBlock2 = function() {
     $scope.firstBlock = false;
     $scope.secondBlock = true;
   }

  $scope.showBlock3 = function() {
    $scope.secondBlock = false;
    $scope.thirdBlock = true;
  }

  $scope.showBlock4 = function() {
    $scope.thirdBlock = false;
    $scope.fourthBlock = true;
  }
  
  $scope.showBlock5 = function() {
    $scope.fourthBlock = false;
    $scope.fifthBlock = true;
  }
  
  $scope.october = true;
  $scope.november = false;
  $scope.december = false;
  $scope.january = false;
  $scope.february = false;
  
  $scope.show = function(value) {
    console.log(value);
    if (value == "October") {
      $scope.october = true;
      $scope.november = false;
      $scope.december = false;
      $scope.january = false;
      $scope.february = false;
    }
    if (value == "November") {
      $scope.october = false;
      $scope.november = true;
      $scope.december = false;
      $scope.january = false;
      $scope.february = false;
    }
    if (value == "December") {
      $scope.october = false;
      $scope.november = false;
      $scope.december = true;
      $scope.january = false;
      $scope.february = false;
    }
    if (value == "January") {
      $scope.october = false;
      $scope.november = false;
      $scope.december = false;
      $scope.january = true;
      $scope.february = false;
    }
    if (value == "February") {
      $scope.october = false;
      $scope.november = false;
      $scope.december = false;
      $scope.january = false;
      $scope.february = true;
    } 
  }

  $scope.showoctober = function() {
    console.log("showing october");

  }
  
  $scope.shownovember = function() {
    console.log("showing november");

  }
  
  $scope.showdecember = function() {
    console.log("showing december");

  }
  
  $scope.showjanuary = function() {
    console.log("showing january");

  }
  
  $scope.showfebruary = function() {
    console.log("showing february");

  }
  
 $scope.showIntro = function() {
   $window.location.href = './visualization.html';
  }
}]);