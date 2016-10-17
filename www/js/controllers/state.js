angular.module('state.controller',[])
.controller('stateCtrl',function($scope,$ionicPlatform,$ionicHistory,$ionicLoading,service,API,$ionicPopup,$state,$localstorage,FlightDataService,$timeout,$ionicModal){
	$ionicPlatform.ready(function(){
		try{ 
			
			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			$scope.countnm=$localstorage.get("country_nm");
			console.log($scope.countnm);

			$ionicModal.fromTemplateUrl('templates/state-model.html', {
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

			  $scope.airlines=[];
			$scope.loaddata= function(){
				$ionicLoading.show();
				var namesugg = API.getstates($scope.countnm);
				service.Get(namesugg).then(function (data) {
					console.log(namesugg);
					if(data.d.OperationResult=="1" || data.d.OperationResult==1){
						$scope.statelist = data.d.Strings;
						for(var i=0; i<$scope.statelist.length; i++){
							$scope.airlines.push({'active':true, 'fs':$scope.statelist[i] ,'iata':$scope.statelist[i],'icao':$scope.statelist[i],'name':$scope.statelist[i]});

						}
						$ionicLoading.hide();
					}else{
					}
					$ionicLoading.hide();
				});	
			}
			$scope.loaddata();


			$scope.select={};
			$scope.select.state="";

			$scope.Gonext=function(){
				var statename=$scope.select.state;
				console.log(statename);
				if ($scope.select.state==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Please Select State'
		            });
					return false;
				}else{
					$localstorage.set("Region",statename);
					$state.go("city1");
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
			    			$scope.data.airlines = matches;
			    			console.log($scope.data.airlines);
			    			}
			    		)
					} else{
						$scope.data.airlines = "";
					}
			    	
		    	}
		    $scope.setvalue=function(getvalue){
		    	$scope.closeModal();
		    	$scope.select.state=getvalue;
		    }
		
		}catch(err){
			console.log(err.message);
		}
	});
});