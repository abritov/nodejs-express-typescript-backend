import { IntBookModel } from './Book';
import * as Sequelize from 'sequelize';
import { IntPartModel } from './Part';
import { IntUsersModel } from './Users';

export const STATUS_CREATE = 0;
export const STATUS_FAIL = 1;
export const STATUS_NEUTRAL = 2;
export const STATUS_CONFIRM = 10;

export interface IntPartCheckerModel extends Sequelize.Instance<any> {
    id: number;
    bookId: number;
    partId: number;
    userId: number;
    statusId: number;
    original: string;
    correct: string;
    selected: string;
    commentModerator: string;
    createdAt: number;
    updatedAt: number;
    part: IntPartModel;
    book: IntBookModel;
    user: IntUsersModel;
}
