tee data-ins1.log
use test4

/**
Удаляем предыдущие данные
*/
delete from APP2$EMP;

insert into APP2$EMP( CODEBRN,
                      NAMEBRN,
                      TABNUM ,
                      FAM,    
                      IM,     
                      OTCH,   
                      ADRESS, 
                      MSTATUS,
                      COUNTRY,
                      DS,     
                      DF)     
VALUES (
                      '00',
                      'ГОЛОВНИЙ',
                      '00001',  
                      'ВАСЕЧКИН',
                      'ПЕТРО', 
                      'ПЕТРОВИЧ',
                      'На розі біля цирку',  
                      'M', 
                      'UA',
                      '2005-03-09',
                      null

);

insert into APP2$EMP( CODEBRN,
                      NAMEBRN,
                      TABNUM ,
                      FAM,    
                      IM,     
                      OTCH,   
                      ADRESS, 
                      MSTATUS,
                      COUNTRY,
                      DS,     
                      DF)     
VALUES (
                      '00',
                      'ГОЛОВНИЙ',
                      '00002',  
                      'ПЕТРЕНКО',
                      'СЕМЕН', 
                      'СЕМЕНОВИЧ',
                      'БІЛЯ ПАРКУ',  
                      'M', 
                      'UA',
                      '2007-02-03',
                      null

);


insert into APP2$EMP( CODEBRN,
                      NAMEBRN,
                      TABNUM ,
                      FAM,    
                      IM,     
                      OTCH,   
                      ADRESS, 
                      MSTATUS,
                      COUNTRY,
                      DS,     
                      DF)     
VALUES (
                      '01',
                      'ЦЕНТРАЛЬНИЙ',
                      '00003',  
                      'САЄНКО',
                      'МАРГАРИТА', 
                      'СЕРГІІВНА',
                      'БІЛЯ ТЕАТРУ',  
                      'M', 
                      'UA',
                      '2007-02-03',
                      null

);


insert into APP2$EMP( CODEBRN,
                      NAMEBRN,
                      TABNUM ,
                      FAM,    
                      IM,     
                      OTCH,   
                      ADRESS, 
                      MSTATUS,
                      COUNTRY,
                      DS,     
                      DF)     
VALUES (
                      '01',
                      'ЦЕНТРАЛЬНИЙ',
                      '00004',  
                      'ДУДКА',
                      'АНАСТАСІЯ', 
                      'ВІКТОРІВНА',
                      'БІЛЯ ТЕАТРУ',  
                      'S', 
                      'UA',
                      '2019-07-23',
                      null

);





select A.* from  APP2$EMP A;

