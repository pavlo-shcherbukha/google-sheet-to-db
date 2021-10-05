const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');
//const nock = require('nock');

const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

let i_islog = true;
//let i_baseurl = 'http://localhost:8181';
let i_baseurl = 'http://nodesrv-pashakx-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com';

let i_rowcont=0;







describe('Тестовые кейсы на сервис /api/v1/emps', () => {

    it('GET /api/v1/emp/ - Ожидаем ответ 200. Прочитать все записи из таблицы', function (done) {
        //this.skip();
     
        if (i_islog) {
            //console.log("Запрос: :id=" + l_idrec );
        };

        request( i_baseurl )
            .get(`/api/v1/emps`)
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
                    expect(lrsp.response).to.be.an('array').that.is.not.empty;
                    i_rowcont = lrsp.response.length;


                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    });




  

    it('DELTE /api/v1/emps - Ожидаем ответ 200. Удалить все записи из таблицы', function (done) {
        //this.skip();
        if (i_islog) {
            //console.log("Запрос: :id=" + l_idrec );
        };

        request( i_baseurl )
            .delete('/api/v1/emps')
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
                    expect(lrsp.response.affectedRows).to.equal( i_rowcont );  

                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    });   
    
    
    it('GET /api/v1/emp/ - Ожидаем ответ 200. Прочитать все записи из таблицы после удаления. Ождаем  0 записей === пустой массив', function (done) {
        //this.skip();
     
        if (i_islog) {
            //console.log("Запрос: :id=" + l_idrec );
        };

        request( i_baseurl )
            .get(`/api/v1/emps`)
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
                    expect(lrsp.response).to.be.an('array').that.is.empty;
                    i_rowcont = lrsp.response.length;


                    if (i_islog) {
                        console.log("Ответ:")
                        console.log(JSON.stringify(res.body));
                    }
                    done();
                }
            });
    });


}); // describe




