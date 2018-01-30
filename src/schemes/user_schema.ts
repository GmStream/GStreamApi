import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';
import { sendEmail } from '../utils/mailer';

import { InterfaceUser } from '../interfaces';

export interface IUserModel extends InterfaceUser, mongoose.Document {
  comparePassword(candidatePassword: string): boolean;
}

const UserSchema = new mongoose.Schema(
  {
    channelName: {
      required: true,
      type: String,
      uniquie: true
    },
    confirmed: {
      default: false,
      type: Boolean
    },

    email: {
      required: true,
      type: String,
      unique: true
    },
    image: {
      default: '',
      type: String
    },
    interfaceLang: {
      default: 'ru',
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    subscription: {
      default: true,
      required: true,
      type: Array
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (error: any, hash: any) => {
      if (error) {
        return next(error);
      }

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      user.password = hash;
      next();
    });
  });
});

UserSchema.post('save', async function() {
  const user = this;
  await sendEmail(this.email, this.name);
});

UserSchema.methods.comparePassword = function(candidatePassword: string): boolean {
  if (bcrypt.compareSync(candidatePassword, this.password)) {
    return true;
  } else {
    return false;
  }
};

export { UserSchema };
