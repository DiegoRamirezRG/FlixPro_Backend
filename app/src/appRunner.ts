import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

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

export default app;