/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContractMonoTestModule } from '../../../test.module';
import { EmailMySuffixComponent } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix.component';
import { EmailMySuffixService } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix.service';
import { EmailMySuffix } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix.model';

describe('Component Tests', () => {

    describe('EmailMySuffix Management Component', () => {
        let comp: EmailMySuffixComponent;
        let fixture: ComponentFixture<EmailMySuffixComponent>;
        let service: EmailMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [EmailMySuffixComponent],
                providers: [
                    EmailMySuffixService
                ]
            })
            .overrideTemplate(EmailMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmailMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
