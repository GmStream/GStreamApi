import { assert, expect } from 'chai';
import { decodeToken, getToken } from '../src/utils';

describe('Token specs', () => {
  const email = 'pupkin@mail.com';
  let token: any;

  before(() => {
    token = getToken({ email });
  });

  it('should decode token', () => {
    const decoded = decodeToken(token);
    assert.equal(email, decoded.email);
  });
});
