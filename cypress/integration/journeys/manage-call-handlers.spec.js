beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit('/');
    cy.get('[data-testid=admin_button]').click();
    cy.get('[data-testid=manage-callhandlers_button]').click();
});

describe('As a manager I can view call handlers', () => {
    context('Call handlers navigation', () => {
        it('Can navigate to call handlers list', () => {
            cy.url().should('match', /\/manage-callhandlers$/);
        });

        it('Back button should route back to admin page', () => {
            cy.get('[data-testid=manage-callhandlers-back-btn]').click({ force: true });
            cy.url().should('match', /\/admin$/);
        });
    });

    context('Manage call handlers displays and maps data correctly', () => {
        it('Call handlers are retrieved and mapped to list items', () => {
            cy.get('[data-testid=callhandlers-table_row]').should('have.length', 4);
        });
    });
});
