const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

describe('Redirection Test', () => {
  const oldRepo = 'https://github.com/aperdomob/redirect-test';
  const newRepo = 'https://github.com/aperdomob/new-redirect-test';

  it('Should Check A Repo New Location with HEAD', async () => {
    const response = await axios.head(oldRepo);

    expect(response.request.res.responseUrl).to.equal(newRepo);
  });

  it('Should Check A Repo New Location with GET', async () => {
    const response = await axios.get(oldRepo);

    expect(response.status).to.equal(StatusCodes.OK);
  });
});
