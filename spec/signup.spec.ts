// test for creation new acoount and its confirmation

import { assert, expect, should } from 'chai';
import { error } from 'util';
import { User } from '../src/schemes';
import MainService from '../src/services';
import { getToken } from '../src/utils';

const mainService = new MainService();
const payload = {
  channelName: 'bugurt',
  email: 'yas.pup@gmail.com',
  name: 'Yasya',
  password: 'bghjktyf2132!'
};

describe('Sign Up specs', () => {
  it('Should create new user with setted user data', async () => {
    await mainService.createUser(payload);
    const user = await mainService.getUserByEmail(payload.email);
    assert.equal(user.email, payload.email);
    assert.equal(user.name, payload.name);
    assert.equal(user.channelName, payload.channelName);
    assert.equal(user.confirmed, false);
  });

  afterEach(async () => {
    await User.remove({});
  });

  it('Should throw an error when account with current email is exist', async () => {
    await mainService.createUser(payload);
    try {
      await mainService.createUser(payload);
      assert.fail('error not thrown');
    } catch (error) {
      expect(error).to.have.property('message');
    }
  });
});
