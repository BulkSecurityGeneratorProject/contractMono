/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContractMonoTestModule } from '../../../test.module';
import { PhoneMySuffixComponent } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix.component';
import { PhoneMySuffixService } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix.service';
import { PhoneMySuffix } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix.model';

describe('Component Tests', () => {

    describe('PhoneMySuffix Management Component', () => {
        let comp: PhoneMySuffixComponent;
        let fixture: ComponentFixture<PhoneMySuffixComponent>;
        let service: PhoneMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractMonoTestModule],
                declarations: [PhoneMySuffixComponent],
                providers: [
                    PhoneMySuffixService
                ]
            })
            .overrideTemplate(PhoneMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PhoneMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.phones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
