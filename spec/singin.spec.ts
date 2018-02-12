import { assert, expect, should } from 'chai';
import { error } from 'util';
import { User } from '../src/schemes';
import MainService from '../src/services';
import { decodeToken, getToken } from '../src/utils';
import ERROR_CODES from '../src/utils/error_codes';

const mainService = new MainService();
const payload = {
  channelName: 'bugurt',
  email: 'yas.pup@gmail.com',
  name: 'Yasya',
  password: 'bghjktyf2132!'
};

const wrongPassword = 'bnngkg221!';
const wrongEmail = 'bublik231@gmail.com';

describe('Sign In specs', () => {
  beforeEach(async () => {
    await mainService.createUser(payload);
  });

  it('Should return token with user data if user account confirmed', async () => {
    await mainService.confirmUser(payload.email);
    const token = await mainService.signIn({ email: payload.email, password: payload.password });
    const decodedData = decodeToken(token);
    assert.equal(decodedData.email, payload.email);
    assert.equal(decodedData.channelName, payload.channelName);
    assert.equal(decodedData.name, payload.name);
  });

  it('Should throw an error if password wrong', async () => {
    await mainService.confirmUser(payload.email);
    try {
      const token = await mainService.signIn({ email: payload.email, password: payload.password });
    } catch (error) {
      expect(error).to.have.property('message');
      expect(error).to.have.property('code');
      assert.equal(error.code, ERROR_CODES.WRONG_PASSWORD_OR_USERNAME);
    }
  });

  it('Should throw an error if account not confirmed', async () => {
    try {
      const token = await mainService.signIn({ email: payload.email, password: payload.password });
    } catch (error) {
      expect(error).to.have.property('message');
      expect(error).to.have.property('code');
      assert.equal(error.code, ERROR_CODES.USER_ACCOUNT_NOT_CONFIRMED);
    }
  });

  afterEach(async () => {
    await User.remove({});
  });
});
