import * as mongoose from 'mongoose';

import { IUserModel, UserSchema } from './user_schema';

export const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);
