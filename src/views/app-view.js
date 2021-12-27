class AppView {
    pubSub;

    body;
    
    content;

    searchInput;

    currentWeather;

    weatherForecast;

    constructor(pubSub) {
        this.pubSub = pubSub;

        this.body = this.getElement('body');

        this.content = this.getElement('#content');

        this.init();
    }

    init() {
        this.createWeatherSearchSection();
        this.createWeatherCurrentSection();
        this.createWeatherForecastSection();
    }

    subscribeView() {
        this.pubSub.subscribe('display-weather', this.displayCurrentWeather.bind(this));

        this.pubSub.subscribe('display-forecast', this.displayWeatherForecast.bind(this));

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

    getWeatherIconClass(id) {
        if (id >= 200 && id < 300) {
            return 'fa-bolt';
        }
        if (id >= 300 && id < 400) {
            return 'fa-cloud-rain';
        }
        if (id >= 500 && id < 600) {
            return 'fa-cloud-showers-heavy';
        }
        if (id >= 600 && id < 700) {
            return 'fa-snowflake';
        }
        if (id >= 700 && id < 800) {
            return 'fa-smog';
        }
        if (id === 800) {
            return 'fa-sun';
        }
        if (id >= 801 && id < 900) {
            return 'fa-cloud';
        }
    }

    getWeatherBackgroundColor(id) {
        if (id >= 200 && id < 300) {
            return '#3C424C';
        }
        if (id >= 300 && id < 400) {
            return '#3C424C';
        }
        if (id >= 500 && id < 600) {
            return '#3C424C';
        }
        if (id >= 600 && id < 700) {
            return '#B8B8B8';
        }
        if (id >= 700 && id < 800) {
            return '#D3D2D3';
        }
        if (id === 800) {
            return '#3f90c3';
        }
        if (id >= 801 && id < 900) {
            return '#C9CACA';
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

    createWeatherForecastSection() {
        const weatherForecastSection = this.createElement('div', 'weather-forecast-section');
        const weatherForecastContainer = this.createElement('div', 'weather-forecast-container');

        weatherForecastSection.append(weatherForecastContainer);

        this.weatherForecast = weatherForecastContainer;
        this.content.append(weatherForecastSection);
    }

    displayCurrentWeather(msg, currentWeather) {
        this.destroyCurrentWeather();

        const weatherCurrentCondition = this.createElement('div', 'weather-current-condition-text');
        weatherCurrentCondition.innerText = currentWeather.condition;

        const weatherCurrentLocation = this.createElement('div', 'weather-current-location');
        weatherCurrentLocation.innerText = currentWeather.location;

        const weatherCurrentDescription = this.createElement('div', 'weather-current-description');
        const weatherCurrentTemp = this.createElement('div', 'weather-current-temp');
        weatherCurrentTemp.innerText = currentWeather.temp;

        const weatherCurrentDetails = this.createElement('div', 'weather-current-details');
        const weatherCurrentFeelsLike = this.createElement('div', 'weather-current-feels-like');
        weatherCurrentFeelsLike.innerText = `Feels Like: ${currentWeather.feelsLikeTemp}`;

        const weatherCurrentWind = this.createElement('div', 'weather-current-wind');
        weatherCurrentWind.innerText = `Wind: ${currentWeather.windSpeed}`;

        const weatherCurrentHumidity = this.createElement('div', 'weather-current-humidity');
        weatherCurrentHumidity.innerText = `Humidity: ${currentWeather.humidity}`;

        const weatherCurrentConditionIconContainer = this.createElement('div', 'weather-current-condition-icon');
        const conditionIconClass = this.getWeatherIconClass(currentWeather.id);
        const weatherCurrentConditionIcon = this.createElement('i', `fas ${conditionIconClass}`);

        weatherCurrentConditionIconContainer.append(weatherCurrentConditionIcon);

        weatherCurrentDetails.append(weatherCurrentFeelsLike);
        weatherCurrentDetails.append(weatherCurrentWind);
        weatherCurrentDetails.append(weatherCurrentHumidity);

        weatherCurrentDescription.append(weatherCurrentTemp);
        weatherCurrentDescription.append(weatherCurrentDetails);

        this.body.style.backgroundColor = this.getWeatherBackgroundColor(currentWeather.id);

        this.currentWeather.append(weatherCurrentCondition);
        this.currentWeather.append(weatherCurrentLocation);
        this.currentWeather.append(weatherCurrentDescription);
        this.currentWeather.append(weatherCurrentConditionIconContainer);
    }

    createWeatherForecastDay(weekday, temp, id) {
        const dayForecast = this.createElement('div', 'weather-forecast-day');
        const forecastWeekday = this.createElement('div', 'weather-forecast-weekday');
        const forecastTemp = this.createElement('div', 'weather-forecast-temp');
        const forecastCondition = this.createElement('div', 'weather-forecast-condition');
        const forecastConditionIcon = this.createElement('i', 'fas');
        const conditionIconClass = this.getWeatherIconClass(id);

        forecastWeekday.innerText = weekday;
        forecastTemp.innerText = temp;
        forecastConditionIcon.classList.add(conditionIconClass);

        forecastCondition.append(forecastConditionIcon);

        dayForecast.append(forecastWeekday);
        dayForecast.append(forecastTemp);
        dayForecast.append(forecastCondition);

        return dayForecast;
    }

    displayWeatherForecast(msg, forecast) {
        this.destroyWeatherForecast();

        forecast.days.forEach(day => {
            this.weatherForecast.append(this.createWeatherForecastDay(day.weekday, day.temp, day.id));
        });
    }

    applyEventListeners() {
        this.searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const searchData = {};
                searchData.city = this.searchInput.value;
                this.pubSub.publish('get-weather', searchData);
            }
        });
    }
}

export default AppView;