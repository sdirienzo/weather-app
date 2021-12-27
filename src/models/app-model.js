class AppModel {
    pubSub;

    apiKey;

    constructor(pubSub) {
        this.pubSub = pubSub;

        this.apiKey = '9cbe01ad0442b30e80e51f11813e6c5f';
    }

    subscribeModel() {
        this.pubSub.subscribe('get-weather', this.getWeather.bind(this));

        this.pubSub.publish('get-weather', { city: 'cupertino' });
    }

    getWeekdayFromUnixTimestamp(unixTimestamp) {
        const weekday = new Date(unixTimestamp * 1000).toLocaleDateString('en', {weekday: 'long'});
        return weekday;
    }

    async getCurrentWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.apiKey}`, { mode: 'cors' });
        
        if (response.ok) {
            return response.json();
        }
        
        if (response.status === 404) {
            throw new Error('City not found');
        }

        if (response.status === 429) {
            throw new Error('Surpassed API call limit')
        }

        if (response.status >= 500 && response.status < 600) {
            throw new Error('Bad response from server');
        }
    }

    async getWeatherForecast(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${this.apiKey}`, { mode: 'cors' });
        
        if (response.ok) {
            return response.json();
        }
        
        if (response.status === 404) {
            throw new Error('City not found');
        }

        if (response.status === 429) {
            throw new Error('Surpassed API call limit')
        }

        if (response.status >= 500 && response.status < 600) {
            throw new Error('Bad response from server');
        }
    }

    prepareCurrentWeatherPayload(response) {
        const currentWeather = {};
        currentWeather.id = response.weather[0].id;
        currentWeather.location = `${response.name}, ${response.sys.country}`;
        currentWeather.condition = response.weather[0].main;
        currentWeather.temp = Math.round(response.main.temp);
        currentWeather.feelsLikeTemp = Math.round(response.main.feels_like);
        currentWeather.windSpeed = Math.round(response.wind.speed);
        currentWeather.humidity = response.main.humidity;

        return currentWeather;
    }

    prepareWeatherForecastPayload(response) {
        const weatherForecast = {};
        weatherForecast.days = [];

        response.daily.forEach((dayForecast, index) => {
            if (index > 0) {
                const day = {};
                day.weekday = this.getWeekdayFromUnixTimestamp(dayForecast.dt);
                day.temp = Math.round(dayForecast.temp.day);
                day.id = dayForecast.weather[0].id;
                weatherForecast.days.push(day);
            }
        });

        return weatherForecast;
    }

    async getWeather(msg, searchData) {
        try {
            const currentWeatherResponse = await this.getCurrentWeather(searchData.city);

            const weatherForecastResponse = await this.getWeatherForecast(currentWeatherResponse.coord.lat, currentWeatherResponse.coord.lon);

            const currentWeather = this.prepareCurrentWeatherPayload(currentWeatherResponse);
            const weatherForecast = this.prepareWeatherForecastPayload(weatherForecastResponse);

            this.pubSub.publish('display-weather', currentWeather);
            this.pubSub.publish('display-forecast', weatherForecast);
        } catch (error) {
            this.handlError(error);
        }
       
    }

    handlError(error) {
        let errorMessage;
        
        if (error.message === 'City not found') {
            errorMessage = 'City not found';
        } else if (error.mesage === 'Surpassed API call limit') {
            errorMessage = 'Can only search 60 times per minute. Please try again later';
        } else if (error.mesage === 'Bad response from server') {
            errorMessage = 'Something went wrong. Please try again';
        } else {
            errorMessage = 'Something went wrong. Please try again';
        }
            
        this.pubSub.publish('display-error', { errorMessage });
    }
}

export default AppModel;