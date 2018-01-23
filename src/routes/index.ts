import * as Router from 'koa-router';

import user from './user';

const router = new Router();

router.use('/api/user', user.routes());

export default router;
