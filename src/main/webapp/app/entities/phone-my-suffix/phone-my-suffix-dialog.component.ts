import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhoneMySuffix } from './phone-my-suffix.model';
import { PhoneMySuffixPopupService } from './phone-my-suffix-popup.service';
import { PhoneMySuffixService } from './phone-my-suffix.service';
import { ContactMySuffix, ContactMySuffixService } from '../contact-my-suffix';

@Component({
    selector: 'jhi-phone-my-suffix-dialog',
    templateUrl: './phone-my-suffix-dialog.component.html'
})
export class PhoneMySuffixDialogComponent implements OnInit {

    phone: PhoneMySuffix;
    isSaving: boolean;

    contacts: ContactMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private phoneService: PhoneMySuffixService,
        private contactService: ContactMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.contactService.query()
            .subscribe((res: HttpResponse<ContactMySuffix[]>) => { this.contacts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.phone.id !== undefined) {
            this.subscribeToSaveResponse(
                this.phoneService.update(this.phone));
        } else {
            this.subscribeToSaveResponse(
                this.phoneService.create(this.phone));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PhoneMySuffix>>) {
        result.subscribe((res: HttpResponse<PhoneMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PhoneMySuffix) {
        this.eventManager.broadcast({ name: 'phoneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackContactById(index: number, item: ContactMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-phone-my-suffix-popup',
    template: ''
})
export class PhoneMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phonePopupService: PhoneMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.phonePopupService
                    .open(PhoneMySuffixDialogComponent as Component, params['id']);
            } else {
                this.phonePopupService
                    .open(PhoneMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
