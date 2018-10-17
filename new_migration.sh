#!/bin/sh
cat > ./src/db/migrations/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
import { QueryInterface, SequelizeStatic } from 'sequelize';

export function up(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  // Write migration code here.
};

export function down(queryInterface: QueryInterface, Sequelize: SequelizeStatic) {
  // If migration fails, this will be called. Rollback your migration changes.
};
EOF