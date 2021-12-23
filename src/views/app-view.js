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
}

export default AppView;