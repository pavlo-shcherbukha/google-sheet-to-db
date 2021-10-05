var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.locals.connection.query('SELECT * FROM APP2$EMP', function (error, results, fields) {
      if (error) {
        res.contentType('application/json');
        res.status(422).send(JSON.stringify({"status": 422, "error": { message: error.message , errordetails: { sqlState: error.sqlState,  sqlMessage: error.sqlMessage} }, "response": null}));
      } else {
        res.contentType('application/json');
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      }

    });  

});

/* delete all data. */
router.delete('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.locals.connection.query('DELETE FROM APP2$EMP', function (error, results, fields) {
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
