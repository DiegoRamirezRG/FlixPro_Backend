import { Server } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();
let io: SocketServer;

export const initSocketServer = (server: Server) => {
    io = new SocketServer(server, { cors: { origin: "*" } });
    console.log(`[socket] - Socket server running at http://${process.env.ADDR}:${process.env.PORT}`);

    io.on('connection', (socket: Socket) => {
        console.log('Usuario conectado');

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
}

export const getSocketIntance = () : SocketServer => {
    if(!io){
        throw new Error('Socket.io no inicializado');
    }
    return io;
}