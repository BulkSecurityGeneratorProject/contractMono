import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmailMySuffix } from './email-my-suffix.model';
import { EmailMySuffixService } from './email-my-suffix.service';

@Component({
    selector: 'jhi-email-my-suffix-detail',
    templateUrl: './email-my-suffix-detail.component.html'
})
export class EmailMySuffixDetailComponent implements OnInit, OnDestroy {

    email: EmailMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emailService: EmailMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmails();
    }

    load(id) {
        this.emailService.find(id)
            .subscribe((emailResponse: HttpResponse<EmailMySuffix>) => {
                this.email = emailResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emailListModification',
            (response) => this.load(this.email.id)
        );
    }
}
