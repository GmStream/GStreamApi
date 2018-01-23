import MainService from '../services';
import { chackChannelName, checkEmail, checkName, checkPass } from '../utils/';

import { USERC_CREATE_SUCCES } from '../utils/app_codes';

import * as status from 'http-status';

import * as Koa from 'koa';

export class UserController {
  public service = new MainService();

  public signUp = async (ctx: Koa.Context) => {
    const reqBody = ctx.request.body;
    try {
      checkEmail(reqBody.email);
      checkName(reqBody.name);
      checkPass(reqBody.pass);
      chackChannelName(reqBody.channelName);
      await this.service.createUser(reqBody);
      ctx.body = {
        // here will be text message, when locale dictionary  will be created
        message: USERC_CREATE_SUCCES
      };
    } catch (e) {
      ctx.body = {
        Error: e.message
      };
      ctx.status = status.UNPROCESSABLE_ENTITY;
    }
  };
}

export default new UserController();
