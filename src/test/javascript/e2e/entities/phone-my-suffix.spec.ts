import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Phone e2e test', () => {

    let navBarPage: NavBarPage;
    let phoneDialogPage: PhoneDialogPage;
    let phoneComponentsPage: PhoneComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Phones', () => {
        navBarPage.goToEntity('phone-my-suffix');
        phoneComponentsPage = new PhoneComponentsPage();
        expect(phoneComponentsPage.getTitle())
            .toMatch(/Phones/);

    });

    it('should load create Phone dialog', () => {
        phoneComponentsPage.clickOnCreateButton();
        phoneDialogPage = new PhoneDialogPage();
        expect(phoneDialogPage.getModalTitle())
            .toMatch(/Create or edit a Phone/);
        phoneDialogPage.close();
    });

    it('should create and save Phones', () => {
        phoneComponentsPage.clickOnCreateButton();
        phoneDialogPage.setPhoneNumberInput('phoneNumber');
        expect(phoneDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        phoneDialogPage.typeSelectLastOption();
        phoneDialogPage.contactSelectLastOption();
        phoneDialogPage.save();
        expect(phoneDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PhoneComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-phone-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PhoneDialogPage {
    modalTitle = element(by.css('h4#myPhoneLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    typeSelect = element(by.css('select#field_type'));
    contactSelect = element(by.css('select#field_contact'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };
    contactSelectLastOption = function() {
        this.contactSelect.all(by.tagName('option')).last().click();
    };

    contactSelectOption = function(option) {
        this.contactSelect.sendKeys(option);
    };

    getContactSelect = function() {
        return this.contactSelect;
    };

    getContactSelectedOption = function() {
        return this.contactSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
