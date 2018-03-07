import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Email e2e test', () => {

    let navBarPage: NavBarPage;
    let emailDialogPage: EmailDialogPage;
    let emailComponentsPage: EmailComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Emails', () => {
        navBarPage.goToEntity('email-my-suffix');
        emailComponentsPage = new EmailComponentsPage();
        expect(emailComponentsPage.getTitle())
            .toMatch(/Emails/);

    });

    it('should load create Email dialog', () => {
        emailComponentsPage.clickOnCreateButton();
        emailDialogPage = new EmailDialogPage();
        expect(emailDialogPage.getModalTitle())
            .toMatch(/Create or edit a Email/);
        emailDialogPage.close();
    });

    it('should create and save Emails', () => {
        emailComponentsPage.clickOnCreateButton();
        emailDialogPage.setEmailAddressInput('emailAddress');
        expect(emailDialogPage.getEmailAddressInput()).toMatch('emailAddress');
        emailDialogPage.typeSelectLastOption();
        emailDialogPage.contactSelectLastOption();
        emailDialogPage.save();
        expect(emailDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EmailComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-email-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EmailDialogPage {
    modalTitle = element(by.css('h4#myEmailLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    emailAddressInput = element(by.css('input#field_emailAddress'));
    typeSelect = element(by.css('select#field_type'));
    contactSelect = element(by.css('select#field_contact'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setEmailAddressInput = function(emailAddress) {
        this.emailAddressInput.sendKeys(emailAddress);
    };

    getEmailAddressInput = function() {
        return this.emailAddressInput.getAttribute('value');
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
