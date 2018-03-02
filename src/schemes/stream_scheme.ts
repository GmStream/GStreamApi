import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';

import { defaultImage } from '../utils';

import { InterfaceChannel } from '../interfaces';

export interface ISteamModel extends InterfaceChannel, mongoose.Document {
  comparePassword(candidatePassword: string): boolean;
}

const ChannelScheme = new mongoose.Schema({
  channelName: {
    required: true,
    type: String,
    uniquie: true
  },
  image: {
    default: defaultImage,
    type: String
  },
  isStreaming: {
    default: false,
    type: Boolean
  },
  streamName: {
    default: '',
    type: String
  },
  userId: {
    required: true,
    type: String
  }
});

export { ChannelScheme };
