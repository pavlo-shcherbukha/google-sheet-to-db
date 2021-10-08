/**
 * Load test
 * This load test fo  creat emp
 * http-get  /api/v1/emps  
 */

 const loadtest = require('loadtest');
 
 /**
  * Анализ результатов теста. вызывается после каждого запроса
  * 
  * @param {*} error 
  * @param {*} result 
  * @param {*} latency 
  */
 function statusCallback(error, result, latency) {
    console.log('====================================================================='); 
    console.log('Current latency %j, result %j, error %j', latency, result, error);
     console.log('=====================================================================');
     console.log('Current latency=' + JSON.stringify(latency)  );
     console.log('Current result=' + JSON.stringify(result)  );
     console.log('Current error=' + JSON.stringify(error)  );
     console.log('---------------------------------------------------------------------');
     console.log('Request elapsed milliseconds: ', result.requestElapsed);
     console.log('Request index: ', result.requestIndex);
     console.log('Request loadtest() instance index: ', result.instanceIndex);
 }


/**
 * Функция кастомтизации анализа ответ. Если ответ 200 но мы считаем, что он ошибочный
 * Используется для вывода ответа. вызывается после каждого запроса
 * @param {*} result 
 */ 
function contentInspector(result) {
    if (result.statusCode == 200) {
        const body = JSON.parse(result.body)
        // how to examine the body depends on the content that the service returns
        //if (body.status.err_code !== 0) {
        //    result.customError = body.status.err_code + " " + body.status.msg
        //    result.customErrorCode = body.status.err_code
        //}
    }
}

/**
 * Непосредственно конфигурация теста
 */

 const options = {
     url: 'http://nodesrv-pashakx-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/emps',
     maxRequests: 100,
     statusCallback: statusCallback,
     headers: {"Content-Type": "application/json"},
     method: 'GET',
     contentType: "application/json",
     requestsPerSecond: 5,
     concurrency: 2,
     maxSeconds: 60
 };



 /**
  * Непосредственно запуск теста на выполнение  
  * 
  */ 
 loadtest.loadTest(options, function(error, results) {
     if (error) {
         return console.error('Got an error: %s', error);
     }
     console.log(results);
     console.log('Tests run successfully');
 });