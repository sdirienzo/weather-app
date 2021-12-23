class AppView {
    pubSub;
    
    content;

    constructor(pubSub) {
        this.pubSub = pubSub;

        this.content = this.getElement('#content');
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

    createWeatherSearchSection() {
        const searchSection = this.createElement('div', 'weather-search-section');
        const searchForm = this.createElement('form', 'weather-search-form');
        const searchContainer = this.createElement('div', 'weather-search-container');
        const searchIcon = this.createElement('i', 'fas fa-search');
        const searchInput = this.createElement('input', 'weather-search-input"');
        searchInput.type = 'text';

        searchContainer.append(searchIcon);
        searchContainer.append(searchInput);
        searchForm.append(searchContainer);
        searchSection.append(searchForm);

        this.content.append(searchSection);
    }

    createWeatherCurrentSection() {
        const weatherCurrentSection = this.createElement('div', 'weather-current-section');
        const weatherCurrentContainer = this.createElement('div', 'weather-current-container');
        const weatherCurrentCondition = this.createElement('div', 'weather-current-condition-text');
        const weatherCurrentLocation = this.createElement('div', 'weather-current-location');
        const weatherCurrentDescription = this.createElement('div', 'weather-current-description');
        const weatherCurrentTemp = this.createElement('div', 'weather-current-temp');
        const weatherCurrentDetails = this.createElement('div', 'weather-current-details');
        const weatherCurrentFeelsLike = this.createElement('div', 'weather-current-feels-like');
        weatherCurrentFeelsLike.innerText = 'Feels Like: ';
        const weatherCurrentFeelsLikeSpan = this.createElement('span');
        const weatherCurrentWind = this.createElement('div', 'weather-current-wind');
        weatherCurrentWind.innerText = 'Wind: ';
        const weatherCurrentWindSpan = this.createElement('span');
        const weatherCurrentHumidity = this.createElement('div', 'weather-current-humidity');
        weatherCurrentHumidity.innerText = 'Humidity: ';
        const weatherCurrentHumiditySpan = this.createElement('span');
        const weatherCurrentConditionIconContainer = this.createElement('div', 'weather-current-condition-icon');
        const weatherCurrentConditionIcon = this.createElement('i', 'fas');

        weatherCurrentConditionIconContainer.append(weatherCurrentConditionIcon);

        weatherCurrentFeelsLike.append(weatherCurrentFeelsLikeSpan);
        weatherCurrentWind.append(weatherCurrentWindSpan);
        weatherCurrentHumidity.append(weatherCurrentHumiditySpan);

        weatherCurrentDetails.append(weatherCurrentFeelsLike);
        weatherCurrentDetails.append(weatherCurrentWind);
        weatherCurrentDetails.append(weatherCurrentHumidity);

        weatherCurrentDescription.append(weatherCurrentTemp);
        weatherCurrentDescription.append(weatherCurrentDetails);

        weatherCurrentContainer.append(weatherCurrentCondition);
        weatherCurrentContainer.append(weatherCurrentLocation);
        weatherCurrentContainer.append(weatherCurrentDescription);
        weatherCurrentContainer.append(weatherCurrentConditionIconContainer);

        weatherCurrentSection.append(weatherCurrentContainer);

        this.content.append(weatherCurrentContainer);
    }

    createWeatherForecastSection() {
        const weatherForecastSection = this.createElement('div', 'weather-forecast-section');
        const weatherForecastContainer = this.createElement('div', 'weather-forecast-container');

        weatherForecastSection.append(weatherForecastContainer);

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
}

export default AppView;