import AppController from "./controllers/app-controller";
import AppView from "./views/app-view";
import './styles/app-style.css';

const app = new AppController(new AppView());