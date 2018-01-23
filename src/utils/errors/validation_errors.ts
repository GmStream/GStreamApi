import ERROR_CODES from '../error_codes';

export default class ValidationEroors {
  public message: string;
  constructor(code: number) {
    if (code === ERROR_CODES.EMAIL_VALIDATION) {
      this.message = 'Wrong email format';
    }
  }
}
