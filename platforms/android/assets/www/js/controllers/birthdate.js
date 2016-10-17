angular.module('birthdate.controller',[])
.controller('birthdateCtrl',function($scope,$ionicPlatform,$ionicHistory,$ionicPopup,$ionicLoading,service,API,$state,$localstorage){
	$ionicPlatform.ready(function(){
		try{ 


			
			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			// $scope.showAlert = function() {
			//   $scope.data = {};
			//   var myPopup = $ionicPopup.show({
			//     template: '<style>.popup { width:1000px; border-radius: 30px !important;}</style><input type="text" ng-model="data.date" placeholder="Select Date" ion-number-picker>',
			//     title: 'Date Of Birth',
			//     subTitle: 'Please Select Date',
			//     scope: $scope,
			//     buttons: [
			//       { text: 'Cancel' },
			//       {
			//         text: '<b>Save</b>',
			//         type: 'button-positive',
			//         onTap: function(e) {
			//           console.log($scope.data.date);
			//         }
			//       }
			//     ]
			//   });

			//   myPopup.then(function(res) {
			//     console.log('Tapped!', res);
			//   });
			    
			// };
			
			// $scope.data={};
			// $scope.data.date="";
			// $scope.data.month="";
			// $scope.data.year="";
			// $scope.showAlert = function() {
			//   // $scope.data = {};
			//   var myPopup = $ionicPopup.show({
			//     template: '<style>.popup { width:1000px; border-radius: 30px !important;}</style><select  class="select_box" ng-model="data.date"><option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option></select>',
			//     title: 'Date Of Birth',
			//     subTitle: 'Please Select Date',
			//     scope: $scope,
			//     buttons: [
			//       { text: 'Cancel' },
			//       {
			//         text: '<b>Save</b>',
			//         type: 'button-positive',
			//         onTap: function(e) {
			//           console.log($scope.data.date);
			//         }
			//       }
			//     ]
			//   });

			//   myPopup.then(function(res) {
			//     console.log('Tapped!', res);
			//   });
			    
			// };

			// $scope.showAlert1 = function() {
			//   // $scope.data = {};
			//   var myPopup = $ionicPopup.show({
			//     template: '<style>.popup { width:1000px; border-radius: 30px !important;}</style><select  class="select_box" ng-model="data.month"><option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>',
			//      title: 'Date Of Birth',
			//     subTitle: 'Please Select Month',
			//     scope: $scope,
			//     buttons: [
			//       { text: 'Cancel' },
			//       {
			//         text: '<b>Save</b>',
			//         type: 'button-positive',
			//         onTap: function(e) {
			//           console.log($scope.data.month);
			//         }
			//       }
			//     ]
			//   });

			//   myPopup.then(function(res) {
			//     console.log('Tapped!', res);
			//   });
			    
			// };
			// $scope.showAlert2 = function() {
			//   // $scope.data = {};
			//   var myPopup = $ionicPopup.show({
			//     template: '<style>.popup { width:1000px; border-radius: 30px !important;}</style><select  class="select_box" ng-model="data.year"><option value="">Select</option><option value="1995">1995</option><option  value="1996">1996</option><option  value="1997">1997</option><option  value="1998">1998</option><option  value="1999">1999</option><option  value="2000">2000</option></select>',
			//     title: 'Date Of Birth',
			//     subTitle: 'Please Select Year',
			//     scope: $scope,
			//     buttons: [
			//       { text: 'Cancel' },
			//       {
			//          text: '<b>Save</b>',
			//         type: 'button-positive',
			//         onTap: function(e) {
			//           console.log($scope.data.year);
			//         }
			//       }
			//     ]
			//   });

			//   myPopup.then(function(res) {
			//     console.log('Tapped!', res);
			//   });
			    
			// };

			$scope.data={};
			$scope.data.date="1";
			$scope.data.month="1";
			$scope.data.year="1998";

			$scope.Gonext=function(){
				var date=$scope.data.date;
				var month=$scope.data.month;
				var year=$scope.data.year;
				if ($scope.data.date==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Please Select Date'
		            });
					return false;
				}if($scope.data.month==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Please Select Month'
		            });
					return false;
				}if($scope.data.year==""){
					$ionicPopup.alert({
		            title : 'Warning',
		            template: 'Please Select Year'
		            });
					return false;
				}else{
					$ionicLoading.show();
					var namesugg = API.getdateofbirth(year,month,date);
					service.Get(namesugg).then(function (data) {
						console.log(namesugg);
					if(data.d.OperationResult=="1" || data.d.OperationResult==1){
						$scope.citylist = data.d;
						console.log($scope.citylist);
						$ionicLoading.hide();
						$localstorage.set("getday",$scope.citylist.Day);
						$localstorage.set("getmonth",$scope.citylist.Month);
						$localstorage.set("getyear",$scope.citylist.Year);
						$state.go("finish");
					}else{
					}
					$ionicLoading.hide();
				});	
				};

			}

		}catch(err){
			console.log(err.message);
		}
	});
});