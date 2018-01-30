import * as Koa from 'koa';
import * as Router from 'koa-router';
import userController from '../controllers/userConstroller';

const router = new Router();

router.post('/signup', userController.signUp);
router.post('/confirm', userController.confirmation);
router.post('/signin', userController.signIn);

export default router;
