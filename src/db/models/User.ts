import * as Sequelize from 'sequelize'

interface UserAttributes {
    id?: number,
    name: string,
    authKey: string,
    passwordHash: string,
    passwordResetToken: string,
    email: string,
    status: number,
}

type UsersInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        authKey: {
            field: 'auth_key',
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        passwordHash: {
            field: 'password_hash',
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        passwordResetToken: {
            field: 'password_reset_token',
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        status: {
            field: 'status',
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue: 0,
        }
    };

    const options = {
        indexes: [
            {
                unique: true,
                fields: ['email'],
            },
        ],
        timestamps: true,
        tableName: 'users',
    };
    return sequelize.define<UsersInstance, UserAttributes>('Users', attributes, options);
};
