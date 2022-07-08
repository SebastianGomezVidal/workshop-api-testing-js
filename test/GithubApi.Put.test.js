const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

require('dotenv').config({ path: './.env' });

const url = 'https://api.github.com';
const user = 'aperdomob';

const userToFollow = () => {
  it('Should Validate An User Is Followed', async () => {
    const response = await axios.put(`${url}/user/following/${user}`, {}, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });

    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    expect(response.statusText).to.equal('No Content');
    expect(response.data).to.eql('');
  });
};

const followedUser = () => {
  it(`Should Validate I am Following ${user}`, async () => {
    const response = await axios.get(`${url}/user/following`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });

    const userFollowed = response.data.find((list) => list.login === user);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.statusText).to.equal('OK');
    expect(response.data.length).to.equal(3);
    expect(userFollowed).to.have.property('login').to.equal('aperdomob');
  });
};

describe('Github Api PUT Request Tests', () => {
  describe('Should Follow An User', userToFollow);

  describe('Should Show List Of All Followed User', followedUser);

  for (let step = 0; step < 5; step += 1) {
    describe(`Should Run Follow ${user} ${step} time`, userToFollow);
  }

  describe('Should Proves PUTs Idempotency', followedUser);
});
