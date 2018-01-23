import ERROR_CODES from '../error_codes';

export default class ActionErrors {
  public message: string;
  constructor(code: number) {
    if (code === ERROR_CODES.USER_EXIST) {
      this.message = 'User with current email already exist';
    }
  }
}
