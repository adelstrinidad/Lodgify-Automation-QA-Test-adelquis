// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
  
      /**
       * Gets get Pricing Value
       *
       * @example
       * cy
       *   .getPricingValue()
       */
       getPricingValue()
    }
    interface Chainable {
  
      /**
       * Gets currency post number
       *
       * @example
       * cy
       *   .getCurrencyPost()
       */
       getCurrencyPost()
    }
    interface Chainable {
  
      /**
       * Select one available currence
       *
       * @example
       * cy
       *   .selectCurrency()
       */
       selectCurrency()
    }
    interface Chainable {
  
      /**
       * Gets currency pre number
       *
       * @example
       * cy
       *   .getCurrencyPre()
       */
       getCurrencyPre()
    }
    interface Chainable {
  
      /**
       * Verify discount value
       *
       * @example
       * cy
       *   .verifyDiscount()
       */
       verifyDiscount()
    }
  }
  
  
  
