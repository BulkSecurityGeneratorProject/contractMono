import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmailMySuffix } from './email-my-suffix.model';
import { EmailMySuffixPopupService } from './email-my-suffix-popup.service';
import { EmailMySuffixService } from './email-my-suffix.service';
import { ContactMySuffix, ContactMySuffixService } from '../contact-my-suffix';

@Component({
    selector: 'jhi-email-my-suffix-dialog',
    templateUrl: './email-my-suffix-dialog.component.html'
})
export class EmailMySuffixDialogComponent implements OnInit {

    email: EmailMySuffix;
    isSaving: boolean;

    contacts: ContactMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emailService: EmailMySuffixService,
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
        if (this.email.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emailService.update(this.email));
        } else {
            this.subscribeToSaveResponse(
                this.emailService.create(this.email));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmailMySuffix>>) {
        result.subscribe((res: HttpResponse<EmailMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmailMySuffix) {
        this.eventManager.broadcast({ name: 'emailListModification', content: 'OK'});
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
    selector: 'jhi-email-my-suffix-popup',
    template: ''
})
export class EmailMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emailPopupService: EmailMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emailPopupService
                    .open(EmailMySuffixDialogComponent as Component, params['id']);
            } else {
                this.emailPopupService
                    .open(EmailMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
