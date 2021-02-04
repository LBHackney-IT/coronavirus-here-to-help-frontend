beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
});
describe;
context('When you view a helpcase profile', () => {
    it('it allows you to edit the resident bio', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.url().should('match', /\/editresident/);
    });
});

context('When required fields are not filled in', () => {
    it('it displays validation error', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=first-name-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')

        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=last-name-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')

        // cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        // cy.get('[data-testid=contact-telephone-input]').clear();
        // cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        // cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')




        // cy.get('[data-testid=call-type-radio-button]').first().click({ force: true });
        // cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        // cy.get('[data-testid=callback-form-validation-error]').should('be.visible');

        // cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        // cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        // cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
    });
});