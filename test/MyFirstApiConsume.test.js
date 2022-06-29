//Importing axios libary
const axios = require('axios');
//Importing expect from chai library
const { expect } = require('chai');
// Importing http library
const { StatusCodes } = require('http-status-codes');

// Creating a test-suite
describe('First Api Tests', () => {

  before(() => console.log("method that runs once before all tests"));
  after(() => console.log("method that runs once after all tests"));
    
  describe('Grouping GET calls', () => {
    
    it('Should consume a GET Service', async () => {
        //Get call using axios  
        const response = await axios.get('https://httpbin.org/ip');
      
        //Using chai for assertions
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');
      });

      it('Should consume a GET Service with query parameters', async () => {  
        //Append data
        const query = {
          name: 'John',
          age: '31',
          city: 'New York'
        };
        //Get call using axios plus parameters
        const response = await axios.get('https://httpbin.org/get', { query });
      
        //Using chai for assertions
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.query).to.eql(query);
      });
    });

    describe('Grouping HEAD calls', () => {
    
      it('Should consume a HEAD Service returning status 200', async () => {  
      
        //HEAD call using axios plus parameters
        const response = await axios.head('https://httpbin.org/basic-auth/juan/gomez', { auth: {
          username: 'juan',
          password: 'gomez'}});

        //Using chai for assertions
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.statusText).to.equal('OK');
        expect(response.headers).to.have.property('content-type').to.equal('application/json');
        expect(response.headers).to.have.property('content-length').to.equal('47');
        expect(response.headers).to.have.property('access-control-allow-credentials').to.equal('true');
        
      });

      it('Should consume a HEAD Service returning status 401', async () => {  
      
        //HEAD call using axios plus parameters
        await axios.head('https://httpbin.org/basic-auth/alex/gomez',{ auth: {
          username: 'Alex',
          password: 'gomez'}})
        .catch((errors) => {
          expect(errors.response.status).to.equal(StatusCodes.UNAUTHORIZED);
          expect(errors.response.statusText).to.equal('UNAUTHORIZED');

          expect(errors.response.headers).to.have.property('content-length').to.equal('0');
          expect(errors.response.headers).to.have.property('access-control-allow-credentials').to.equal('true');
        });
      });
    });

    describe('Grouping POST calls', () => {
    
       it('Should consume a POST Service with a message body', async () => {  
       
        //POST call using axios plus parameters
        const response = await axios.post('https://httpbin.org/post', 
          { 
            firstName: 'Juan',
            lastName: 'Gomez',
            age: '37',
            city: 'Bogota',
            phone: '55-888-222',
           }, {params: { id: "1" }});
        
        //Using chai for assertions
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.statusText).to.equal('OK');
        expect(Object.keys(response.data.json).length).to.equal(5);
        expect(response.data.json).to.be.an('object').that.has.all.keys('firstName', 'lastName', 'age', 'city', 'phone');
        expect(response.data.json).to.have.property('firstName').to.equal('Juan');
        expect(response.data.json).to.have.property('lastName').to.equal('Gomez');
        expect(response.data.json).to.have.property('age').to.equal('37');
        expect(response.data.json).to.have.property('city').to.equal('Bogota');
        expect(response.data.json).to.have.property('phone').to.equal('55-888-222');
      });
    });

    describe('Grouping PUT calls', () => {
    
      it('Should consume a PUT Service', async () => {  
      
        //POST call using axios plus parameters
        const response = await axios.put('https://httpbin.org/put', 
         { 
           firstName: 'Abelardo',
           lastName: 'Sin Miedo',
           age: '15',
           city: 'Anserma',
           phone: '11-888-111',
          }, {params: { id: "2" }});

        //Using chai for assertions
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.statusText).to.equal('OK');
        expect(Object.keys(response.data.json).length).to.equal(5);
        expect(response.data.json).to.be.an('object').that.has.all.keys('firstName', 'lastName', 'age', 'city', 'phone');
        expect(response.data.json).to.have.property('firstName').to.equal('Abelardo');
        expect(response.data.json).to.have.property('lastName').to.equal('Sin Miedo');
        expect(response.data.json).to.have.property('age').to.equal('15');
        expect(response.data.json).to.have.property('city').to.equal('Anserma');
        expect(response.data.json).to.have.property('phone').to.equal('11-888-111');
     });
   });

  describe('Grouping PATCH calls', () => {
    
    it('Should consume a PATCH Service', async () => {  
    
      //POST call using axios plus parameters
      const response = await axios.patch('https://httpbin.org/patch', 
        { 
          lastName: 'de la Spriella',
          age: '47'});

        //Using chai for assertions
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.statusText).to.equal('OK');
        expect(Object.keys(response.data.json).length).to.equal(2);
        expect(response.data.json).to.be.an('object').that.has.all.keys('lastName', 'age');
        expect(response.data.json).to.have.property('lastName').to.equal('de la Spriella');
        expect(response.data.json).to.have.property('age').to.equal('47');
      });
  });

  describe('Grouping DELETE calls', () => {
    
    it('Should consume a DELETE Service', async () => {  
    
      //POST call using axios plus parameters
      const response = await axios.delete('https://httpbin.org/delete',null, {params: { id: "2" }});

      //Using chai for assertions
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.statusText).to.equal('OK');
      expect(response.data).to.have.property('url').to.equal('https://httpbin.org/delete');
      });
  });

});
