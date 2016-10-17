angular.module('fasion-course.controller',[])
.controller('fasion-courseCtrl',function($scope,$ionicPlatform,$ionicHistory,$http,$ionicLoading,$state,$localstorage){
	$ionicPlatform.ready(function(){
		try{ 
			$ionicHistory.nextViewOptions({
	          disableBack: true
	          });
	          $ionicHistory.clearHistory();

	          $scope.programname=$localstorage.get("pro_name");
	          console.log($scope.programname);

           $scope.allcourses=[];
	        $scope.loadallcourse=function(){
	         $ionicLoading.show({template: '<ion-spinner icon="spiral"></ion-spinner>'});
	         var dataset = "http://www.astitch-works.com/old/wp-content/themes/astitchwork/api/api.php?method=1&name="+$scope.programname;
	         console.log(dataset);
	          $http({
	              method: 'GET',
	              url: dataset
	          }).
	          success(function(data) {
	              if(data.results == "false" || data.results == false){
	                  console.log("some credential");
	              }else{                
	               $scope.alcourses=data.data;
	               for(var i=0; i<$scope.alcourses.length;i++){
	               	if($scope.alcourses[i].ID !=null){
	               		$scope.allcourses.push($scope.alcourses[i]);
	               	}
	               }
	               console.log($scope.alcourses);
	              } 
	              $ionicLoading.hide();                               
	           }).error(function(data, status, headers, config) { 
	             $ionicLoading.hide();             
	          })
	        }
	        $scope.loadallcourse();


	        $scope.Godetail=function(data){
	        	$state.go("nav.course");
                $localstorage.set("allcontent", JSON.stringify(data));
	        }



		
		}catch(err){
			console.log(err.message);
		}
	});
});