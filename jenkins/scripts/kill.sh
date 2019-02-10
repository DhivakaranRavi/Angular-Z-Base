
echo 'Terminates the "npm start" process using its PID'
set -x
kill $(cat .pidfile)