
const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
//const nock = require('nock');

const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

let i_islog = true;

//let i_baseurl = 'http://localhost:8080';
let i_baseurl = 'http://nodesrv-pashakx-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com';

let i_idrec = null ;


let l_body_ins = {
    CODEBRN: '03', 
    NAMEBRN: 'Чернигов', 
    TABNUM: '000' ,
    FAM: 'Петренко', 
    IM: 'Петро', 
    OTCH: 'Петролвич', 
    ADRESS: 'На галявині', 
    MSTATUS: 'N',
    COUNTRY: 'UA', 
    DS: '2020-03-19'
};


let l_body_upd = {
    CODEBRN: '03', 
    NAMEBRN: 'Чернигов', 
    //TABNUM: '000' ,
    FAM: 'updatedfam', 
    IM: 'Петро', 
    OTCH: 'Петролвич', 
    ADRESS: 'На галявині', 
    MSTATUS: 'N',
    COUNTRY: 'UA', 
    DS: '2020-03-19'
};


describe('Тестовые кейсы на сервис /api/v1/emp', () => {

  



    it('POST /api/v1/emp - Ожидаем ответ 200. Запись создана в БД', function (done) {
        //this.skip();


        if (i_islog) {
            console.log("Запрос: " + JSON.stringify( l_body_ins ) );
        };

        request( i_baseurl )
            .post('/api/v1/emp')
            .send( l_body_ins )
            .set('Content-Type', 'application/json')
            //.expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err.message);
                    done(err);
                } else {
                    var lrsp = res.body;
                    lrsp.should.have.property('status');
                    lrsp.should.have.property('error');
                    lrsp.should.have.property('response');

                    lrsp.status.should.equal(200);
                    lrsp.response.should.have.property('affectedRows');
                    lrsp.response.should.have.property('insertId');
                    expect(lrsp.response.affectedRows).to.equal(1);  
                    assert.isNumber(lrsp.response.insertId);

                    //i_idrec = lrsp.response.insertId;
                    i_idrec=l_body_ins.TABNUM;

           
                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    });

    it('GET /api/v1/emp/:id - Ожидаем ответ 200. Прочитать запись с tabnum=:id из БД', function (done) {
        //this.skip();
        let l_idrec = i_idrec;
        if (i_islog) {
            console.log("Запрос: :id=" + l_idrec );
        };

        request( i_baseurl )
            .get(`/api/v1/emp/${l_idrec}`)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err.message);
                    done(err);
                } else {
                    var lrsp = res.body;
                    lrsp.should.have.property('status');
                    lrsp.should.have.property('error')
                    lrsp.should.have.property('response')

                    lrsp.status.should.equal(200);
                    expect(lrsp.response).to.be.an('array');
                    expect(lrsp.response.length).to.equal(1);
                    expect(lrsp.response[0].TABNUM).to.equal(l_idrec);

                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    });

    it('POST /api/v1/emp/:id - Ожидаем ответ 200. Обновить запись с TABNUM=:id в БД', function (done) {
        //this.skip();
        let l_idrec = i_idrec;



        if (i_islog) {
            console.log("Запрос: :id=" + l_idrec );
            console.log("Запрос: upd body=" + JSON.stringify(l_body_upd) );
        };

        request( i_baseurl )
            .post(`/api/v1/emp/${l_idrec}`)
            .send(l_body_upd)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err.message);
                    done(err);
                } else {
                    var lrsp = res.body;
                    lrsp.should.have.property('status');
                    lrsp.should.have.property('error');
                    lrsp.should.have.property('response');

                    lrsp.status.should.equal(200);
                    lrsp.response.should.have.property('affectedRows');

                    expect(lrsp.response.affectedRows).to.equal(1);  
                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    }); 


    it('GET /api/v1/emp/:id - Ожидаем ответ 200. Прочитать запись с TABNUM=:id после обновления в БД. Значение  поля FAM  должно совпадать с полем  в обнолвении', function (done) {
        //this.skip();
        let l_idrec = i_idrec;
        if (i_islog) {
            console.log("Запрос: :id=" + l_idrec );
        };

        request( i_baseurl )
            .get(`/api/v1/emp/${l_idrec}`)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err.message);
                    done(err);
                } else {
                    var lrsp = res.body;
                    lrsp.should.have.property('status');
                    lrsp.should.have.property('error')
                    lrsp.should.have.property('response')

                    lrsp.status.should.equal(200);
                    expect(lrsp.response).to.be.an('array');
                    expect(lrsp.response.length).to.equal(1);
                    expect(lrsp.response[0].TABNUM).to.equal(l_idrec);
                    expect(lrsp.response[0].FAM).to.equal(l_body_upd.FAM);

                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    });    

    it('DELETE /api/v1/emp/:id - Ожидаем ответ 200. Удалить запись с TABNUM=:id из БД', function (done) {
        this.skip();
        let l_idrec = i_idrec;
        if (i_islog) {
            console.log("Запрос: :id=" + l_idrec );
        };

        request( i_baseurl )
            .delete(`/api/v1/emp/${l_idrec}`)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err.message);
                    done(err);
                } else {
                    var lrsp = res.body;
                    lrsp.should.have.property('status');
                    lrsp.should.have.property('error')
                    lrsp.should.have.property('response')

                    lrsp.status.should.equal(200);
                    lrsp.response.should.have.property('affectedRows');
                    expect(lrsp.response.affectedRows).to.equal(1);  

                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    });    

}); // describe




