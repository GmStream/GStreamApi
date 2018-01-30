import MainService from '../services';
import { decodeToken } from '../utils';
import { chackChannelName, checkEmail, checkName, checkPass } from '../utils/';
import { USER_CREATE_SUCCES } from '../utils/app_codes';

import * as status from 'http-status';

import * as Koa from 'koa';
import appLogger from '../utils/logger';

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
        message: USER_CREATE_SUCCES
      };
    } catch (e) {
      appLogger.error('Sign up error', e);
      ctx.body = {
        Error: e.message
      };
      ctx.status = status.UNPROCESSABLE_ENTITY;
    }
  };

  public confirmation = async (ctx: Koa.Context) => {
    const reqBody = ctx.request.body;
    try {
      const data: any = decodeToken(reqBody.token);
      const email = data.email;
      if (email) {
        await this.service.confirmUser(email);
        ctx.status = status.OK;
      }
    } catch (e) {
      appLogger.error('Confirmation error', e);
      ctx.body = {
        Error: e.message
      };
      ctx.status = status.UNPROCESSABLE_ENTITY;
    }
  };

  public signIn = async (ctx: Koa.Context) => {
    const reqBody = ctx.request.body;

    try {
      const token = await this.service.signIn(reqBody);
      if (token) {
        ctx.body = {
          token
        };
        ctx.status = status.OK;
      } else {
        ctx.status = status.UNPROCESSABLE_ENTITY;
      }
    } catch (e) {
      ctx.body = {
        Error: e.message
      };
      appLogger.error('Sign in error', e);
      ctx.status = status.UNPROCESSABLE_ENTITY;
    }
  };
}

export default new UserController();
