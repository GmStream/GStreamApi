import { assert, expect } from 'chai';
import * as functions from '../src/sum';


it("should return sum",() => {
    assert.equal(functions.sum(3,3),6);
})