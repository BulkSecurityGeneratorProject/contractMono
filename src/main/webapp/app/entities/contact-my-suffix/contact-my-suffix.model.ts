import { BaseEntity } from './../../shared';

export class ContactMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public title?: string,
        public organization?: string,
        public phones?: BaseEntity[],
        public emails?: BaseEntity[],
        public addresses?: BaseEntity[],
    ) {
    }
}
