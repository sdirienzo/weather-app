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
}

export default AppModel;