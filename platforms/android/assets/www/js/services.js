angular.module('Lunona')
.service('service', function ($q,$http) {

    function Get(URL){
    	return $http.get(URL).then(function(response){
			  return response.data
      });
    }

    function Post(URL, data){
      return $http.post(URL, data).then(function(response){
        return response.data
      });
    }

    return {
      Get :  Get,
      Post:  Post,
    }

});