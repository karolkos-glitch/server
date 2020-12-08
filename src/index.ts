import express from 'express';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import './controllers/RootController';
import { AppRouter as controllerRouter } from './AppRouter'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({ keys: ['laskdjf']}));
app.use(controllerRouter.getInstance());

app.listen(3000, () => console.log('Listening on port haha 3000'));