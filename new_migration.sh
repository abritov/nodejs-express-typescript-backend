#!/bin/sh
cat > ./src/db/migrations/$(date +"%Y%m%d%H%M%S")-$1.js << EOF
// @ts-check

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.up = (queryInterface, Sequelize) => {
  // Write migration code here.
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {import('sequelize').SequelizeStatic} Sequelize
 */
module.exports.down = (queryInterface, Sequelize) => {
  // If migration fails, this will be called. Rollback your migration changes.
};
EOF