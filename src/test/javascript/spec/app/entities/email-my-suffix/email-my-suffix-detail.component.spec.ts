/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ContractMonoTestModule } from '../../../test.module';
import { EmailMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix-detail.component';
import { EmailMySuffixService } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix.service';
import { EmailMySuffix } from '../../../../../../main/webapp/app/entities/email-my-suffix/email-my-suffix.model';

describe('Component Tests', () => {

    describe('EmailMySuffix Management Detail Component', () => {
        let comp: EmailMySuffixDetailComponent;
        let fixture: ComponentFixture<EmailMySuffixDetailComponent>;
        let service: EmailMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [EmailMySuffixDetailComponent],
                providers: [
                    EmailMySuffixService
                ]
            })
            .overrideTemplate(EmailMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmailMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.email).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
