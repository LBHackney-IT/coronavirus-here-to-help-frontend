beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
});
describe;
context('When you view a helpcase profile', () => {
    it('it allows you to naviagte to the add support page', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=add-support-button]').click({ force: true });
        cy.url().should('match', /\/add-support/);
    });
});

context('When required fields are not filled in', () => {
    it('it displays validation error', () => {
        cy.get('[data-testid=add-support-button]').click({ force: true });
        cy.get('[data-testid=add-support-update_button]').click({ force: true });
        cy.get('[data-testid=add-support-validation-error]').should('be.visible');

        cy.get('[data-testid=call-type-radio-button]').first().click({ force: true });
        cy.get('[data-testid=add-support-update_button]').click({ force: true });
        cy.get('[data-testid=add-support-validation-error]').should('be.visible');

        cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        cy.get('[data-testid=add-support-update_button]').click({ force: true });
        cy.get('[data-testid=add-support-validation-error]').should('be.visible');
    });
});

context('When required fields are filled in', () => {
    beforeEach(() => {
        cy.get('[data-testid=add-support-button]').click({ force: true });
        cy.get('[data-testid=call-type-radio-button]').first().click({ force: true });
        cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
        cy.get('[data-testid=add-support-update_button]').click({ force: true });
    });

    it('it redirects to the resident page', () => {
        cy.get('[data-testid=add-support-validation-error]').should('not.exist');
        cy.url().should('match', /\/helpcase-profile/);
    });
});

context('When add support gets cancelled', () => {
    it('it returns to the resident page', () => {
        cy.get('[data-testid=add-support-button]').click({ force: true });
        cy.get('[data-testid=add-support-cancel_button]').click({ force: true });
        cy.get('[data-testid=add-support-validation-error]').should('not.exist');
        cy.url().should('match', /\/helpcase-profile/);
    });
});

export {};
