const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const isomorphic = require('isomorphic-fetch');

const chai = require('chai');
chai.use(require('chai-subset'));

require('dotenv').config({ path: './.env' });

const jsCode = `
function wait(method, time) {
  return new Promise((resolve) => {
    setTimeout(resolve(method()), time);
  });
}
`;

const url = 'https://api.github.com';
const auth = {
  Authorization: `token ${process.env.ACCESS_TOKEN}`
};

describe('Given a github user', () => {
  describe('when create a gist', () => {
    let gist;

    const createGist = {
      description: 'this is an example about promise',
      public: true,
      files: {
        'promise.js': {
          content: jsCode
        }
      }
    };

    let newGistStatus;

    before(async () => {
      const parameters = {
        method: 'POST',
        body: JSON.stringify(createGist),
        headers: auth
      };

      const response = await isomorphic(`${url}/gists`, parameters);
      newGistStatus = response.status;
      gist = await response.json();
    });

    it('then a new gist should be created', () => {
      expect(newGistStatus).to.equal(StatusCodes.CREATED);
      expect(gist).to.containSubset(createGist);
    });

    describe('and get the new gist', () => {
      let gistResponse;

      before(async () => {
        gistResponse = await isomorphic(gist.url, {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        });
      });

      it('then the Gist should be accessible', () => {
        expect(gistResponse.status).to.equal(StatusCodes.OK);
        expect(gistResponse.body).to.not.equal(null);
        expect(gistResponse.body).to.have.property('bytesWritten').to.be.a('number');
      });

      describe('when delete a gist', () => {
        let deleteGist;

        before(async () => {
          deleteGist = await isomorphic(gist.url, { method: 'DELETE', headers: auth });
        });

        it('then the gist should be deleted', () => expect(deleteGist.status).to.equal(StatusCodes.NO_CONTENT));
      });

      describe('and try to get the delete gist', () => {
        let gistNotAvailable;

        before(async () => {
          gistNotAvailable = await isomorphic(gist.url, {
            headers: {
              Authorization: `token ${process.env.ACCESS_TOKEN}`
            }
          });
        });

        it('then the Gits should not be accessible', () => {
          expect(gistNotAvailable.status).to.equal(StatusCodes.NOT_FOUND);
        });
      });
    });
  });
});
