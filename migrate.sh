#!/bin/sh
# Read arguments passed to the script.
if [ -z "$1" ]; then
 ENVIRONMENT='development'
else
 ENVIRONMENT="$1"
fi

echo ""
echo "Migrating for environment: $ENVIRONMENT"
echo ""

# echo " -> Step 1/4: Compiling migration scripts."
# echo ""
# for filename in ./src/db/migrations/*.ts; do
#     yarn tsc --target ES2015 --module CommonJS --noEmitOnError --outDir ./build-migrations $filename
# done
# echo ""
# echo " -> Compilation completed."
# echo ""

echo ""
echo " -> Starting migration."
echo ""
yarn sequelize --config ./src/db/config.json \
--models-path ./src/db/models \
--seeders-path ./src/db/seeders \
--migrations-path ./src/db/migrations \
--env $ENVIRONMENT db:migrate 
echo ""
echo " -> Migration completed."
echo ""

# echo ""
# echo " -> Step 3/3: Deleting generated files."
# echo ""
# rm -Rf ./build-migrations
# mkdir ./build-migrations
# echo ""
# echo " -> Deletion completed."