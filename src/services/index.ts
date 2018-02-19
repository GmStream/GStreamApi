import { ISteamModel } from '../schemes/stream_scheme';
import { IUserModel } from '../schemes/user_schema';
import { getToken } from '../utils';
import ERROR_CODES from '../utils/error_codes';
import ActionErrors from '../utils/errors/action_errors';
import StreamService from './stream_service';
import UserService from './user_service';

import { InterfaceUserPayload } from '../interfaces';

export default class MainService {
  public userService = new UserService();
  public streamService = new StreamService();

  public getUserByEmail = async (email: string) => {
    return await this.userService.getByEmail(email);
  };

  public createChannel = async (channelName: string, userId: string) => {
    await this.streamService.create({
      channelName,
      userId
    });
  };

  public getChannelByName = async (channelName: string) => {
    return await this.streamService.getByName(channelName);
  };

  public createUser = async (payload: any) => {
    const user = await this.getUserByEmail(payload.email);
    const channel = await this.getChannelByName(payload.channelName);
    if (channel || user) {
      throw new ActionErrors(ERROR_CODES.USER_EXIST);
    } else {
      try {
        const userData = {
          email: payload.email,
          name: payload.name,
          password: payload.password
        };
        const userId = await this.userService.create(userData);
        global.console.log(userId);
        this.createChannel(payload.channelName, userId);
      } catch (error) {
        global.console.log(error);
      }
    }
  };

  public confirmUser = async (email: string) => {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new ActionErrors(ERROR_CODES.USER_EXIST);
    } else {
      try {
        await this.userService.confirm(email);
      } catch (error) {
        global.console.log(error);
      }
    }
  };

  public signIn = async (payload: any) => {
    const user = await this.getUserByEmail(payload.email);
    if (user) {
      const isPassMatch = user.comparePassword(payload.password);
      if (isPassMatch && user.confirmed) {
        const tokenData = {
          email: user.email,
          name: user.name
        };
        const token = getToken(tokenData);
        return token;
      } else if (!user.confirmed) {
        throw new ActionErrors(ERROR_CODES.USER_ACCOUNT_NOT_CONFIRMED);
      } else {
        throw new ActionErrors(ERROR_CODES.WRONG_PASSWORD_OR_USERNAME);
      }
    }
  };
}
