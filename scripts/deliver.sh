
echo 'Build starts...'
set -x
sudo npm run build --unsafe-perm=true --allow-root
set +x

set -x
sudo npm start --unsafe-perm=true --allow-root  &
sleep 1
echo $! > .pidfile
set +x

echo 'Development in live cool...'