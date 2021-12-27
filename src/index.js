import PubSub from "pubsub-js";
import AppController from "./controllers/app-controller";
import AppView from "./views/app-view";
import './styles/app-style.css';

const pubSub = PubSub;
const app = new AppController(new AppView(pubSub));
app.init();