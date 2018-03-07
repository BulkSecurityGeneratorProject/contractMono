import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ContractMonoAddressMySuffixModule } from './address-my-suffix/address-my-suffix.module';
import { ContractMonoEmailMySuffixModule } from './email-my-suffix/email-my-suffix.module';
import { ContractMonoPhoneMySuffixModule } from './phone-my-suffix/phone-my-suffix.module';
import { ContractMonoContactMySuffixModule } from './contact-my-suffix/contact-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ContractMonoAddressMySuffixModule,
        ContractMonoEmailMySuffixModule,
        ContractMonoPhoneMySuffixModule,
        ContractMonoContactMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractMonoEntityModule {}
