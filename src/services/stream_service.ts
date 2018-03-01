import StreamRepository from '../repositories/stream_repository';
import { ISteamModel } from '../schemes/stream_scheme';

export default class StreamService {
  public repository = new StreamRepository();
  public create = async (payload: any) => {
    await this.repository.create(payload);
  };

  public getByName = async (channelName: string) => {
    return await this.repository.getByName(channelName);
  };

  public start = async (payload: any) => {
    return await this.repository.start(payload);
  };

  public loadChannels = async (payload: any) => {
    return await this.repository.loadChannels(payload);
  };

  public stop = async (payload: any) => {
    await this.repository.loadChannels(payload);
  };

  public getUserStreamKey = async (payload: any) => {
    return await this.repository.getUserStreamKey(payload);
  };
}
