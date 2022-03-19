Cypress.Commands.add('getPricingValue', (index, value) => {
    cy.fixture('pricing').then((pricingElements) => {
        console.log(pricingElements)
        cy.get(`${pricingElements.planPrice}${index}`).find(pricingElements.pricingValue).should('have.text', value)

    })
})
Cypress.Commands.add('selectCurrency', () => {
    cy.fixture('pricing').then((pricingElements) => {
        return cy.get(pricingElements.currencySelect)

    })
})
Cypress.Commands.add('getCurrencyPre', () => {
    cy.fixture('pricing').then((pricingElements) => {
        return cy.get(pricingElements.currencySymbolPre)

    })
})
Cypress.Commands.add('getCurrencyPost', (currency) => {
    cy.fixture('pricing').then((pricingElements) => {
        return cy.get(pricingElements.currencySymbolPost)

    })
})

// Example of custom commands without using fixture
Cypress.Commands.add('verifyDiscount', (planName, percentToGet) => {
    let realPrice; 
    let discount;
    let totalSum;
    cy.get('.plan-name').contains(planName).next().find('.discount-number').then($el => {
        realPrice = $el.text()
        discount = ((percentToGet / 100) * parseInt(realPrice)).toFixed();
        return {realPrice, discount}
    }).then((obj) => {
        cy.get('.plan-name').contains(planName).siblings('.plan-price').find('.total-sum').then($el => {
            totalSum = $el.text()
            assert.equal(obj.realPrice - obj.discount, parseInt(totalSum), 'vals equal')

        })
    })

    
})
