import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-my-suffix');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle())
            .toMatch(/Addresses/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle())
            .toMatch(/Create or edit a Address/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setStreetAddressInput('streetAddress');
        expect(addressDialogPage.getStreetAddressInput()).toMatch('streetAddress');
        addressDialogPage.setPostalCodeInput('postalCode');
        expect(addressDialogPage.getPostalCodeInput()).toMatch('postalCode');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.setStateProvinceInput('stateProvince');
        expect(addressDialogPage.getStateProvinceInput()).toMatch('stateProvince');
        addressDialogPage.typeSelectLastOption();
        addressDialogPage.contactSelectLastOption();
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    streetAddressInput = element(by.css('input#field_streetAddress'));
    postalCodeInput = element(by.css('input#field_postalCode'));
    cityInput = element(by.css('input#field_city'));
    stateProvinceInput = element(by.css('input#field_stateProvince'));
    typeSelect = element(by.css('select#field_type'));
    contactSelect = element(by.css('select#field_contact'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setStreetAddressInput = function(streetAddress) {
        this.streetAddressInput.sendKeys(streetAddress);
    };

    getStreetAddressInput = function() {
        return this.streetAddressInput.getAttribute('value');
    };

    setPostalCodeInput = function(postalCode) {
        this.postalCodeInput.sendKeys(postalCode);
    };

    getPostalCodeInput = function() {
        return this.postalCodeInput.getAttribute('value');
    };

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    setStateProvinceInput = function(stateProvince) {
        this.stateProvinceInput.sendKeys(stateProvince);
    };

    getStateProvinceInput = function() {
        return this.stateProvinceInput.getAttribute('value');
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
