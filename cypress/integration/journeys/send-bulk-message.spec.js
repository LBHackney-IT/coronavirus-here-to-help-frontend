beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
});

context('When adding new cev help request', () => {
    it('it display cev help needs form', () => {
        cy.get('[data-testid=admin_button]').click({ force: true });
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.get('[data-testid=select-dropdown]').select('Contact Tracing');
        cy.get('[data-testid=assigned-send-bulk-checkbox]').click({ force: true });
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.url().should('contain', `dashboard`);
    });
});
