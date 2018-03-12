import {ISteamModel} from "../schemes/channel_scheme";
import {Channel} from "../schemes/index";

export default class {
 public create = async (payload: any) => {
    const channel = new Channel(payload);
    await channel.save();
  };

  public getByName = async (channelName: string) => {
    return await Channel.find({ channelName });
  };

  public start = async (payload: any) => {
    return await Channel.findOneAndUpdate(
      { _id: payload.id },
      { $set: { isStreaming: true, streamName: payload.name } }
    );
  };

  public loadChannels = async (payload: any) => {
    const skip = payload.skip || 0;
    if (payload.searchString) {
      return await Channel.find({ name: `/.*${payload.searchString}.*/gi` })
        .skip(skip)
        .limit(payload.limit);
    } else {
      return await Channel.find({})
        .skip(skip)
        .limit(payload.limit);
    }
  };

  public updateImage = async (payload: any) => {
    const channel = await Channel.findOneAndUpdate(
      { _id: payload.id },
      { $set: { image: payload.image } }
    );
    return channel.image;
  };

  public getUserStreamKey = async (payload: any) => {
    const stream: any = await Channel.findOne({ userId: payload.userId });
    return stream.id;
  };

  public stop = async (payload: any) => {
    await Channel.findOneAndUpdate({ _id: payload.id }, { $set: { isStreaming: false } });
  };

  public check = async (payload: any) => {
    const channel: any = await Channel.findOne({ _id: payload.id });
    const data = {
      isStreaming: channel.isStreaming,
      streamName: channel.streamName
    };
    return data;
  };

  public getByUserId = async (userId: string) => {
    return await Channel.findOne({ userId });
  };
}
