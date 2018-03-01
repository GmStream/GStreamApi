// configure enviroment
import * as dotenv from 'dotenv';
dotenv.config();

import * as bluebird from 'bluebird';
import * as http from 'http';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as mongoose from 'mongoose';
import * as socket from 'socket.io';
import routes from './routes';

import appLogger from './utils/logger';

// tslint:disable-next-line:no-var-requires
const cors = require('@koa/cors');

// any 'cause db variable should be string or undefined

let db: any;

if (process.env.NODE_ENV === 'production') {
  db = process.env.PROD_DB;
} else {
  db = process.env.TEST_DB;
}

(mongoose as any).Promise = bluebird;
mongoose.connect(db);
if (process.env.NODE_ENV === 'production') {
  mongoose.set('debug', false);
} else {
  mongoose.set('debug', true);
}
const app = new Koa();

app
  .use(cors())
  .use(bodyParser())
  .use(logger())
  .use(routes.routes());

const server = http.createServer(app.callback());
const io = socket.listen(server);

server.listen(process.env.PORT);

io.on('connection', sock => {
  appLogger.info(`User ${sock.id} connected`);
  sock.on('join_room', (payload: any) => {
    sock.join(payload.roomId);
    io.to(payload.roomId).emit('message', { message: `User ${payload.user} joined to stream` });
    appLogger.info(`User ${payload.user}  joined to room ${payload.roomId}`);
  });

  sock.on('room_message', (payload: any) => {
    io.to(payload.roomId).emit('message', { message: payload.message, user: payload.user });
    global.console.log(payload.roomId);
  });

  sock.on('leave_room', (payload: any) => {
    sock.leave(payload.roomId);
    appLogger.info(`User ${payload.user}  leave room ${payload.roomId}`);
    io.to(payload.roomId).emit('message', { message: `User ${payload.user} leave stream` });
  });

  sock.on('disconnect', () => {
    appLogger.info(`User ${sock.id} disconnected`);
  });
});
