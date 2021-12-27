class AppController {
    #model;
    
    #view;

    constructor(model, view) {
        this.#model = model;
        this.#view = view;
    }

    init() {
        this.#model.subscribeModel();
        this.#view.subscribeView();
    }

}

export default AppController;