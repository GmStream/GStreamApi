import ChannelRepository from "../repositories/channel_repository";

export default class StreamService {
  public repository = new Channelrepository();
  public create = async (payload: any) => {
    await this.repository.create(payload);
  };

  public getByName = async (channelName: string) => {
    return await this.repository.getByName(channelName);
  };

  public start = async () => {
    return await this.repository.start();
  };

  public loadChannels = async (payload: any) => {
    return await this.repository.loadChannels(payload);
  };

  public stop = async () => {
    await this.repository.stop();
  };


  public check = async (payload: any) => {
    return await this.repository.check(payload);
  };

  public updateImage = async (payload: any) => {
    return await this.repository.updateImage(payload);
  };

  public getByUserId = async (userId: string) => {
    return await this.repository.getByUserId(userId);
  };
}
