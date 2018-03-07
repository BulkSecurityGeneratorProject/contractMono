/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ContractMonoTestModule } from '../../../test.module';
import { ContactMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/contact-my-suffix/contact-my-suffix-detail.component';
import { ContactMySuffixService } from '../../../../../../main/webapp/app/entities/contact-my-suffix/contact-my-suffix.service';
import { ContactMySuffix } from '../../../../../../main/webapp/app/entities/contact-my-suffix/contact-my-suffix.model';

describe('Component Tests', () => {

    describe('ContactMySuffix Management Detail Component', () => {
        let comp: ContactMySuffixDetailComponent;
        let fixture: ComponentFixture<ContactMySuffixDetailComponent>;
        let service: ContactMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [ContactMySuffixDetailComponent],
                providers: [
                    ContactMySuffixService
                ]
            })
            .overrideTemplate(ContactMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ContactMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.contact).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
