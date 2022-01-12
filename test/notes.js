const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const noteDB = require('./notes.json');
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
      .post('/note')
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
      .post('/note')
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
      .get('/notes')
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
      .get('/notes')
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
      .get('/note/61ddc4b7c8e23457d7136a90')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
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
      .put('/notes/61ddc447c8e23457d7136a8c')
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
      .put('/notes/61ddc447c8e23457d7136a8c')
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
      .delete('/notess/61ddc447c8e23457d7136a8c')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
