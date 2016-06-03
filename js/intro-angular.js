var introApp = angular.module('introApp',[]);

introApp.controller('introController', ['$scope', function($scope) {
  console.log("loaded angular!!!?");
  $scope.firstBlock = true;
  $scope.secondBlock = false;
  $scope.thirdBlock = false;
  $scope.fourthBlock = false;
  $scope.fifthBlock = false;
  $scope.visualization = false;
  console.log($scope.firstBlock);
  
  
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
  
 $scope.showIntro = function() {
   console.log("showing visualizaiton");
    $scope.fifthBlock = false;
    $scope.visualization = true;
  }
}]);