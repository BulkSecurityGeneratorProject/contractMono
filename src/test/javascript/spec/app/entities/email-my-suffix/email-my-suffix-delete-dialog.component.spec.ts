/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ContractMonoTestModule } from '../../../test.module';
import { EmailMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix-delete-dialog.component';
import { EmailMySuffixService } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix.service';

describe('Component Tests', () => {

    describe('EmailMySuffix Management Delete Component', () => {
        let comp: EmailMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EmailMySuffixDeleteDialogComponent>;
        let service: EmailMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [EmailMySuffixDeleteDialogComponent],
                providers: [
                    EmailMySuffixService
                ]
            })
            .overrideTemplate(EmailMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
