
/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
import ContactPage from "../support/pageObjects/ContactPage"

context('Lodgify Contact page', () => {
    beforeEach(() => {
        cy.visit('/contact.html'); 
    })

    it('Verify Send button behavior', () => {
        // Default behavior
        ContactPage.getSendButton().should('not.be.disabled');
        ContactPage.getNameField().click();
        ContactPage.getContactHeader().click();

        // Verify submit button disabled when required field validations are present
        ContactPage.getSendButton().should('be.disabled');
    });

    it('Verify Name field is required', () => {
        ContactPage.getNameField().click();
        ContactPage.getContactHeader().click();
        ContactPage.getNameField().next().should('have.text', 'Name is mandatory');
        cy.checkBorderColor('red', 'name');
    });
    /**
     * @todo This test fails since error message is missing
     */
    it('Verify Phone field is required', () => {
        ContactPage.getPhoneField().click();
        ContactPage.getContactHeader().click();
        ContactPage.getNameField().next().should('have.text', 'Phone is mandatory')
        cy.checkBorderColor('red', 'phone');
    });
    it('Verify Email field is required', () => {
        ContactPage.getEmailField().click();
        ContactPage.getContactHeader().click();
        ContactPage.getEmailField().next().should('have.text', 'Email is mandatory')
        cy.checkBorderColor('red', 'email');
    });

    it('Verify Comment field is required', () => {
        ContactPage.getCommentField().click();
        ContactPage.getContactHeader().click();
        ContactPage.getCommentField().next().should('have.text', 'Comment is mandatory')
        cy.checkBorderColor('red', 'comment');
    });

    /**
     * @todo Test fails since form returns an error instead of success message
     */
    it('Verify complete and send form', () => {
        const postUrlForm = 'https://websiteserver.lodgifyintegration.com/v2/websites/contact/website/317320';
        const comment = faker.lorem.paragraph();
        const name = faker.name.firstName();
        const guest = 2;
        const phone = faker.phone.phoneNumber();
        const email = faker.internet.email();
        const arrival = '14/04/2022';
        const departure = '14/06/2022';

        const formData = {
            comment,
            name,
            phone,
            email,
            guest,
            arrival,
            departure
        }

        cy.completForm(formData);
        cy.intercept('POST', postUrlForm).as('submitForm');
        ContactPage.getSendButton().click();
        // Wait unitl post request has finished
        cy.wait('@submitForm');
        ContactPage.getSuccesMessage().should('have.text', 'Your request has been sent successfully.');
        ContactPage.getErrorMessage().should('not.exist');


    });

    it('Verify date picker format', () => {
        ContactPage.getArrivalDatePicker().type('string');
        cy.checkBorderColor('red', 'datePicker');
        cy.contains('Dates are not valid').should('be.visible')
    });
});