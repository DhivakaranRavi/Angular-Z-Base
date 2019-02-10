
set -x
# npm install --save-dev cross-env
set +x

echo 'Runing Jest Testing...'
set -x
sudo npm test --unsafe-perm=true --allow-root