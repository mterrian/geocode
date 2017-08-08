var app = angular.module('geolocationDemo', []);

app.controller('geoCtrl', function($scope, $http){
	
	var crd;
	

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error, options)
	} else {
		console.log('your shit dont work');
	}
	/*
	below function is passed as a parameter into geolocation api call.
	upon success, the returned latitude and longitude data are passed into 
	the crd object and then console logged.
	then, an http call is made to the google geocoding API
	the latitude and longitude we got from the html5 geolocation api are passed in as variables
	then the user's reverse geocoded data, the zip code specifically, is returned.
	*/
	function success(pos) {
		var crd = pos.coords;
		console.log(crd.latitude)
		console.log(crd.longitude)
		$http({
			method: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + crd.latitude + ',' + crd.longitude + '&key=AIzaSyDPVrV4R_jLLWAIQe4zPaIJaNSEJGiRwYM'
		}).then(function successfulCallback(response){
			console.log(response.data.results[4].address_components[0].long_name)
			$scope.zip = response.data.results[4].address_components[0].long_name
		});
	}

	function error(err) {
		console.warn('error ' + err.code + ' ' + err.message); 
	}

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	}
	


});




///my api key AIzaSyDPVrV4R_jLLWAIQe4zPaIJaNSEJGiRwYM
