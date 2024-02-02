var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.cityName = "";
    $scope.isLoading = false;
    $scope.weatherDetails = null;


    $scope.getWeatherDetails = async function () {
        $scope.isLoading = true;
        const response = await getHttpCall(`https://geocode.maps.co/search?q=${$scope.cityName}&api_key=65ba2165024d5660860737spwaae037`);
        const cityData = getCityData(response.data);
        const lon = cityData.lon, lat = cityData.lat;
        await getWeatherData(lon, lat)
        $scope.isLoading = false;
        $scope.$digest()
        return;
    }


    getHttpCall = async function (api) {
        return $http.get(api);
    }

    getWeatherData = async function (lon, lat) {
        const response = await getHttpCall(`https://api.weatherapi.com/v1/current.json?key=e53d5c7d88754035aca63021240202&q=${lat},${lon}`);
        $scope.weatherDetails = response.data.current;
        return;
    }

    getCityData = function (response) {
        const cityData = response.find((res) => res.type === 'city');
        if (cityData) {
            return cityData;
        } else {
            alert("Invalid city name please try again");
            return;
        }
    }
});