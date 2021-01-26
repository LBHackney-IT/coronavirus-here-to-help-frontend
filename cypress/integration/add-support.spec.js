beforeEach(() => {
  cy.login();
  cy.visit(`http://localhost:3000/dashboard`);
});

context("When you view a helpcase profile", () => {
    it("it allows you to naviagte to the add support page", () => {
      cy.visit(`http://localhost:3000/helpcase-profile/1`);
      cy.getBySel('add-support-button').click()
      cy.url().should('match', /\/add-support/);
    })
})



export {};
