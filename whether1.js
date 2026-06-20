async function getWeatherData() {

    const cityName = document.querySelector("#cityInput").value.trim();

    if(cityName === ""){
        alert("Please enter a city name");
        return;
    }

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ca018df54353f065aaed7d802825b8be`
        );

        const data = await response.json();

        if(data.cod != 200){
            document.querySelector("#dataResult").innerHTML = `
                <div class="alert alert-danger mt-3">
                    City not found!
                </div>
            `;
            return;
        }

        renderData(data);

    } catch(error){
        console.log(error);

        document.querySelector("#dataResult").innerHTML = `
            <div class="alert alert-danger mt-3">
                Something went wrong!
            </div>
        `;
    }

    document.querySelector("#cityInput").value = "";
}


function renderData(data){

    const weatherType = data.weather[0].main.toLowerCase();

    // Remove old weather theme
    document.body.classList.remove(
        "sunny",
        "cloudy",
        "rainy",
        "snowy"
    );

    // Add new weather theme
    if(weatherType.includes("clear")){
        document.body.classList.add("sunny");
    }
    else if(weatherType.includes("cloud")){
        document.body.classList.add("cloudy");
    }
    else if(weatherType.includes("rain") || weatherType.includes("drizzle")){
        document.body.classList.add("rainy");
    }
    else if(weatherType.includes("snow")){
        document.body.classList.add("snowy");
    }
    else{
        document.body.classList.add("sunny");
    }

    document.querySelector("#dataResult").innerHTML = `
    
        <div class="weather-card text-center">

            <h2>${data.name}, ${data.sys.country}</h2>

            <img
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
            alt="weather icon">

            <h1 class="display-4">
                ${Math.round(data.main.temp)}°C
            </h1>

            <h5 class="text-capitalize">
                ${data.weather[0].description}
            </h5>

            <hr>

            <div class="row">

                <div class="col">
                    <strong>Feels Like</strong>
                    <p>${Math.round(data.main.feels_like)}°C</p>
                </div>

                <div class="col">
                    <strong>Humidity</strong>
                    <p>${data.main.humidity}%</p>
                </div>

                <div class="col">
                    <strong>Wind</strong>
                    <p>${data.wind.speed} m/s</p>
                </div>

            </div>

            <hr>

            <p>
                🌅 Sunrise :
                ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
            </p>

            <p>
                🌇 Sunset :
                ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}
            </p>

        </div>

    `;
}