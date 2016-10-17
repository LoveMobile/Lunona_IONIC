angular.module('displayname.controller',[])
.controller('displaynameCtrl',function($scope,$ionicPlatform, API, service, $ionicLoading, $localstorage,$ionicPopup, $ionicHistory, $state){
	$ionicPlatform.ready(function(){
		try{ 

			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			$scope.checkhide = false;
            $scope.Nexthide = true;
            $scope.hidecheckbutton= function () {
                if($scope.Nexthide==true){
                    $scope.Nexthide = false;
                    $scope.checkhide = true;
                }
            }


			$scope.name = {
				nickname:'',
				language: $localstorage.get('language')
			};


			$scope.Gocheck = function(){
				if($scope.name.nickname==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Enter Nick Name'
		            });
		            return false;
				}if($scope.name.nickname.length<=3){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Nick Name Too short'
		            });
		            return false;
				}else{
					$ionicLoading.show();
					var loginURL = API.checkLogin($scope.name.nickname, $scope.name.language);
					service.Get(loginURL).then(function (data) {
						if(data.d.OperationResult == "0" || data.d.OperationResult == "0"){
	                  		$scope.getdata=data.d;
	                  		console.log($scope.getdata);
	                  		                 		 
	                  		$ionicLoading.hide();
	                  		$scope.hidecheckbutton();
	                  		$scope.showerroe="";
	                  		
	                  	}else{
	                  		$scope.showerroe=data.d;
	                  		console.log($scope.showerroe);
	                  		$scope.getdata="";
	                  		$ionicLoading.hide();
	                  	} 
					});
				}				
			}

			
			$scope.Gonext=function(){
				console.log($scope.name.nickname);
				$localstorage.set("Nickname",$scope.name.nickname);
      		 	$state.go("country");
			}

			// $scope.choosename=$localstorage.get("LoginName");
			// 	console.log($scope.choosename);


			$scope.loadnamesugget= function(){
				$ionicLoading.show();
				var namesugg = API.loginnamesuggestions($scope.name.nickname);
				service.Get(namesugg).then(function (data) {
					console.log(namesugg);
					// $scope.getdata=data.d.DataValue;
					$scope.name.nickname=data.d.DataValue;
					console.log($scope.name.nickname);
					$ionicLoading.hide();
				});	
			}
			$scope.loadnamesugget();

			

			

		}catch(err){
			console.log(err.message);
		}
	});
});