/**
 * Load test
 * This load test fo  creat emp
 * http-post  /api/v1/emp 
 */

 const loadtest = require('loadtest');
 var NTABNUM = 2000;
 
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
/*
 const options = {
     url: 'http://nodesrv-pashakx-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/emp',
     maxRequests: 10,
     statusCallback: statusCallback,
     headers: {"Content-Type": "application/json"},
     method: 'POST',
     body: JSON.stringify( {
                                CODEBRN: '03', 
                                NAMEBRN: 'Чернигов', 
                                TABNUM: new Date().getTime().toString().substr(-6,5) ,
                                FAM: 'Петренко' , 
                                IM: 'Петро' , 
                                OTCH: 'Петролвич' , 
                                ADRESS: 'На галявині', 
                                MSTATUS: 'N',
                                COUNTRY: 'UA', 
                                DS: '2020-03-19'} ),
     contentType: "application/json",
     requestsPerSecond: 2,
     concurrency: 0,
     maxSeconds: 30
 };
*/

 const options = {
    url: 'http://nodesrv-pashakx-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com',
    maxRequests: 100,
    statusCallback: statusCallback,
    headers: {"Content-Type": "application/json"},
    method: 'POST',
    body: "",
    contentType: "application/json",
    requestsPerSecond: 8,
    concurrency: 4,
    maxSeconds: 40,
    requestGenerator: (params, options, client, callback) => {
        NTABNUM ++ ;
		var messageo = {
            CODEBRN: '03', 
            NAMEBRN: 'Чернигов', 
            TABNUM: NTABNUM.toString() ,
            FAM: 'Петренко' + NTABNUM.toString(), 
            IM: 'Петро' + NTABNUM.toString(), 
            OTCH: 'Петролвич' + NTABNUM.toString(), 
            ADRESS: 'На галявині', 
            MSTATUS: 'N',
            COUNTRY: 'UA', 
            DS: '2020-03-19'
        };
        const message = JSON.stringify(messageo);
		//options.headers['Content-Length'] = message.length;
		//options.headers['Content-Type'] = 'application/json';
		//options.body = message;
		options.path = '/api/v1/emp';
		const request = client(options, callback);
		request.write(message);
		return request;
	}
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