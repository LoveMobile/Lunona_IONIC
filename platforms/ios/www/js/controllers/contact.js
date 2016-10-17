angular.module('contact.controller',[])
.controller('contactCtrl',function($scope,$ionicPlatform,$ionicHistory,$http,$ionicPopup,$state,$ionicLoading){
	$ionicPlatform.ready(function(){
		try{ 
			$ionicHistory.nextViewOptions({
				disableBack: true
				});
				$ionicHistory.clearHistory();

		
		}catch(err){
			console.log(err.message);
		}
	});
});