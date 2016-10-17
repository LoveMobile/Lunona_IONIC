angular.module('programee.controller',[])
.controller('programeeCtrl',function($scope,$ionicPlatform,$ionicHistory,$http,$localstorage,$ionicPopup,$state,$ionicLoading){
	$ionicPlatform.ready(function(){
		try{ 
			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

            $scope.allprogram=[];
	       	 $scope.loadprogram=function(){
	           $ionicLoading.show({template: '<ion-spinner icon="spiral"></ion-spinner>'});
	           var dataset = "http://www.astitch-works.com/old/wp-content/themes/astitchwork/api/api.php?method=3";
	            console.log(dataset);
	            $http({
	                method: 'GET',
	                url: dataset
	            }).
	            success(function(data) {
	                if(data.results==false || data.results=="false"){
	                  console.log("Credential Error");
	                }else{                
		                 $scope.allprogram=data.data;
		                 console.log($scope.allprogram);
		                } 
	                $ionicLoading.hide();                               
		             }).error(function(data, status, headers, config) {
		             $ionicLoading.hide();              
		            });
		        } 
	        	 $scope.loadprogram();


	        $scope.Godetail=function(data){
	        	console.log(data);
	        	$localstorage.set("pro_name", data);
	        	$state.go("nav.fasion-course");
	        }
		
		}catch(err){
			console.log(err.message);
		}
	});
});