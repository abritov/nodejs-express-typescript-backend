import * as Sequelize from 'sequelize'

interface Attributes {
  id?: number,
  userId: number,
  token: string,
}


interface Instance extends Sequelize.Instance<Attributes>, Attributes {

}

function createInstance(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  const attributes: Sequelize.DefineModelAttributes<Attributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
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

  const UserToken = sequelize.define<Instance, Attributes>('UserToken', attributes, options);

  // UserToken.associate = models => {
  //   UserToken.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  // }

  return UserToken;
}

export { Attributes as UserToken }
export { Instance as UserTokenInstance }
export default function (sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize)
}