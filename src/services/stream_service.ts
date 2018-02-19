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
}
