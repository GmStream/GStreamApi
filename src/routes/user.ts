import * as Koa from 'koa';
import * as Router from 'koa-router';
import userController from '../controllers/userConstroller';
import userConstroller from '../controllers/userConstroller';

const router = new Router();

router.post('/signup', userConstroller.signUp);

export default router;
