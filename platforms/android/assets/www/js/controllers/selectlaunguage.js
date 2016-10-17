angular.module('selectlaunguage.controller',[])
.controller('selectlaunguageCtrl',function($scope,$ionicPlatform, API, service,$translate, $ionicLoading, $localstorage,$ionicHistory, $state, $translate){
	$ionicPlatform.ready(function(){
		try{ 
			
			$ionicHistory.nextViewOptions({
			disableBack: true
			});
			$ionicHistory.clearHistory();

			$scope.langauges = [];

			$scope.loadLanguages = function(){
				$ionicLoading.show();
				var languageURL = API.getLanguage();
				service.Get(languageURL).then(function (data) {
					if(data.OperationResult=="1"){
						$scope.langauges = data.SiteLanguages;
						console.log($scope.langauges);
					}else{
						alert(data.DataValue);
					}
					$ionicLoading.hide();
				});	
			}
			$scope.loadLanguages();

			$scope.selectValue = function(lang){
				$translate.use(lang).then(function(data) {
			        $localstorage.set('language', lang);
			        $state.go('welcome');
			    }, function(error) {
			        console.log("ERROR -> " + error);
			        $state.go('welcome');
			    });
			}
		
		}catch(err){
			console.log(err.message);
		}
	});
});