import * as Koa from 'koa';
import * as Router from 'koa-router';
import userController from '../controllers/userConstroller';

const router = new Router();

router.post('/signup', userController.signUp);
router.post('/confirmation', userController.confirmation);

export default router;
