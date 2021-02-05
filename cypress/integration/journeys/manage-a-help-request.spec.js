beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
});
describe;
context('When you view a helpcase profile', () => {
    it('it allows you to naviagte to the manage request page', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.url().should('match', /\/manage-request/);
    });

    it('it displays the call history', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=call-history-entry]').should('have.length', 2);
        cy.get('[data-testid=call-history-entry]').first().should('contain', "2021-01-26 15:12 by handler");
        cy.get('[data-testid=call-history-entry]').first().should('contain', "outbound Welfare Call: Callback complete");
    });
});

context('When viewing a single help request', () => {
  it('it displays help request metadata', () => {
    cy.get('[data-testid=support-requested-table-view_link-0]')
        .contains('View')
        .click({ force: true });
    cy.get('.govuk-caption-l').should('have.length', 2);
    cy.get('.govuk-caption-l').first().should('contain', "CTAS ID: 123abc");
    cy.get('.govuk-caption-l').last().should('contain', "Date tested: 02/02/2020");
  });
});

context('When required fields are not filled in', () => {
    it('it displays validation error', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');

        cy.get('[data-testid=call-type-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');

        cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
    });
});

context('When required fields are filled in', () => {
    beforeEach(() => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=call-type-radio-button]').first().click({ force: true });
        cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
    });

    it('it redirects to the resident page', () => {
        cy.get('[data-testid=callback-form-validation-error]').should('not.exist');
        cy.url().should('match', /\/helpcase-profile/);
    });
});

context('When add support gets cancelled', () => {
    it('it returns to the resident page', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=callback-form-cancel_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('not.exist');
        cy.url().should('match', /\/helpcase-profile/);
    });
});

export {};
