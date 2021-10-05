/* Записываем output ввыхоной файл  */
tee db-build.log

/*удалить БД если существует*/
drop database IF EXISTS test4;

/*Создать БД*/
create database test4;

/*показать список БД*/
show databases;

/* переключиться на нужную БД */
use test4 

/**
***********************************************************************

создать таблицу владельцев дисков

***********************************************************************
*/
CREATE TABLE APP2$EMP
(
    IDREC    INT AUTO_INCREMENT,
    CODEBRN  VARCHAR(2),
    NAMEBRN  VARCHAR(40),
    TABNUM   VARCHAR(40),
    FAM      VARCHAR(40),
    IM       VARCHAR(40),
    OTCH     VARCHAR(40),
    ADRESS   VARCHAR(80),
    MSTATUS  VARCHAR(1),
    COUNTRY  VARCHAR(40),  
    DS       DATE,
    DF       DATE,
    IDT DATETIME,
    IUSRNM  VARCHAR(32),
    MDT DATETIME,
    MUSRNM  VARCHAR(32),
    CONSTRAINT APP2$EMP_PK                PRIMARY KEY( IDREC ),
    CONSTRAINT APP2$BRANCHES_DS_NNL       CHECK(DS IS NOT NULL),
    CONSTRAINT APP2$BRANCHES_IDT_NNL      CHECK(IDT IS NOT NULL),
    CONSTRAINT APP2$BRANCHES_IUSRNM_NNL   CHECK(IUSRNM IS NOT NULL),
    CONSTRAINT PP2$BRANCHES_TABNUM_NNL    CHECK(TABNUM IS NOT NULL),
    CONSTRAINT PP2$BRANCHES_TABNUM_UK     UNIQUE(TABNUM)
);


SHOW TABLES ;




-- ======================================================================
-- =============== СОЗДАЮ ТРИГЕРА НА  APP2$BRANCHES =====================

DROP TRIGGER IF EXISTS APP2$EMP_BI_TRG;

delimiter |

CREATE TRIGGER APP2$EMP_BI_TRG BEFORE INSERT ON APP2$EMP
  FOR EACH ROW
  BEGIN
    SET NEW.IDT = CURRENT_TIMESTAMP();
    SET NEW.IUSRNM = USER();
    SET NEW.NAMEBRN = TRIM(NEW.NAMEBRN) ;   
  END;
|

delimiter ;


DROP TRIGGER IF EXISTS APP2$EMP_BU_TRG;

delimiter |

CREATE TRIGGER APP2$EMP_BU_TRG BEFORE UPDATE ON APP2$EMP
  FOR EACH ROW
  BEGIN
    SET NEW.MDT = CURRENT_TIMESTAMP();
    SET NEW.MUSRNM = USER();
    SET NEW.NAMEBRN = TRIM(NEW.NAMEBRN) ;   
  END;
|

delimiter ;


