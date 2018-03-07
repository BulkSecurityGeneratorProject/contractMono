import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmailMySuffix } from './email-my-suffix.model';
import { EmailMySuffixPopupService } from './email-my-suffix-popup.service';
import { EmailMySuffixService } from './email-my-suffix.service';

@Component({
    selector: 'jhi-email-my-suffix-delete-dialog',
    templateUrl: './email-my-suffix-delete-dialog.component.html'
})
export class EmailMySuffixDeleteDialogComponent {

    email: EmailMySuffix;

    constructor(
        private emailService: EmailMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emailService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emailListModification',
                content: 'Deleted an email'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-email-my-suffix-delete-popup',
    template: ''
})
export class EmailMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emailPopupService: EmailMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emailPopupService
                .open(EmailMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
