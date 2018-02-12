import ERROR_CODES from '../error_codes';

export default class ActionErrors {
  public message: string;
  public code: number;
  constructor(code: number) {
    if (code === ERROR_CODES.USER_EXIST) {
      this.message = 'User with current email already exist';
      this.code = code;
    }
    if (code === ERROR_CODES.USER_ACCOUNT_NOT_CONFIRMED) {
      this.message = 'User acoount not confirmed.Please check you email inbox';
      this.code = code;
    }
    if (code === ERROR_CODES.WRONG_PASSWORD_OR_USERNAME) {
      this.message = 'Wrong password or username';
      this.code = code;
    }
  }
}
