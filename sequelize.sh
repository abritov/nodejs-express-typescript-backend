#!/bin/sh
# Read arguments passed to the script.
if [ -z "$ENV" ]; then
 ENVIRONMENT="development_$USER"
else
 ENVIRONMENT=$ENV
fi

yarn sequelize --config ./src/db/config.js \
--models-path ./src/db/models \
--seeders-path ./src/db/seeders \
--migrations-path ./src/db/migrations \
--env $ENVIRONMENT $@