import { InterfaceUserPayload } from '../interfaces';
import { User } from '../schemes';
import { IUserModel } from '../schemes/user_schema';

export default class UserRepository {
  public getByEmail = async (email: string) => {
    return await User.findOne({ email });
  };

  public create = async (payload: InterfaceUserPayload) => {
    const user = new User(payload);
    await user.save();
  };
}
