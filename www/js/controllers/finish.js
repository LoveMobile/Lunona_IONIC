angular.module('finish.controller',[])
.controller('finishCtrl',function($scope,$ionicPlatform,$ionicHistory, $localstorage,$state,$ionicLoading,service,API){
	$ionicPlatform.ready(function(){
		try{ 
			
			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			$scope.loginemail=$localstorage.get("LoginName");
			$scope.nickname=$localstorage.get("Nickname");
			$scope.gender=$localstorage.get("GenderID");
			$scope.countryname=$localstorage.get("country_nm");
			$scope.state=$localstorage.get("Region");
			$scope.city=$localstorage.get("City");
			$scope.pass=$localstorage.get("Password");
			$scope.day=$localstorage.get("getday");
			$scope.month=$localstorage.get("getmonth");
			$scope.year=$localstorage.get("getyear");
			$scope.language=$localstorage.get('language');
			console.log($scope.language);


			$scope.Register= function(){
				$ionicLoading.show();
				var url = API.postdata();
				var dataset = {"user":{
								"Language":$scope.language,
								"Password":$scope.pass,
								"LoginName":$scope.nickname,
								"Email":$scope.loginemail,
								"Country":$scope.countryname,
								"Region":$scope.state,
								"City":$scope.city,
								"Zip":"",
								"GenderID":$scope.gender,
								"Day":$scope.day,
								"Month":$scope.month,
								"Year":$scope.year
								},
									"proposedCountry":$scope.countryname,
									"proposedCity":$scope.city
							}
				dataset=JSON.stringify(dataset);
				service.Post(url,dataset).then(function (data) {
					console.log(data);
					console.log(url);
					console.log(dataset);
					if(data.d.OperationResult=="1" || data.d.OperationResult==1){
						$scope.citylist = data.d;
						console.log($scope.citylist);
						$ionicLoading.hide();
						$state.go("login");
					}else{
						console.log("something is wrong");
					}
					$ionicLoading.hide();
				});	
			}
			// $scope.loaddata();
		
		}catch(err){
			console.log(err.message);
		}
	});
});