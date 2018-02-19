import * as mongoose from 'mongoose';

import { ChannelScheme, ISteamModel } from './stream_scheme';
import { IUserModel, UserSchema } from './user_schema';

export const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);

export const Channel: mongoose.Model<ISteamModel> = mongoose.model<ISteamModel>(
  'Channel',
  ChannelScheme
);
