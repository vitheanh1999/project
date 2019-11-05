// Code goes here
var myModule = angular.module('myModule', ["ui.bootstrap"]);

myModule.controller('myController', function($scope) {
  
  $scope.page = 1;
  
  $scope.totalItems = [ {itemName: "Tom"},
                        {itemName: "Tim"},
                        {itemName: "Tum"},
                        {itemName: "Tam"},
                        {itemName: "Tem"},
                        {itemName: "Tiem"},
                        {itemName: "Pum"} ];
                        
$scope.length=$scope.totalItems.length
});