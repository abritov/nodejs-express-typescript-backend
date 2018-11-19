#!/bin/sh
# Read arguments passed to the script.

yarn sequelize --config ./src/db/config.js \
--models-path ./src/db/models \
--seeders-path ./src/db/seeders \
--migrations-path ./src/db/migrations