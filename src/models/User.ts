import * as Sequelize from 'sequelize';
import { IntRoleModel } from './Role';
import { IntTokenModel } from './Token';

export interface IntUserModel extends Sequelize.Instance<any> {
    id: number;
    username: string;
    email: string;
    hash: string;
    salt: string;
    roles: IntRoleModel[];
    token: IntTokenModel;
}
