beforeEach(() => {
  cy.login();
  cy.visit(`http://localhost:3000/dashboard`);
});

context("When you view a helpcase profile", () => {
    it("it allows you to naviagte to the add support page", () => {
      cy.visit(`http://localhost:3000/callback-list`);
      cy.getBySel('callbacks-table').find('tbody > tr').find('td:has(a:contains("View"))').eq(0).find('a').click({force: true});
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
      cy.getBySel('add-support-button').click()
      cy.url().should('match', /\/add-support/);
    })
})



export {};
