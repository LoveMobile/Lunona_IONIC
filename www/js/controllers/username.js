angular.module('username.controller',[])
.controller('usernameCtrl',function($scope,$ionicPlatform, $localstorage,$ionicHistory, $state){
    $ionicPlatform.ready(function(){
        try{ 

            $ionicHistory.nextViewOptions({
            disableBack: true
            });
            $ionicHistory.clearHistory();
            
            $scope.username = $localstorage.get('loginname');
        	
            $scope.doLogout = function(){
            	$localstorage.set('isLogin', '0');
            	$localstorage.set('isRemember', false);
            	$state.go('welcome');
            }
        }catch(err){
            console.log(err.message);
        }
    });
});