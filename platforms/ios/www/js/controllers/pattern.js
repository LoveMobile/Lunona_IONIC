angular.module('pattern.controller',[])
.controller('patternCtrl',function($scope,$ionicPlatform,$ionicHistory,$http,$ionicPopup,$state,$ionicLoading){
	$ionicPlatform.ready(function(){
		try{ 
			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();


		  $scope.allservices=[];
        	$scope.loadservices=function(){
	         $ionicLoading.show({template: '<ion-spinner icon="spiral"></ion-spinner>'});
	         var dataset = "http://www.astitch-works.com/old/wp-content/themes/astitchwork/api/api.php?method=2&id=6444";
	         console.log(dataset);
	          $http({
	              method: 'GET',
	              url: dataset
	          }).
	          success(function(data) {
	              if(data.results == "false" || data.results == false){
	                  console.log("some credential");
	              }else{                
	               $scope.allservices=data;
	               console.log($scope.allservices);
	              } 
	              $ionicLoading.hide();                               
	           }).error(function(data, status, headers, config) { 
	             $ionicLoading.hide();             
	          })
	        }
	        $scope.loadservices();

		
		}catch(err){
			console.log(err.message);
		}
	});
});