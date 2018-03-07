import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContractMonoSharedModule } from '../../shared';
import {
    PhoneMySuffixService,
    PhoneMySuffixPopupService,
    PhoneMySuffixComponent,
    PhoneMySuffixDetailComponent,
    PhoneMySuffixDialogComponent,
    PhoneMySuffixPopupComponent,
    PhoneMySuffixDeletePopupComponent,
    PhoneMySuffixDeleteDialogComponent,
    phoneRoute,
    phonePopupRoute,
    PhoneMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...phoneRoute,
    ...phonePopupRoute,
];

@NgModule({
    imports: [
        ContractMonoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhoneMySuffixComponent,
        PhoneMySuffixDetailComponent,
        PhoneMySuffixDialogComponent,
        PhoneMySuffixDeleteDialogComponent,
        PhoneMySuffixPopupComponent,
        PhoneMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PhoneMySuffixComponent,
        PhoneMySuffixDialogComponent,
        PhoneMySuffixPopupComponent,
        PhoneMySuffixDeleteDialogComponent,
        PhoneMySuffixDeletePopupComponent,
    ],
    providers: [
        PhoneMySuffixService,
        PhoneMySuffixPopupService,
        PhoneMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractMonoPhoneMySuffixModule {}
