async function getWeatherDetails() {
    IsLoadingState(true);
    const cityName = document.getElementById("city-name").value;
    const response = await getHttpCall(`https://geocode.maps.co/search?q=${cityName}&api_key=65ba2165024d5660860737spwaae037`);

    const cityData = getCityData(response);
    const lon = cityData.lon, lat = cityData.lat;
    console.log(lon, lat);
    showResponse(await getWeatherData(lon, lat));

    IsLoadingState(false);
}

function getCityData(response) {
    const cityData = response.find((res) => res.type === 'city');
    if (cityData) {
        return cityData;
    } else {
        alert("Invalid city name please try again");
    }
}

async function getWeatherData(lon, lat) {
    const response = await getHttpCall(`https://api.weatherapi.com/v1/current.json?key=e53d5c7d88754035aca63021240202&q=${lat},${lon}`);
    console.log("weather: ", response.current);
    return response.current;
}

async function getHttpCall(api) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", api);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.response;
                console.log("getHttpCall: ", response);
                resolve(response);
            } else {
                console.log(`Error: ${xhr.status}`);
                alert("Error, Please try again..");
                reject();
            }
        };
    });
}

async function showResponse(weatherDetails) {
    document.getElementById("weather-details").innerHTML = `
        Temperature: ${weatherDetails.temp_c} C/ ${weatherDetails.temp_f} F <br/>
        Humidity: ${weatherDetails.humidity} <br/>
        Weather description: ${weatherDetails.condition.text} <br/>
    `;
}


function IsLoadingState(IsEnabled) {
    if (IsEnabled) {
        $("#loading").show();
        $("#weather-details").hide();
        $("#get-weather-btn").attr('disabled','disabled');
        $("#city-name").attr('disabled','disabled');
    } else {
        $("#loading").hide();
        $("#weather-details").show();
        $("#get-weather-btn").removeAttr('disabled');
        $("#city-name").removeAttr('disabled');
    }
}

