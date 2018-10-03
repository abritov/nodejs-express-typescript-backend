import * as Sequelize from 'sequelize';

export interface IntPartModel extends Sequelize.Instance<any> {
    id: number;
    title: string;
    alias: string;
    text: string;
}
