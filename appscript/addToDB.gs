/**
 *     Write Google App Script application to connect spreadsheet with db via API created in step 2
 *     You should be able to add/update all data from table to DB
 *
 */


/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Add/Update all data from sheet to DB', functionName: 'saveToDB_UI'},


  ];
  spreadsheet.addMenu('CustomServiceFunctions', menuItems);
}



/**
 * Save sheet into Database UI
 */
function saveToDB_UI(){
  var selBtn=Browser.msgBox('Confirmation!',
        'Add/Update all data from sheet to DB will be performed.',
        Browser.Buttons.OK_CANCEL);

  if (selBtn==='cancel'){

    return;

  } else {

      var l_res=mergetoDB();
      if (l_res.ok===true){
            Browser.msgBox('Information',
                  'The process  succeed!. Details: [Inserted=' + l_res.inserted + ' Updated=' + l_res.updated + ' Deleted: '+ l_res.deleted + ']',
                  Browser.Buttons.OK);
      } else {

          Browser.msgBox('Error',
                'The process  finished with failed! ' + l_res.errtext ,
                Browser.Buttons.OK);

      }
    

  }

  return

}


/**
 * Merge data from  sheet to DB
*/
function mergetoDB(){
  //var action =e.parameter.action;
  //Logger.log( e.parameter );
  Logger.log('addToDB: Start');
  var l_result = true;
  var l_url= 'http://nodesrv-pashakx-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com';
  var l_pth_insert = '/api/v1/emp';
  var l_pth_update = '/api/v1/emp';
  var l_pth_delete = '/api/v1/emp';
  var l_pth_getall = '/api/v1/emps';
  var l_cnt_upd = 0;
  var l_cnt_ins = 0;
  var l_cnt_del = 0;

  try{
        Logger.log('Open Spreadsheet');
        var ss = SpreadsheetApp.openById("1Qc-Kr0IS5fz5cA33OR12I8l7VY9oXUBEOYvQyCxneL4");
        SpreadsheetApp.setActiveSpreadsheet(ss);
        Logger.log('Select sheet');
        var sheet = ss.getSheetByName("Emp");
        SpreadsheetApp.setActiveSheet(sheet);
        Logger.log('Get rows by range');
        var rows = SpreadsheetApp.getActiveSheet().getDataRange().getValues();

      
        Logger.log('Get data  from DB: start ') ;
                  var options = {
                  'method' : 'get',
                  'contentType': 'application/json'
                };
        Logger.log('Get old data from DB: '  + ' call get-api-call ' + l_url + l_pth_getall);
        var response = UrlFetchApp.fetch(l_url + l_pth_getall, options);
        Logger.log('Get old data from DB: rownum=' + i + ' StatusCode=' + response.getResponseCode());
        Logger.log('Get old data from DB: rownum=' + i + ' Response=' + response.getContentText());
        var l_dbdata = JSON.parse(response.getContentText()).response;
        Logger.log( JSON.stringify(l_dbdata) );
        Logger.log('Get data  from DB: finish ') ;

        Logger.log('Delete records from DB which is not present in sheet: start') ;
        for (var i = 0; i < l_dbdata.length; i++) {
            Logger.log(  'TABNUM' + l_dbdata[i].TABNUM);
            var fres= findTabnum(rows, l_dbdata[i].TABNUM);
            Logger.log('fres=' + fres);
            if (fres===false) {
                  Logger.log('delete data  from DB. TABNUM=' + l_dbdata[i].TABNUM) ;
                  var options = {
                  'method' : 'delete',
                  'contentType': 'application/json'
                };

                var l_delete_url = l_url + l_pth_delete +'/'+ l_dbdata[i].TABNUM;
                Logger.log('delete data  from DB. delete_url=' + l_delete_url);
                var response = UrlFetchApp.fetch( l_delete_url , options);
                Logger.log('delete data  from DB. TABNUM=' + l_dbdata[i].TABNUM + ' StatusCode=' + response.getResponseCode());
                Logger.log('delete data  from DB. TABNUM=' + l_dbdata[i].TABNUM + ' Response=' + response.getContentText());
                l_cnt_del ++;

            }
            
        }
        Logger.log('Delete records from DB which is not present in sheet: stop') ;
       
        Logger.log('Rows iterating: start');

        Logger.log('Rows iterating: Check if sheet has 0 rows for create-update');
        if (rows.length===0){
                  Logger.log('Rows saving: finish  with 0');
                  Logger.log('Prepare result with 0');
                  var lres= {  ok: l_result};
                  return lres ;

        }

        var i =0 ;
        var lastrowidx = rows.length - 1 ;

        rows.forEach(function (row) {
            i ++ ;
            if (i==1) {
                Logger.log('Rows iterating: skip header');

            } else {
                Logger.log('Rows iterating: rownum=' + i);

                var l_tabnum=row[2];
                var operation=defineCU(l_dbdata, l_tabnum);

                if ( operation === 'INSERT') {
                    Logger.log('Row inserting: rownum=' + i);
                    var ires=createRow(row, l_url , l_pth_insert );
                    Logger.log('Row inserting: rownum=' + i + ' '+JSON.stringify(ires) );
                    if (!ires.ok){
                      throw new Error( ires.errtet );
                    }
                    l_cnt_ins ++;


                } else if(operation === 'UPDATE'){
                    Logger.log('Row updating: rownum=' + i);
                    var ures=updateRow(row, l_url , l_pth_update )
                    Logger.log('Row updating: rownum=' + i + ' ' + ' '+JSON.stringify(ures) );
                    if (! ures.ok){
                      throw new Error( ures.errtet );
                    }
                    l_cnt_upd ++;



                } else {
                    throw new Error( 'Unsupported CRUD operation! ['+operation+']' );
                }

                //if (i===lastrowidx){
                //}

            } 
        });  //forEach
        Logger.log('Rows saving: finish');
        Logger.log('Prepare result');
        var lres= {  ok: l_result, updated: l_cnt_upd, inserted: l_cnt_ins, deleted: l_cnt_del };
        return lres ;
      

  } catch (err) {

    l_result=false ;
    lres= {  ok: l_result, errtext: err.message, errstack: err.stack};
    return lres ;
  }  
}


/**
 * Find tabnum from  in sheet records (2d-array)
 */
function findTabnum(array2d, itemtofind) {
    index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(itemtofind);
                
    // return "false" if the item is not found
    if (index === -1) { return false; }
    
    // Use any row to get the rows' array length
    // Note, this assumes the rows are arrays of the same length
    numColumns = array2d[0].length;
    
    // row = the index in the 1d array divided by the row length (number of columns)
    row = parseInt(index / numColumns);
    
    // col = index modulus the number of columns
    col = index % numColumns;
    
    return [row, col]; 
    
}

/**
 * Define DML operation create record or update record by tabnum
 */
function defineCU( dbarray, tabnum ){
  //l_dbdata
  let isExist = false;

  for (item in dbarray) {
      if (dbarray[item].TABNUM === tabnum) {
          isExist = true;
          break;
    ``}
  }

  if (isExist) {
     return 'UPDATE';
  } else {
     return 'INSERT';
  }

}

/**
 * Create record in DB  from sheet row
 */
function createRow(row, a_url , a_pth_insert ){

  var l_result=true;
  Logger.log('Create record: start');
  try {

    
      Logger.log('Create record: '+ ' Format ds');
      l_ds=Utilities.formatDate(new Date(row[9]), "GMT+3", "yyyy-MM-dd");
      
      Logger.log('Create record: ' + ' Format df');
      l_df=null;
      if (row[10]!==''){
          l_df=Utilities.formatDate(new Date(row[10]), "GMT+3", "yyyy-MM-dd")
      }
      
      Logger.log('Create record: '  + 'prepare body');
      var l_body = {
          CODEBRN: row[0],
          NAMEBRN: row[1],
          TABNUM:  row[2],
          FAM:     row[3],
          IM:      row[4],
          OTCH:    row[5],
          ADRESS:  row[6],
          MSTATUS: row[7], 
          COUNTRY: row[8],
          DS:      l_ds, 
          DF:      l_df
      };
      Logger.log(  'BODY:' + JSON.stringify( l_body) );
      Logger.log('Create record: ' + ' prepare insert-api-call');
      var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(l_body)
      };
      Logger.log('Create record: ' + ' call insert-api-call ' + a_url + a_pth_insert);
      var response = UrlFetchApp.fetch(a_url + a_pth_insert, options);
      
      Logger.log('Create record: ' + 'process response insert-api-call ' + a_url + a_pth_insert);

      Logger.log('Create record: '  + ' StatusCode=' + response.getResponseCode());
      Logger.log('Create record: '  + ' Response=' + response.getContentText());

      lres= {  ok: l_result, errtext: null, errstack: null };
      return lres ;

    
  } catch (err){
    l_result=false ;
    lres= {  ok: l_result, errtext: err.message, errstack: err.stack};
    return lres ;

  }              

}

/**
 * Update record in DB  from sheet row
 */
function updateRow(row, a_url , a_pth_update ){

  var l_result=true;
  Logger.log('Update record: start');
  try {

    
      Logger.log('Update record: '+ ' Format ds');
      l_ds=Utilities.formatDate(new Date(row[9]), "GMT+3", "yyyy-MM-dd");
      
      Logger.log('Update record: ' + ' Format df');
      l_df=null;
      if (row[10]!==''){
          l_df=Utilities.formatDate(new Date(row[10]), "GMT+3", "yyyy-MM-dd")
      }
      
      Logger.log('Update record: '  + 'prepare body');
      var l_body = {
          CODEBRN: row[0],
          NAMEBRN: row[1],
          //TABNUM:  row[2],
          FAM:     row[3],
          IM:      row[4],
          OTCH:    row[5],
          ADRESS:  row[6],
          MSTATUS: row[7], 
          COUNTRY: row[8],
          DS:      l_ds, 
          DF:      l_df
      };
      Logger.log(  'BODY:' + JSON.stringify( l_body) );
      Logger.log('Update record: ' + ' prepare update-api-call');
      var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(l_body)
      };
      var l_url_update=a_url + a_pth_update + '/'+ row[2];
      Logger.log('Update record: ' + ' call update-api-call ' + l_url_update);
      var response = UrlFetchApp.fetch(l_url_update, options);
      
      Logger.log('Update record: ' + 'process response update-api-call ' + l_url_update);

      Logger.log('Update record: '  + ' StatusCode=' + response.getResponseCode());
      Logger.log('Update record: '  + ' Response=' + response.getContentText());

      lres= {  ok: l_result, errtext: null, errstack: null };
      return lres ;

    
  } catch (err){
    l_result=false ;
    lres= {  ok: l_result, errtext: err.message, errstack: err.stack};
    return lres ;

  }              

}





