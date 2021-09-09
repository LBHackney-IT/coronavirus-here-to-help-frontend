before(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
    cy.get('[data-testid=add-support-button]').click({ force: true });
});

context('When adding non self-isolation or contact tracing help request', () => {
    it('it does not display the self-isolation needs form', () => {
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');

        cy.get('[data-testid=call-type-radio-button]').eq(1).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');
    });
});

context('When adding new self isolation help request and call completed is selected', () => {
    it('displays self isolation help needs form', () => {
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');

        cy.get('[data-testid=call-type-radio-button]').eq(2).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');

        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('be.visible');
    });
});

context('When adding new contact tracing help request and call completed is selected', () => {
    it('displays self isolation help needs form', () => {
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');

        cy.get('[data-testid=call-type-radio-button]').eq(0).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');

        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('be.visible');
    });
});

context('When required fields are not filled in', () => {
    it('displays validation error if form is submitted with no inputs', () => {
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
        cy.url().should('match', /\/add-support/);
    });
    it('displays validation error when call completed but no support needs selected', () => {
        cy.get('[data-testid=call-type-radio-button]').eq(0).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=call-direction-radio-button]').first().click({ force: true });
        cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
    });
});
