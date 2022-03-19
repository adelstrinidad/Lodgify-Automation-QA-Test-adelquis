class ContactPage {

getNameField(){
    return cy.get('[name="name"]')
}
getEmailField(){
    return cy.get('[name="email"]')
}
getGuestField(){
    return cy.get('[name="guests"]')
}
getCommentField(){
    return cy.get('[placeholder="Comment"]')
}
getPhoneField(){
    return cy.get('[name="phone"]')
}
getSendButton(){
    return cy.contains('Send')
}
getContactHeader(){
    return cy.get('.content > .ui.header')
}

getErrorMessage(){
    return cy.get('.content').contains('Error')
}
getSuccesMessage(){
    return cy.get('.content').contains('successfully')
}

getArrivalDatePicker(){
    return cy.get('[placeholder="Arrival"]')
}

getDepartureDatePicker(){
    return cy.get('[placeholder="Departure"]')
}

getDatePicker(){
    return cy.get('.DateRangePickerInput__withBorder')
}

}
export default new ContactPage