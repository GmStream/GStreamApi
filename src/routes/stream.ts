import * as Koa from 'koa';
import * as Router from 'koa-router';
import StreamController from '../controllers/stream_controller';

const router = new Router();

router.post('/sart_stream', StreamController.startStream);
router.post('/stop_stream', StreamController.stopStream);
export default router;
