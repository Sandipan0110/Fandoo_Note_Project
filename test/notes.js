const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const noteDB = require('./notes.json');
const { expect } = require('chai');
const { string } = require('joi');
chai.should();

describe('create notes api', () => {
  it('notes', (done) => {
    const token = noteDB.notes.validToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post('/createnotes')
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenCreateNotes_whenInvalidToken_shouldNotbeCreated', (done) => {
    const token = noteDB.notes.invalidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post('/createnotes')
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get note test cases
describe('get notes api', () => {
  it('notes', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenCreateNotes_whenInvalidToken_shouldNotbeGet', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .get('/getnotes')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// update note test cases
describe('Update notes api', () => {
  it('givenPoperDetails_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/6165357e39139e12b1b2986f')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenInvalidToken_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/6163a92b4ec773015a13abb0')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// delete note test cases
describe('delete notes api', () => {
  it('givenInvalidToken_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .delete('/deletenotes/6165357e39139e12b1b2986f')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get data by id API Test Cases
describe('Get notes by ID api', () => {
  it('givenPoperDetails_ShouldGetNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes/6165357e39139e12b1b2986f')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

//Add Label in Notes API Test Cases
describe('Add lebel by ID api', () => {
  // it('Success Should Return False', (done) => {
  //   const token = noteDB.notes.getNoteWithinValidToken;
  //   chai
  //     .request(server)
  //     .post('/addlabel/:id')
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       return done();
  //     });
  // })
  it('Success should return True when token valid', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .post('/addlabel/:id')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        done();
      });
  })
  it('Success should return false when token invalid', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .post('/addlabel/:id')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })
  it('Success should return true when Model is Responding', (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .post('/addlabel/61ba38b1d48f7fe935bbbfb6')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  })
  it('Success should return false when Model is notResponding', (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .post('/addlabel/61ba38b1d48f7fe935bbbfb')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  })
});

//Delete label from note ID API Test Cases
describe('Delete label from note ID api', () => {
  it('givenPoperDetails_ShouldGetAPI', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    const note = noteDB.deletelabel;
    chai
      .request(server)
      .delete('/deleteLabelFromNote/:id')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('success').eql(true);
        done();
      });
  });
  it('givenInvalidDetails_ShouldNotDeleteAPI', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    const note = noteDB.notelabel;
    chai
      .request(server)
      .delete('/deleteLabelFromNote/:id')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('success').eql(false);
        done();
      });
  })
});
