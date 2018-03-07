/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContractMonoTestModule } from '../../../test.module';
import { ContactMySuffixComponent } from '../../../../../../main/webapp/app/entities/contact-my-suffix/contact-my-suffix.component';
import { ContactMySuffixService } from '../../../../../../main/webapp/app/entities/contact-my-suffix/contact-my-suffix.service';
import { ContactMySuffix } from '../../../../../../main/webapp/app/entities/contact-my-suffix/contact-my-suffix.model';

describe('Component Tests', () => {

    describe('ContactMySuffix Management Component', () => {
        let comp: ContactMySuffixComponent;
        let fixture: ComponentFixture<ContactMySuffixComponent>;
        let service: ContactMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [ContactMySuffixComponent],
                providers: [
                    ContactMySuffixService
                ]
            })
            .overrideTemplate(ContactMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ContactMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contacts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
