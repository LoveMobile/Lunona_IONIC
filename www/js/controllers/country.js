angular.module('country.controller',[])
.controller('countryCtrl',function($scope,$ionicPlatform,$ionicHistory,$ionicPopup,$ionicLoading,service,API,$state,$localstorage,FlightDataService,$timeout,$ionicModal){
	$ionicPlatform.ready(function(){
		try{ 
			
			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			$ionicModal.fromTemplateUrl('templates/country-model.html', {
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
			$scope.loadcountry= function(){
				$ionicLoading.show();
				var namesugg = API.getcountries();
				service.Get(namesugg).then(function (data) {
					console.log(namesugg);
					if(data.d.OperationResult=="1" || data.d.OperationResult==1){
						$scope.countrylist = data.d.Strings;
						for(var i=0 ; i< $scope.countrylist.length; i++){
							$scope.airlines.push({'active':true, 'fs':$scope.countrylist[i] ,'iata':$scope.countrylist[i],'icao':$scope.countrylist[i],'name':$scope.countrylist[i]});
						}
					}else{
					}
					$ionicLoading.hide();
				});	
			}
			$scope.loadcountry();
			


			$scope.select={};
			$scope.select.getcountry="";

			$scope.Gonext=function(){
				var countname=$scope.select.getcountry;
				console.log(countname);
				if ($scope.select.getcountry==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Select Country'
		            });
					return false;
				}if($scope.select.getcountry=="United States"){
					$localstorage.set("country_nm",countname);
					$state.go("state");
				}
				else{
					$localstorage.set("country_nm",countname);
					$state.go("city");
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
		    	$scope.select.getcountry=getvalue;
		    }

		 

  			// $scope.model = "";
     //        $scope.clickedValueModel = "";
     //        $scope.removedValueModel = "";

     //        $scope.getTestItems = function (query) {
     //            if (query) {
     //                return {
     //                    items: [
     //                        { name: query + "shubham", view: "shubham: " + query + "1"},
     //                        { name: query + "vishwakarma", view: "vishwakarma: " + query + "2"},
     //                        { name: query + "ojha", view: "ojha: " + query + "3"},
     //                        {id: "4", name: query + "vvvvv", view: "vvvvvvv: " + query + "4"},
     //                        {id: "5", name: query + "nnnnnn", view: "nnnnnn: " + query + "5"},
     //                        {id: "6", name: query + "mmmmmm", view: "mmmmmmm: " + query + "6"},]
                        
     //                };
     //            }
     //            return {items: []};
     //        };

     //        $scope.itemsClicked = function (callback) {
     //            $scope.clickedValueModel = callback;
     //        };
     //        $scope.itemsRemoved = function (callback) {
     //            $scope.removedValueModel = callback;
     //        };



		
		}catch(err){
			console.log(err.message);
		}
	});
});