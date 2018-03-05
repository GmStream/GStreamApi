import * as bcrypt from "bcrypt-nodejs";
import * as mongoose from  'mongoose';

const StreamScheme = {
    channelId:{
        type:mongoose.Schema.Types.ObjectId
    },
streamName:{
    default:'',
    type:String
}


}