import * as Sequelize from 'sequelize';

export interface IntBookModel extends Sequelize.Instance<any> {
    id: number;
    title: string;
    shortTitle: string;
    imageMobile: string;
    alias: string;
}
