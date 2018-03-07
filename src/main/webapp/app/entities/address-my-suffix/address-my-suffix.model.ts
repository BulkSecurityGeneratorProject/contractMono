import { BaseEntity } from './../../shared';

export const enum Location_Type {
    'HOME',
    'WORK',
    'OTHER'
}

export class AddressMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public type?: Location_Type,
        public contactId?: number,
    ) {
    }
}
