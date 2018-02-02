import { IUserModel } from '../schemes/user_schema';
import { getToken } from '../utils';
import ERROR_CODES from '../utils/error_codes';
import ActionErrors from '../utils/errors/action_errors';
import UserService from './user_service';

import { InterfaceUserPayload } from '../interfaces';

export default class MainService {
  public userService = new UserService();

  public getUserByEmail = async (email: string) => {
    return await this.userService.getByEmail(email);
  };

  public createUser = async (payload: InterfaceUserPayload) => {
    const user = await this.getUserByEmail(payload.email);
    if (user) {
      throw new ActionErrors(ERROR_CODES.USER_EXIST);
    } else {
      await this.userService.create(payload);
    }
  };

  public confirmUser = async (email: string) => {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new ActionErrors(ERROR_CODES.USER_EXIST);
    } else {
      await this.userService.confirm(email);
    }
  };

  public signIn = async (payload: any) => {
    const user = await this.getUserByEmail(payload.email);
    if (user) {
      const isPassMatch = user.comparePassword(payload.password);
      if (isPassMatch && user.confirmed) {
        const tokenData = {
          channelName: user.channelName,
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
