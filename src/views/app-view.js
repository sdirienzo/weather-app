class AppView {
    pubSub;
    
    content;

    searchInput;

    currentWeather;

    weatherForecast;

    constructor(pubSub) {
        this.pubSub = pubSub;

        this.content = this.getElement('#content');

        this.init();
    }

    init() {
        this.createWeatherSearchSection();
        this.createWeatherCurrentSection();
        this.createWeatherForecastSection();
    }

    subscribeView() {
        this.pubSub.subscribe('display-weather', this.createCurrentWeather.bind(this));

        this.pubSub.subscribe('display-forecast', this.createWeatherForecast.bind(this));

        this.applyEventListeners();
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    createElement(tag, classList) {
        const element = document.createElement(tag);
       
        if (classList) {
            classList.split(' ').forEach(classStr => {
                element.classList.add(classStr); 
            });
        }

        return element;
    }

     destroyCurrentWeather() {
        while (this.currentWeather.firstChild) {
            this.currentWeather.removeChild(this.currentWeather.firstChild);
        }
     }
    
    destroyWeatherForecast() {
        while (this.weatherForecast.firstChild) {
            this.weatherForecast.removeChild(this.weatherForecast.firstChild);
        }
    }

    createWeatherSearchSection() {
        const searchSection = this.createElement('div', 'weather-search-section');
        const searchForm = this.createElement('form', 'weather-search-form');
        const searchContainer = this.createElement('div', 'weather-search-container');
        const searchIcon = this.createElement('i', 'fas fa-search');
        const searchInput = this.createElement('input', 'weather-search-input');
        searchInput.type = 'text';

        searchContainer.append(searchIcon);
        searchContainer.append(searchInput);
        searchForm.append(searchContainer);
        searchSection.append(searchForm);

        this.searchInput = searchInput;
        this.content.append(searchSection);
    }

    createWeatherCurrentSection() {
        const weatherCurrentSection = this.createElement('div', 'weather-current-section');
        const weatherCurrentContainer = this.createElement('div', 'weather-current-container');
        
        weatherCurrentSection.append(weatherCurrentContainer);
        
        this.currentWeather = weatherCurrentContainer;
        this.content.append(weatherCurrentSection);
    }

    createCurrentWeather(msg, weather) {
        this.destroyCurrentWeather();

        const weatherCurrentCondition = this.createElement('div', 'weather-current-condition-text');
        const weatherCurrentLocation = this.createElement('div', 'weather-current-location');
        const weatherCurrentDescription = this.createElement('div', 'weather-current-description');
        const weatherCurrentTemp = this.createElement('div', 'weather-current-temp');
        const weatherCurrentDetails = this.createElement('div', 'weather-current-details');
        const weatherCurrentFeelsLike = this.createElement('div', 'weather-current-feels-like');
        weatherCurrentFeelsLike.innerText = `Feels Like: ${weather.currentWeather.feelsLikeTemp}`;

        const weatherCurrentWind = this.createElement('div', 'weather-current-wind');
        weatherCurrentWind.innerText = `Wind: ${weather.currentWeather.windSpeed}`;

        const weatherCurrentHumidity = this.createElement('div', 'weather-current-humidity');
        weatherCurrentHumidity.innerText = `Humidity: ${weather.currentWeather.humidity}`;

        const weatherCurrentConditionIconContainer = this.createElement('div', 'weather-current-condition-icon');
        const weatherCurrentConditionIcon = this.createElement('i', `fas ${weather.currentWeather.conditionIconClass}`);

        weatherCurrentConditionIconContainer.append(weatherCurrentConditionIcon);

        weatherCurrentDetails.append(weatherCurrentFeelsLike);
        weatherCurrentDetails.append(weatherCurrentWind);
        weatherCurrentDetails.append(weatherCurrentHumidity);

        weatherCurrentDescription.append(weatherCurrentTemp);
        weatherCurrentDescription.append(weatherCurrentDetails);

        this.currentWeather.append(weatherCurrentCondition);
        this.currentWeather.append(weatherCurrentLocation);
        this.currentWeather.append(weatherCurrentDescription);
        this.currentWeather.append(weatherCurrentConditionIconContainer);
    }

    createWeatherForecastSection() {
        const weatherForecastSection = this.createElement('div', 'weather-forecast-section');
        const weatherForecastContainer = this.createElement('div', 'weather-forecast-container');

        weatherForecastSection.append(weatherForecastContainer);

        this.weatherForecast = weatherForecastContainer;
        this.content.append(weatherForecastSection);
    }

    createWeatherForecastDay(weekday, temp, conditionIconClass) {
        const dayForecast = this.createElement('div', 'weather-forecast-day');
        const forecastWeekday = this.createElement('div', 'weather-forecast-weekday');
        const forecastTemp = this.createElement('div', 'weather-forecast-temp');
        const forecastCondition = this.createElement('div', 'weather-forecast-condition');
        const forecastConditionIcon = this.createElement('i', 'fas');

        forecastWeekday.innerText = weekday;
        forecastTemp.innerText = temp;
        forecastConditionIcon.classList.add(conditionIconClass);

        forecastCondition.append(forecastConditionIcon);

        dayForecast.append(forecastWeekday);
        dayForecast.append(forecastTemp);
        dayForecast.append(forecastCondition);

        return dayForecast;
    }

    createWeatherForecast(msg, forecast) {
        this.destroyWeatherForecast();

        forecast.forEach(day => {
            this.weatherForecast.append(this.createWeatherForecastDay(day.weekday, day.temp, day.conditionIconClass));
        });
    }

    applyEventListeners() {
        this.searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const searchData = {};
                searchData.city = this.searchInput.value;
                this.pubSub.publish('get-weather', searchData);
            }
        });
    }
}

export default AppView;