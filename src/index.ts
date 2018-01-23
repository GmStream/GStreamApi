// configure enviroment
import * as dotenv from 'dotenv';
dotenv.config();

import * as bluebird from 'bluebird';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as mongoose from 'mongoose';
import routes from './routes';

// any 'cause db variable should be string or undefined

let db: any;

if (process.env.NODE_ENV === 'production') {
  db = process.env.PROD_DB;
} else {
  db = process.env.TEST_DB;
}

(mongoose as any).Promise = bluebird;
mongoose.connect(db);
mongoose.set('debug', true);

const app = new Koa();

app
  .use(bodyParser())
  .use(logger())
  .use(routes.routes())
  .listen(process.env.PORT);
