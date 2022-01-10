const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
chai.use(chaiHttp);
const labelDB = require('./label.json');
chai.should();

describe('Add label by id api ', () => {
    it('AddLabelById_by_checking_server', (done) => {
        chai
            .request(server)
            .post('/note/:id/label/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Given Token shoule give true when token is valid', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .post('/note/:id/label/61d9772609f4d8c1a84947e8')
            .set({ authorization: token })
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Given Token Should give false when token is invalidtoken', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .post('/note:/id/label/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('Given Token Should give true when payload is validate', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .post('/note/:id/label/61d9772609f4d8c1a84947e8')
            .set({ authorization: token })
            .end((err, res) => {
                if (err) {
                    res.should.have.status(400);
                }
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when service layer is giving response', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .post('/note/:id/label/61d9772609f4d8c1a84947e8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when model layer is giving response', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelName : faker.lorem.word()
        }
        chai
            .request(server)
            .post('/note/:id/label/61d9772609f4d8c1a84947e8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when note is belong to same user', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .post('/note/:id/label/61d9772609f4d8c1a84947e8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when fetched user is belong to labelInfo', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/note/:id/label/61d9772609f4d8c1a84947e8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('Should give true when new label is created', (done) => {
        const token = labelDB.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/note/:id/label/61d9772609f4d8c1a84947e8')
            .set({ authorization: token })
            .send({ labelName: "karan" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

describe('get label  api ', () => {
    it('getlabel_by_checking_server', (done) => {
        chai
            .request(server)
            .get('/labels')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should give true when token is decoded', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/labels')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give false when token is invalid', (done) => {
        const token = labelDB.label.invalidToken;
        chai
            .request(server)
            .get('/labels')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give false when userid is not validate', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/labels')
            .set({ authorization: token })
            .send({ id: "61d43b913ac1fd77ec768909" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
    it('Should return true from GetLabel Service Layer ,return appropriate response" ', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/labels')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
    it('Should return true from GetLabel API model Layer ,return appropriate response" ', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/labels')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
    it('Should return true when Label is added and manage user condition', (done) => {
        const token = labelDB.label.validToken;
        chai
            .request(server)
            .get('/labels')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
})

describe('get label_by id api ', () => {
    it('getlabel_by_id_checking_server', (done) => {
        chai
            .request(server)
            .get('/label/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should give true when ,add controller layer and checking the response of token in getlabel_by_id_', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/label/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give false when ,add controller layer and checking response by of invalid token in getlabel_by_id_', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .get('/label/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give true when ,Credential is Validated in getlabel_by_id_', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/label/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('it should give true when , Added Servce layer in getlabel_by_id_', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/label/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('it should give true when , Added Model layer in getlabel_by_id_', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/label/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('it should give true when , check response with valid Param and findng the label with label id ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .get('/label/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
})

describe('update label_by id api ', () => {
    it('it should give true when,token is valid ', (done) => {
        const token = labelDB.label.validToken
        const label={
            title:faker.lorem.title(),
            description:faker.lorem.paragraph()
        }
        chai
            .request(server)
            .put('/labels/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .send(label)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when,token is not decoded ', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .put('/labels/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give true when true params is validate', (done) => {
        const token = labelDB.label.validToken
        const label={
            labelName:faker.name.firstName(),
        }
        chai
            .request(server)
            .put('/labels/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .send(label)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give false when Something is Wrong with credential ,Validation Failed ', (done) => {
        const token = labelDB.label.validToken

        chai
            .request(server)
            .put('/labels/61d47c6bb686236b3f6a')
            .set({ authorization: token })
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give true when labelName is Valdated with Credential ', (done) => {
        const token = labelDB.label.validToken
        const label={
            labelName:faker.name.firstName(),
        }
        chai
            .request(server)
            .put('/labels/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .send(label)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when Service Layer is Added ', (done) => {
        const token = labelDB.label.validToken
        const label={
            labelName:faker.name.firstName(),
        }
        chai
            .request(server)
            .put('/labels/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .send(label)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when Model Layer is Added ', (done) => {
        const token = labelDB.label.validToken
        const label={
            labelName:faker.name.firstName(),
        }
        chai
            .request(server)
            .put('/labels/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .send(label)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should give true when label is Updated is Succesfully ', (done) => {
        const token = labelDB.label.validToken
        const label={
            labelName:faker.name.firstName(),
        }
        chai
            .request(server)
            .put('/labels/61d47c6bb686236b3f6a6026')
            .set({ authorization: token })
            .send(label)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe('Delete label_by id api ', () => {
    it('checking response from controller Layer', (done) => {
        chai
            .request(server)
            .delete('/labelss/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should give true when,token is valid ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .delete('/labelss/:id')
            .set({authorization:token})
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    it('it should give false when,token is invalid ', (done) => {
        const token = labelDB.label.invalidToken
        chai
            .request(server)
            .delete('/labelss/:id')
            .set({authorization:token})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should give true when,true param is validated ', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .delete('/labelss/61d144c1354b91b200a7dd96')
            .set({authorization:token})
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    it('Should return true from DeleteLabelApi Service Layer ,return appropriate response', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .delete('/labelss/61d144c1354b91b200a7dd96')
            .set({authorization:token})
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    it('Should return true from DeleteLabelApi model Layer ,return appropriate response', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .delete('/labelss/61d144c1354b91b200a7dd96')
            .set({authorization:token})
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    it('Should return true when label is deleted ,return appropriate response', (done) => {
        const token = labelDB.label.validToken
        chai
            .request(server)
            .delete('/labelss/61d144c1354b91b200a7dd96')
            .set({authorization:token})
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
})