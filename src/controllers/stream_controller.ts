import MainService from '../services';

import * as status from 'http-status';

import * as Koa from 'koa';
import appLogger from '../utils/logger';

export class StreamConlroller {
  public mainService = new MainService();

  public startStream = async (ctx: Koa.Context) => {
    const payload = ctx.request.body;

    try {
      await this.mainService.startStream(payload);
      ctx.status = status.OK;
    } catch (error) {
      ctx.status = status.BAD_REQUEST;
    }
  };

  public getUserStreamKey = async (ctx: Koa.Context) => {
    const payload = ctx.request.body;
    try {
      const id = await this.mainService.getUserStreamKey(payload);
      ctx.body = {
        streamId: id
      };
      ctx.status = status.OK;
    } catch (error) {
      ctx.status = status.BAD_REQUEST;
    }
  };

  public stopStream = async (ctx: Koa.Context) => {
    const payload = ctx.request.body;

    try {
      await this.mainService.stopStream(payload);
      ctx.status = status.OK;
    } catch (error) {
      ctx.status = status.BAD_REQUEST;
    }
  };

  public loadChannels = async (ctx: Koa.Context) => {
    const payload = ctx.request.body;

    try {
      const channels = await this.mainService.loadChannels(payload);
      ctx.status = status.OK;
      ctx.body = {
        channels
      };
    } catch (error) {
      ctx.status = status.BAD_REQUEST;
    }
  };
}

export default new StreamConlroller();
