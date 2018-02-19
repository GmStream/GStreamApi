import MainService from '../services';

import * as status from 'http-status';

import * as Koa from 'koa';
import appLogger from '../utils/logger';

export class StreamConlroller {
  public mainService = new MainService();

  public startStream(ctx: Koa.Context) {
    const body = ctx.request.body;
    //
  }
}
