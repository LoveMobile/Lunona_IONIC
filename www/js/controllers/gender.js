angular.module('gender.controller',[])
.controller('genderCtrl',function($scope,$ionicPlatform, API, service, $ionicLoading, $localstorage, $ionicPopup,$ionicHistory, $state){
	$ionicPlatform.ready(function(){
		try{ 

			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			$scope.myFunction=function(){
				document.getElementById("myDIV").style.backgroundColor = "#fff";
				document.getElementById("myDIV").style.color = "#5a267b";
				document.getElementById("myDIV1").style.backgroundColor = "transparent";
				document.getElementById("myDIV1").style.color = "#fff";

			}
			$scope.myFunction1=function(){
				document.getElementById("myDIV1").style.backgroundColor = "#fff";
				document.getElementById("myDIV1").style.color = "#5a267b";
				document.getElementById("myDIV").style.backgroundColor = "transparent";
				document.getElementById("myDIV").style.color = "#fff";

			}


			$scope.select={};
			$scope.select.gender="";


			$scope.Gonext = function(){
				if($scope.select.gender==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Please Select Gender'
		            });
		            return false;
				}else{
					var gender=$scope.select.gender;
						console.log(gender);
					$localstorage.set("GenderID", gender);	
					$state.go("displayname");

				}				
			}

			

		}catch(err){
			console.log(err.message);
		}
	});
});