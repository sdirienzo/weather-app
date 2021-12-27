class AppModel {
    pubSub;

    apiKey;

    constructor(pubSub) {
        this.pubSub = pubSub;

        this.apiKey = '9cbe01ad0442b30e80e51f11813e6c5f';
    }

    subscribeModel() {
        this.pubSub.subscribe('get-weather', this.getWeather.bind(this));
    }

    async getCurrentWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.apiKey}`, { mode: 'cors' });
        return response.json();
    }

    async getWeatherForecast(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${this.apiKey}`, { mode: 'cors' });
        return response.json();
    }

    prepareCurrentWeatherPayload(response) {
        const currentWeather = {};
        currentWeather.id = response.weather[0].id;
        currentWeather.location = `${response.name}, ${response.sys.country}`;
        currentWeather.condition = response.weather[0].main;
        currentWeather.temp = Math.round(response.main.temp);
        currentWeather.feelsLiketemp = Math.round(response.main.feels_like);
        currentWeather.windSpeed = Math.round(response.wind.speed);
        currentWeather.humidity = response.main.humidity;

        return currentWeather;
    }

    async getWeather(msg, searchData) {
        const currentWeather = {};
        const weatherForecast = {};

        const currentWeatherResponse = await this.getCurrentWeather(searchData.city);
        const weatherForecastResponse = await this.getWeatherForecast(currentWeatherResponse.coord.lat, currentWeatherResponse.coord.lon);

        
        console.log(this.prepareCurrentWeatherPayload(currentWeatherResponse));
        console.log(weatherForecastResponse);
    }
}

export default AppModel;