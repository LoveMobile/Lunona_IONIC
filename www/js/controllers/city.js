angular.module('city.controller',[])
.controller('cityCtrl',function($scope,$ionicPlatform,$ionicHistory,API, service, $ionicLoading,$ionicPopup, $localstorage,$state,FlightDataService,$timeout,$ionicModal){
	$ionicPlatform.ready(function(){
		try{ 
			$scope.isMatch = true;

			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			$ionicModal.fromTemplateUrl('templates/city-model.html', {
			    scope: $scope,
			    animation: 'slide-in-up'
			  }).then(function(modal) {
			    $scope.modal = modal;
			  });
			  $scope.openModal = function() {

			    $scope.modal.show();
			  };
			  $scope.closeModal = function() {
			    $scope.modal.hide();
			  };
			  $scope.done = function() {
			    $scope.setvalue($scope.data.search);
			  };

		$scope.countnm=$localstorage.get("country_nm");
			console.log($scope.countnm);
		// $scope.state=$localstorage.get("Region");
		// 	console.log($scope.state);

			$scope.airlines = [];
			$scope.loaddata= function(){
				$ionicLoading.show();
				var namesugg = API.getcity($scope.countnm);
				service.Get(namesugg).then(function (data) {
					if(data.d.OperationResult=="1" || data.d.OperationResult==1){
						$scope.citylist = data.d.Strings;
						for (var i = 0; i <$scope.citylist.length; i++) {
							$scope.airlines.push({'active':true, 'fs':$scope.citylist[i] ,'iata':$scope.citylist[i],'icao':$scope.citylist[i],'name':$scope.citylist[i]})
						};
						console.log($scope.airlines);

						$ionicLoading.hide();
					}else{
					}
					$ionicLoading.hide();
				});	
			}
			$scope.loaddata();


			$scope.select={};
			$scope.select.city="";

			$scope.Gonext=function(){
				var cityname=$scope.select.city;
				console.log(cityname);
				if ($scope.select.city==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Please Select City'
		            });
					return false;
				}else{
					$localstorage.set("City",cityname);
					$state.go("birthdate");
				}				
			}



			airlines = $scope.airlines.sort(function(a, b) {
				var airlineA = a.name.toLowerCase();
				var airlineB = b.name.toLowerCase();

				if(airlineA > airlineB) return 1;
				if(airlineA < airlineB) return -1;
				return 0;
			});
			console.log(airlines);
		

			$scope.data = { "airlines" : [], "search" : '' };

		    $scope.search = function() {
					if ($scope.data.search.length > 0) {
						FlightDataService.searchAirlines($scope.data.search).then(
			    		function(matches) {
							if (matches.length == 0) {
								$scope.isMatch = false;
								$scope.data.airlines = "";
							} else {
								$scope.isMatch = true;
								$scope.data.airlines = matches;
							}
			    			console.log($scope.data.airlines);
			    			}
			    		)
					} else{
						$scope.data.airlines = "";
					}
			    	
		    	}


		    $scope.setvalue=function(getvalue){
		    	$scope.closeModal();
		    	$scope.select.city=getvalue;
		    }
		
		}catch(err){
			console.log(err.message);
		}
	});
});