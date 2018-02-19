export interface InterfaceUser {
  confirmed: boolean;
  email: string;
  interfaceLang: string;
  name: string;
  password: string;
  subscribtion: string[];
}

export interface InterfaceUserPayload {
  email: string;
  name: string;
  password: string;
}

export interface InterfaceChannel {
  channelName: string;
  userId: string;
  image: string;
}
