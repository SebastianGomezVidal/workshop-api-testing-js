const axios = require('axios');
const { expect } = require('chai');

require('dotenv').config({ path: './.env' });

const url = 'https://api.github.com';

describe('Number Of Users Test', () => {
  describe('Should Checked Default Return Of Git Users', () => {
    it('Should Contain Default 30 Users By Default Pagination', async () => {
      const response = await axios.get(`${url}/users`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });

      expect(response.data.length).to.equal(30);
    });
  });

  describe('Should Checked Return Of 10 Git Users', () => {
    it('Should Contain Default 10 Users By Default Pagination', async () => {
      const response = await axios.get(
        `${url}/users`,
        { params: { per_page: 10 } },
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        }
      );

      expect(response.data.length).to.equal(10);
    });
  });

  describe('Should Checked Return Of 100 Git Users', () => {
    it('Should Contain Default 100 Users By Default Pagination', async () => {
      const response = await axios.get(
        `${url}/users`,
        { params: { per_page: 100 } },
        {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        }
      );

      expect(response.data.length).to.equal(100);
    });
  });
});
