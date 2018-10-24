import * as Sequelize from 'sequelize'

interface Attributes {
  userId: number,
  token: string,
}


interface Instance extends Sequelize.Instance<Attributes>, Attributes {

}

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    userId: {
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

export { Attributes as UserToken }
export { Instance as UserTokenInstance }
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}