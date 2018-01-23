export interface InterfaceUser {
  channelName: string;
  confirmed: boolean;
  email: string;
  image: string;
  interfaceLang: string;
  name: string;
  password: string;
  subscribtion: string[];
}

export interface InterfaceUserPayload {
  channelName: string;
  email: string;
  name: string;
  password: string;
}
