import { BaseEntity } from './../../shared';

export const enum Location_Type {
    'HOME',
    'WORK',
    'OTHER'
}

export class EmailMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public emailAddress?: string,
        public type?: Location_Type,
        public contactId?: number,
    ) {
    }
}
