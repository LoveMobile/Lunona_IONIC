
angular.module('aStitchwork', ['ionic','nav.controller','home.controller', 'login.controller', 'registration.controller', 'programee.controller', 'course.controller', 'fasion-course.controller', 'contact.controller', 'services-work.controller', 'tailoring.controller', 'alteration.controller', 'pattern.controller' ])

.run(function($ionicPlatform, $rootScope,$location) {
  $ionicPlatform.ready(function() {
    
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    if(ionic.Platform.isAndroid()){
       $ionicPlatform.registerBackButtonAction(function () {
           var hashvalue = $location.url();
           if(hashvalue=="/nav/home"){
               navigator.app.exitApp();
           } else {
               navigator.app.backHistory();
           }
       }, 100);
     }
    $rootScope.dateValue = new Date();
   $rootScope.timeValue = new Date();
   $rootScope.datetimeValue = new Date();
  });
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  } 
}])

.config(function($stateProvider, $urlRouterProvider) {

 
  $stateProvider
  
 
  .state('nav', {
    url: '/nav',
    templateUrl: 'templates/nav.html',
    controller: 'navCtrl'
  })
   
   .state('nav.home', {
     cache: false,
     url: '/home',
     views: {
       'nav': {
       templateUrl: 'templates/home.html',
         controller: 'homeCtrl'
        }
      }  
  })

   .state('login', {
     cache: false,
     url: '/login',
     
       templateUrl: 'templates/login.html',
         controller: 'loginCtrl'
       
  })

   .state('nav.registration', {
     cache: false,
     url: '/registration',
     views: {
       'nav': {
       templateUrl: 'templates/registration.html',
         controller: 'registrationCtrl'
       }
      } 
  })

   .state('nav.programee', {
     cache: false,
     url: '/programee',
     views: {
       'nav': {
       templateUrl: 'templates/programee.html',
         controller: 'programeeCtrl'
       }
      } 
  })

   .state('nav.course', {
     cache: false,
     url: '/course',
     views: {
       'nav': {
       templateUrl: 'templates/course.html',
         controller: 'courseCtrl'
       }
      } 
  })
.state('nav.fasion-course', {
     cache: false,
     url: '/fasion-course',
     views: {
       'nav': {
       templateUrl: 'templates/fasion-course.html',
         controller: 'fasion-courseCtrl'
       }
      } 
  })

.state('nav.contact', {
     cache: false,
     url: '/contact',
     views: {
       'nav': {
       templateUrl: 'templates/contact.html',
         controller: 'contactCtrl'
       }
      } 
  })

.state('nav.services-work', {
     cache: false,
     url: '/services-work',
     views: {
       'nav': {
       templateUrl: 'templates/services-work.html',
         controller: 'services-workCtrl'
       }
      } 
  })

.state('nav.tailoring', {
     cache: false,
     url: '/tailoring',
     views: {
       'nav': {
       templateUrl: 'templates/tailoring.html',
         controller: 'tailoringCtrl'
       }
      } 
  })

.state('nav.alteration', {
     cache: false,
     url: '/alteration',
     views: {
       'nav': {
       templateUrl: 'templates/alteration.html',
         controller: 'alterationCtrl'
       }
      } 
  })
.state('nav.pattern', {
     cache: false,
     url: '/pattern',
     views: {
       'nav': {
       templateUrl: 'templates/pattern.html',
         controller: 'patternCtrl'
       }
      } 
  })

   ;
  $urlRouterProvider.otherwise('nav/home');

// var isLogin = localStorage.getItem("isLogin");
//         if(isLogin=="1"){
//             $urlRouterProvider.otherwise('/tab/home');
//         }else{
//             $urlRouterProvider.otherwise('/login');
//         }
});
