#!/bin/sh
chown -R appuser:appgroup /usr/src/app/.next
chown -R appuser:appgroup /usr/src/app/node_modules

exec "$@"