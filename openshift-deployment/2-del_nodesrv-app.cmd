echo ****************************************
echo *    delete Node.js application
echo * 
echo ****************************************

call ..\login.cmd

oc project %APP_PROJ%
pause

oc delete all -l app=nodesrv

pause

