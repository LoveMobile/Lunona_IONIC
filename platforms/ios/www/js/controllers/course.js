angular.module('course.controller',[])
.controller('courseCtrl',function($scope,$ionicPlatform,$ionicHistory,$localstorage,$http){
	$ionicPlatform.ready(function(){
		try{ 
			$ionicHistory.nextViewOptions({
	          disableBack: true
	          });
	          $ionicHistory.clearHistory();
	          
          	$scope.getdata=$localstorage.get("allcontent");
              $scope.showdata=JSON.parse($scope.getdata);
                console.log($scope.showdata);
			
		
		}catch(err){
			console.log(err.message);
		}
	});
});