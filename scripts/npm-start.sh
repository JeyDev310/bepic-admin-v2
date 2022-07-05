#!/bin/bash
cd /var/www/html/admin_v2
yarn run build
yarn cache clean
cp /var/www/html/.htaccess /var/www/html/admin_v2/dist
