angular.module('welcome.controller',[])
.controller('welcomeCtrl',function($scope,$ionicPlatform,$localstorage,$ionicHistory,$translate){
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