import * as mongoose from 'mongoose';

import { InterfaceChannel } from '../interfaces';

export interface ISteamModel extends InterfaceChannel, mongoose.Document {}

const ChannelScheme = new mongoose.Schema({
  channelName: {
    required: true,
    type: String,
    uniquie: true
  },
  image: {
    default: '',
    type: String
  },
  isStreaming: {
    default: false,
    type: Boolean
  },
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
});

export { ChannelScheme };
