beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
    cy.get('[data-testid=add-support-button]').click({ force: true });
});

context('When adding new link work help request and call completed is selected', () => {
    it('does not display self isolation help needs form and form can be submitted', () => {
        cy.get('[data-testid=call-type-radio-button]').eq(4).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');

        cy.get('[data-testid=call-direction-radio-button]').first().click({ force: true });
        cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });

        cy.get('[data-testid=callback-form-validation-error]').should('not.exist');
    });
});

context('When required fields are not filled in', () => {
    it('displays validation error if form is submitted with no inputs', () => {
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
        cy.url().should('match', /\/add-support/);
    });
    it('displays validation error when call completed but no follow up selected', () => {
        cy.get('[data-testid=call-type-radio-button]').eq(4).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=call-direction-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
    });
});
