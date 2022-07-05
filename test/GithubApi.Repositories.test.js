// Importing axios libary
const axios = require('axios');
// Importing expect from chai library
const { expect } = require('chai');
// Importing http library
const { StatusCodes } = require('http-status-codes');

const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const CryptoJS = require('crypto-js');

describe('GET Requests', () => {
  const url = 'https://api.github.com/users/aperdomob';
  let reposUrl;
  let jasmineUrl;
  let jasmineContent;
  let readDownload;

  describe('Should Check Validity Of aperdomob\'s Repository Data', () => {
    it('Should Return Main Info Of aperdomob\'s Repository', async () => {
      const response = await axios.get(url);
      reposUrl = response.data.repos_url;

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.statusText).to.equal('OK');
      expect(response.data).to.have.property('name').to.equal('Alejandro Perdomo');
      expect(response.data).to.have.property('company').to.equal('Perficient Latam');
      expect(response.data).to.have.property('location').to.equal('Colombia');
    });

    describe('Should Return All Repos Of aperdomob\'s', () => {
      it('Should Check Validity of jasmine Repository', async () => {
        const response = await axios.get(reposUrl);
        const jasmine = response.data.find((element) => element.name === 'jasmine-json-report');
        jasmineUrl = jasmine.url;
        jasmineContent = jasmine.contents_url.substring(0, jasmine.contents_url.indexOf('/{+path}'));

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.statusText).to.equal('OK');
        expect(jasmine).to.have.property('name').to.equal('jasmine-json-report');
        expect(jasmine).to.have.deep.property('private', false);
        expect(jasmine).to.have.property('description').to.equal('A Simple Jasmine JSON Report');
      });
    });

    describe('Should Download jasmine Repository', () => {
      it('Should Catch jasmine Repository as a .zip file', async () => {
        const response = await axios.get(`${jasmineUrl}/zipball`);

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.statusText).to.equal('OK');
        expect(response.headers).to.have.property('access-control-allow-origin').to.equal('https://render.githubusercontent.com');
        expect(response.headers).to.have.property('content-disposition').to.include('attachment');
        expect(response.headers).to.have.property('content-type').to.equal('application/zip');
      });
    });

    describe('Should Get jasmine Repository Contents', () => {
      it('Should Catch jasmine Repository Content List', async () => {
        const response = await axios.get(jasmineContent);
        const readme = response.data.find((element) => element.name === 'README.md');
        readDownload = readme.download_url;

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.statusText).to.equal('OK');
        expect(readme).to.containSubset({
          name: 'README.md',
          path: 'README.md',
          sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
        });
      });

      describe('Should Get README.md file', () => {
        it('Should dowload README.md only', async () => {
          const response = await axios.get(readDownload);
          console.log(CryptoJS.MD5(response.data));

          expect(response.status).to.equal(StatusCodes.OK);
          expect(response.statusText).to.equal('OK');
        });
      });
    });
  });
});
