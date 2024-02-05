import app from './src/appRunner';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

const server = createServer(app);
dotenv.config();

server.listen(parseInt(process.env.PORT!) || 3000, process.env.ADDR || 'localhost', () => {
    console.log(`[SERVER] - Server running at ${process.env.ADDR} on ${process.env.PORT}`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})