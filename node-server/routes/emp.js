var express = require('express');
var router = express.Router();

router.options('/:id', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-powered-by, date");
  res.header('Access-Control-Allow-Methods', 'DELETE,GET,PATCH,POST,PUT'); 
});

router.options('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-powered-by, date");
  res.header('Access-Control-Allow-Methods', 'DELETE,GET,PATCH,POST,PUT'); 
});

/**
 * Get one recored by idrec (PK)
 */
router.get('/:id', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-powered-by, date");
    res.header('Access-Control-Allow-Methods', 'DELETE,GET,PATCH,POST,PUT'); 
    res.locals.connection.query(`SELECT * from APP2$EMP where TABNUM=${req.params.id}`, function (error, results, fields) {

      if (error) {
        res.contentType('application/json');
        res.status(422).send(JSON.stringify({"status": 422, "error": { message: error.message , errordetails: { sqlState: error.sqlState,  sqlMessage: error.sqlMessage} }, "response": null}));

      } else {
        res.contentType('application/json');
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      }
    });  

});



/**
 * Insert record
 */
router.post('/', function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*"); 
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-powered-by, date");
          res.header('Access-Control-Allow-Methods', 'DELETE,GET,PATCH,POST,PUT'); 
      
          const {CODEBRN, NAMEBRN, TABNUM ,FAM, IM, OTCH, ADRESS, MSTATUS,COUNTRY, DS}  = req.body ;
      
          var lqry = `insert into APP2$EMP( CODEBRN, NAMEBRN, TABNUM ,FAM, IM, OTCH, ADRESS, MSTATUS,COUNTRY, DS ) VALUES ('${CODEBRN}','${NAMEBRN}', '${TABNUM }', '${FAM}' , '${IM}' , '${OTCH}' , '${ADRESS}' , '${MSTATUS}' , '${COUNTRY}'  , '${DS}' )`; 
          res.locals.connection.query(  lqry, function (error, results, fields) {
            if (error) {
              res.contentType('application/json');
              res.status(422).send(JSON.stringify({"status": 422, "error": { message: error.message , errordetails: { sqlState: error.sqlState,  sqlMessage: error.sqlMessage} }, "response": null}));

            } else {
              res.contentType('application/json');
              res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
          });  

    
      
});

/**
 * update record
 */
router.post('/:id', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-powered-by, date");
      res.header('Access-Control-Allow-Methods', 'DELETE,GET,PATCH,POST,PUT'); 
      const {CODEBRN, NAMEBRN ,FAM, IM, OTCH, ADRESS, MSTATUS,COUNTRY, DS}  = req.body ;
   
      var lqry = `update APP2$EMP set CODEBRN = '${CODEBRN}', NAMEBRN = '${NAMEBRN}',FAM = '${FAM}', IM = '${IM}', OTCH = '${OTCH}', ADRESS = '${ADRESS}', MSTATUS = '${MSTATUS}', COUNTRY = '${COUNTRY}', DS = '${DS}' where TABNUM=${req.params.id}`; 
      res.locals.connection.query(  lqry, function (error, results, fields) {
        if (error) {
          res.contentType('application/json');
          res.status(422).send(JSON.stringify({"status": 422, "error": { message: error.message , errordetails: { sqlState: error.sqlState,  sqlMessage: error.sqlMessage} }, "response": null}));

        } else {
          res.contentType('application/json');
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }
      });  
    
      
});

/**
 * delete record
 */
 router.delete('/:id', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-powered-by, date");
  res.header('Access-Control-Allow-Methods', 'DELETE,GET,PATCH,POST,PUT'); 
  
  var lqry = `delete from  APP2$EMP  where TABNUM=${req.params.id}`; 
  res.locals.connection.query(  lqry, function (error, results, fields) {
    if (error) {
      res.contentType('application/json');
      res.status(422).send(JSON.stringify({"status": 422, "error": { message: error.message , errordetails: { sqlState: error.sqlState,  sqlMessage: error.sqlMessage} }, "response": null}));

    } else {
      res.contentType('application/json');
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    }
  });  

  
});

module.exports = router;
