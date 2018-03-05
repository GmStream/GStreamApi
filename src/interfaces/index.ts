import * as mongoose from 'mongoose';

export interface InterfaceUser {
  confirmed: boolean;
  email: string;
  interfaceLang: string;
  name: string;
  password: string;
  subscribtion: mongoose.Schema.Types.ObjectId[];
}

export interface InterfaceUserPayload {
  email: string;
  name: string;
  password: string;
}

export interface InterfaceChannel {
  channelName: string;
  userId: mongoose.Schema.Types.ObjectId;
  image: string;
  isStreaming: boolean;
}

export interface InterfaceStream {
  channelId: mongoose.Schema.Types.ObjectId;
  name: string;
}
