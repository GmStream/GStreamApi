import * as Koa from 'koa';
import * as Router from 'koa-router';
import StreamController from '../controllers/stream_controller';

const router = new Router();

router.post('/load', StreamController.loadChannels);
router.post('/check_stream', StreamController.check);
router.post('/change_image', StreamController.changeImage);
export default router;
