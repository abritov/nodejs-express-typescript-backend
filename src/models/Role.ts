import * as Sequelize from 'sequelize';

export const ROLE_USER = 'user';
export const ROLE_TRANSLATE = 'translate';
export const ROLE_REDACTOR = 'redactor';
export const ROLE_MAIN_REDACTOR = 'main_redactor';
export const ROLE_MAIN_TRANSLATE = 'main_translate';
export const ROLE_ADMIN = 'admin';

export interface IntRoleModel extends Sequelize.Instance<any> {
    id: number;
    name: string;
}
