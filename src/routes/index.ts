import * as Router from 'koa-router';

import channel from './channel';
import stream from './stream';
import user from './user';

const router = new Router();

router.use('/api/user', user.routes());
router.use('/api/stream', stream.routes());
router.use('/api/channel', channel.routes());

export default router;
