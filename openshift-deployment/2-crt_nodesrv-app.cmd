echo ****************************************
echo *    create Node.js application
echo * 
echo ****************************************

call login.cmd

oc project %APP_PROJ%
pause

echo *****************************************************************************
echo *    create  application
echo * 
echo ****************************************

oc new-app https://github.com/pavlo-shcherbukha/google-sheet-to-db.git#master --context-dir=/testapp1  --name="nodesrv" -e IDB_HOST=mysql -e IDB_DB=test4 -e IDB_USR=devadm -e IDB_PSW="**" --strategy=source --source-secret=sinc-gitlab-pvx-1 

pause

echo ****************************************
echo *    create  Router
echo * 
echo ****************************************
oc expose svc/nodesrv --hostname="nodesrv-%APP_PROJ%.%APP_DNS%" --name="nodesrv-%APP_PROJ%.%APP_DNS%" --port 8080



pause

