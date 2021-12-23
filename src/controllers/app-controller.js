class AppController {
    #view;

    constructor(view) {
        this.#view = view;
    }

    init() {
        this.view.subscribeView();
    }

}

export default AppController;