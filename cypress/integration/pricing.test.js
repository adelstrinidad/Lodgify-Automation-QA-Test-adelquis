/// <reference types="Cypress" />

context('Lodgify Pricing page', () => {
  let pricingElements = {};
  beforeEach(() => {
    cy.visit('/pricing.html');
    
    cy.fixture('pricing').then((elements) => {
      pricingElements = elements;
    })
  })

  it('Verify pricing plan for yearly subscription', () => {
    //On "Lodgify Pricing" page, add a test to verify that the "Yearly" plan selecting 50 rentals displays: 
    //$64 for Starter plan $375 for Professional plan $525 for Ultimate plan

    cy.get(pricingElements.scrollPropPlan).clear().type(50)
    // Validate Starter price plan
    cy.getPricingValue('2', '64')
    // Validate Professional price plan
    cy.getPricingValue('1', '375')
    // Validate Ultimate price plan
    // TODO This test reports a bug. Expected result 518
    cy.getPricingValue('3', '525')



  });

  it('Verify currency by default', () => {
    //On "Lodgify Pricing" page, add a test to verify that the change of currency (located just below the pricing options) 
    // properly changes the currency of the pricing options. 
    // The way you do so, and the extra verification steps are up to you (such as verifying the currency price difference)
    // cy.get('select').select(0).should('have.value', '456')

    cy.selectCurrency().find('option:selected').should('have.text', '€ EUR')
    // TODO This test fails since the default currency on plans is $
    cy.getCurrencyPost().each(($el) => {
      cy.wrap($el).should('have.text', '€')
    })
  });

  it('Verify currency on change', () => {
    //On "Lodgify Pricing" page, add a test to verify that the change of currency (located just below the pricing options) 
    // properly changes the currency of the pricing options. 
    // The way you do so, and the extra verification steps are up to you (such as verifying the currency price difference)

    const currencies = ['€ EUR', '$ USD', '£ GBP']
    currencies.forEach(currency => {
      const currencySymbol = currency.split(' ')[0]
      cy.selectCurrency().select(currency)
      if (currency == '€ EUR') {
        cy.getCurrencyPost().each(($el) => {
          cy.wrap($el).should('have.text', currencySymbol)
        })
        cy.getCurrencyPre().each(($el) => {
          cy.wrap($el).should('have.text', '')
        })
      } else {
        cy.getCurrencyPost().each(($el) => {
          cy.wrap($el).should('have.text', '')
        })
        cy.getCurrencyPre().each(($el) => {
          cy.wrap($el).should('have.text', currencySymbol)
        })
      }

    });
  })


  it('Verify yearly discount', () => {
    // Verify discount for dolar currency
    const plans = ['Starter', 'Professional', 'Ultimate']
    plans.forEach(plan => {
      cy.verifyDiscount(plan, 30)
    })
  });

  it('Verify functionality of slider handle', () => {
      const arrayRentals = [1,35, 50, 75, 100];
      arrayRentals.forEach(rental => {
        cy.get(pricingElements.scrollPropPlan).clear().type(rental).invoke('attr', 'data-slider-value', '');
        cy.get(pricingElements.minSliderHandle).invoke('attr', 'aria-valuenow').should('eq',rental.toString())
      });

  });


})