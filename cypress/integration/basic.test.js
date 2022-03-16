/// <reference types="Cypress" />

context('Lodgify contact page', () => {
  it('Should have the right title', () => {
    /*
    On "Lodgify Pricing" page, add a test to verify that the "Yearly" plan selecting 50 rentals displays: $64 for Starter plan $375 for Professional plan $525 for Ultimate plan
*/
    cy.visit('http://localhost:3000/pricing.html');
    cy.get("#scroll-prop-plan").clear().type(50)
    cy.get('.plan-price-2').find(".total-sum").should('have.text', '64')
    cy.get('.plan-price-1').find(".total-sum").should('have.text', '375')
    cy.get('.plan-price-3').find(".total-sum").should('have.text', '525')
    

  });
})