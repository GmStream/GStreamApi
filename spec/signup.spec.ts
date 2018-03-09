// test for creation new acoount and its confirmation

import { assert, expect, should } from 'chai';
import { error } from 'util';
import { User } from '../src/schemes';
import MainService from '../src/services';

const mainService = new MainService();
const payload = {
  email: 'yas.pup@gmail.com',
  name: 'Yasya',
  password: 'bghjktyf2132!'
};

const channelPayload = {
    channelName: 'bugurt'
}

describe('Sign Up specs', () => {
  beforeEach(async () => {
    await mainService.createUser(payload);
  });

  it('Should create new user with setted user data', async () => {
    const user = await mainService.getUserByEmail(payload.email);
    assert.equal(user.email, payload.email);
    assert.equal(user.name, payload.name);
  //  assert.equal(user.channelName, payload.channelName);
    assert.equal(user.confirmed, false);
  });

  it('Should throw an error when account with current email is exist', async () => {
    try {
      await mainService.createUser(payload);
      assert.fail('error not thrown');
    } catch (error) {
      expect(error).to.have.property('message');
    }
  });

  it('Shoul confirm account if user followed link', async () => {
    await mainService.confirmUser(payload.email);
    const user = await mainService.getUserByEmail(payload.email);
    assert.equal(user.confirmed, true, 'setted true flag to confirmed fiels');
  });

  afterEach(async () => {
    await User.remove({});
  });
});
