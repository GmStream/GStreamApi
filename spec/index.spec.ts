// connection to test database

// configure enviroment
import * as dotenv from 'dotenv';
dotenv.config();

import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';

const db = process.env.TEST_DB;

(mongoose as any).Promise = bluebird;
mongoose.connect(db);
