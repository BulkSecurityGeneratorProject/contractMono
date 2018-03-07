/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ContractMonoTestModule } from '../../../test.module';
import { AddressMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix-detail.component';
import { AddressMySuffixService } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix.service';
import { AddressMySuffix } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix.model';

describe('Component Tests', () => {

    describe('AddressMySuffix Management Detail Component', () => {
        let comp: AddressMySuffixDetailComponent;
        let fixture: ComponentFixture<AddressMySuffixDetailComponent>;
        let service: AddressMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [AddressMySuffixDetailComponent],
                providers: [
                    AddressMySuffixService
                ]
            })
            .overrideTemplate(AddressMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AddressMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.address).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
