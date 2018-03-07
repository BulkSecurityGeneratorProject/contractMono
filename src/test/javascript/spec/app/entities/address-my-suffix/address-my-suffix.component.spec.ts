/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContractMonoTestModule } from '../../../test.module';
import { AddressMySuffixComponent } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix.component';
import { AddressMySuffixService } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix.service';
import { AddressMySuffix } from '../../../../../../main/webapp/app/entities/address-my-suffix/address-my-suffix.model';

describe('Component Tests', () => {

    describe('AddressMySuffix Management Component', () => {
        let comp: AddressMySuffixComponent;
        let fixture: ComponentFixture<AddressMySuffixComponent>;
        let service: AddressMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [AddressMySuffixComponent],
                providers: [
                    AddressMySuffixService
                ]
            })
            .overrideTemplate(AddressMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AddressMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
