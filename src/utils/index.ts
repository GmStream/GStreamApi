import ERROR_CODES from './error_codes';
import ValidationError from './errors/validation_errors';

import * as jwt from 'jsonwebtoken';
import { jwtSecret, mail, url } from '../config';

export const nameRegExp = new RegExp(`^[a-zA-Zа-яёА-ЯЁ\s\'\-]+$`);
export const passwordRegExp = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$');
export const emailRegExp = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$');
export const yearRegExp = new RegExp('^(19[0-9][0-9]|200[0-9]|201[0-7])$');
export const positiveNumsRegExp = new RegExp('^[0-9][0-9]*$');
export const channelRegExp = new RegExp(`^[a-zA-Zа-яёА-ЯЁ0-9\s\'\-]+$`);

export const checkEmail = (email: string) => {
  if (email && !emailRegExp.test(email)) {
    throw new ValidationError(ERROR_CODES.EMAIL_VALIDATION);
  }
};

export const checkName = (name: string) => {
  if (name && !nameRegExp.test(name)) {
    throw new ValidationError(ERROR_CODES.NAME_VALIDATION_ERROR);
  }
};

export const checkPass = (pass: string) => {
  if (pass && !passwordRegExp.test(pass)) {
    throw new ValidationError(ERROR_CODES.PASSWORD_VALIDATION_EROR);
  }
};

export const chackChannelName = (channelName: string) => {
  if (channelName && !channelRegExp.test(channelName)) {
    throw new ValidationError(ERROR_CODES.CHANNEL_NAME_VALIDATION_EROR);
  }
};

export const getToken = (data: any) => {
  return jwt.sign(data, jwtSecret, { noTimestamp: true });
};

export const decodeToken = (token: string) => {
  let decoded: any | null = null;
  jwt.verify(token, jwtSecret, (err: any, res: any) => {
    if (err) {
      // add error
    }
    decoded = res;
  });
  return decoded;
};
