import UserRepository from '../repositories/user_repository';
import { IUserModel } from '../schemes/user_schema';

import { InterfaceUserPayload } from '../interfaces';

export default class UserService {
  public userRepo = new UserRepository();

  public getByEmail = async (email: string) => {
    return await this.userRepo.getByEmail(email);
  };

  public create = async (payload: InterfaceUserPayload) => {
    return await this.userRepo.create(payload);
  };

  public confirm = async (email: string) => {
    return await this.userRepo.confirm(email);
  };
}
