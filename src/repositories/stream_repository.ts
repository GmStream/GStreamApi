import { Channel } from '../schemes/';
import { ISteamModel } from '../schemes/stream_scheme';

export default class ChannelRepository {
  public create = async (payload: any) => {
    const channel = new Channel(payload);
    await channel.save();
  };

  public getByName = async (channelName: string) => {
    return await Channel.find({ channelName });
  };

  public start = async (payload: any) => {
    return await Channel.findOneAndUpdate(
      { id: payload.id },
      { $set: { ifStreaming: true, streamName: payload.name } }
    );
  };
}
