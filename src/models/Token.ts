import * as Sequelize from 'sequelize';

export interface IntTokenModel extends Sequelize.Instance<any> {
    id: number;
    userId: number;
    token: string;
    expires: number;
}
