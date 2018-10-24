import * as Sequelize from 'sequelize'

interface Attributes {
  userId: number,
  token: string,
}


type Instance = Sequelize.Instance<Attributes> & Attributes;

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    token: {
      field: 'token',
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
  };

  const options: Sequelize.DefineOptions<Attributes> = {
    tableName: 'user_token',
  };

  return sequelize.define<Instance, Attributes>('UserToken', attributes, options)
}

export { Attributes as UserToken };
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}