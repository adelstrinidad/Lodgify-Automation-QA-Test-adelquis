import ContactPage from "../support/pageObjects/ContactPage"
Cypress.Commands.add('completForm', (data) => {
    ContactPage.getNameField().type(data.name)
    cy.checkBorderColor('green', 'name');
    
    ContactPage.getGuestField().type(data.guest);
    cy.checkBorderColor('green', 'guests');

    ContactPage.getPhoneField().type(data.phone);
    /** 
     * @todo 
     * There is a false positive here. When I inspect the color property in chromedevtools,
     * It displays the property in Green, as it is expected, but when I look in the UI the field
     * is not displayed with green border color
     */
    cy.checkBorderColor('green', 'phone');

    ContactPage.getEmailField().type(data.email);
    cy.checkBorderColor('green', 'email');

    ContactPage.getArrivalDatePicker().type(data.arrival);
    ContactPage.getDepartureDatePicker().type(data.departure);
    cy.checkBorderColor('green', 'datePicker');

    ContactPage.getCommentField().type(data.comment);
    cy.checkBorderColor('green', 'comment');
})

Cypress.Commands.add('checkBorderColor', (color, elementName) => {
    cy.fixture('contact').then((contactElement) => {
        ContactPage.getContactHeader().click();
        if(color === 'green'){
            cy.get(contactElement[elementName]).should('have.css', 'border-color', 'rgb(58, 223, 53)');
        }else{
            cy.get(contactElement[elementName]).should('have.css', 'border-color', 'rgb(208, 2, 27)');
        }
       
    })
})