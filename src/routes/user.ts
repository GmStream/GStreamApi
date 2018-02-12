import * as Koa from 'koa';
import * as Router from 'koa-router';
import userController from '../controllers/user_controller';

const router = new Router();

router.post('/signup', userController.signUp);
router.post('/confirm', userController.confirmation);
router.post('/signin', userController.signIn);

export default router;
