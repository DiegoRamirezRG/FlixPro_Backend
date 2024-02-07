import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routesProvider from './routes/provider.routes';

//Express Config
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.disable('x-powered-by');

//Routes Init
routesProvider(app);

export default app;