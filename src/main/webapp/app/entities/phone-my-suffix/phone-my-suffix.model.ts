import { BaseEntity } from './../../shared';

export const enum Location_Type {
    'HOME',
    'WORK',
    'OTHER'
}

export class PhoneMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public phoneNumber?: string,
        public type?: Location_Type,
        public contactId?: number,
    ) {
    }
}
