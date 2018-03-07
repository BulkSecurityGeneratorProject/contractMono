/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ContractMonoTestModule } from '../../../test.module';
import { AddressMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix-delete-dialog.component';
import { AddressMySuffixService } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix.service';

describe('Component Tests', () => {

    describe('AddressMySuffix Management Delete Component', () => {
        let comp: AddressMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AddressMySuffixDeleteDialogComponent>;
        let service: AddressMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [AddressMySuffixDeleteDialogComponent],
                providers: [
                    AddressMySuffixService
                ]
            })
            .overrideTemplate(AddressMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressMySuffixService);
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
