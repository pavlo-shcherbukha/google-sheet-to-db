rem ================================================================================================================================
rem Create MySql DB From OPenshift template
rem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   
rem get templates:          oc get templates -n openshift
rem get template's params:  oc process --parameters -n openshift mysql-persistent
rem =================================================================================================================================
rem      Parameters of mysql-persistent template
rem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
rem NAME                    DESCRIPTION                                                             GENERATOR           VALUE
rem MEMORY_LIMIT            Maximum amount of memory the container can use.                                             512Mi
rem NAMESPACE               The OpenShift Namespace where the ImageStream resides.                                      openshift
rem DATABASE_SERVICE_NAME   The name of the OpenShift Service exposed for the database.                                 mysql
rem MYSQL_USER              Username for MySQL user that will be used for accessing the database.   expression          user[A-Z0-9]{3}
rem MYSQL_PASSWORD          Password for the MySQL connection user.                                 expression          [a-zA-Z0-9]{16}
rem MYSQL_ROOT_PASSWORD     Password for the MySQL root user.                                       expression          [a-zA-Z0-9]{16}
rem MYSQL_DATABASE          Name of the MySQL database accessed.                                                        sampledb
rem VOLUME_CAPACITY         Volume space available for data, e.g. 512Mi, 2Gi.                                           1Gi
rem MYSQL_VERSION           Version of MySQL image to be used (8.0-el7, 8.0-el8, or latest).                            8.0-el8
rem ====================================================================================================================================

call ..\login.cmd
oc project %APP_PROJ%

echo =============================================
echo Create MySQL DB
echo =============================================

pause

oc new-app --template=openshift/mysql-persistent --param=MEMORY_LIMIT=512Mi --param=NAMESPACE=openshift --param=DATABASE_SERVICE_NAME=mysqldb --param=MYSQL_USER=devadm --param=MYSQL_PASSWORD=22 --param=MYSQL_ROOT_PASSWORD=22 --param=VOLUME_CAPACITY=1Gi -l app=mysqldb
 
pause


