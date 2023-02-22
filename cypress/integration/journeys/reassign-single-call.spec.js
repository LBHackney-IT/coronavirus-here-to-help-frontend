beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit('/dashboard');
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.wait(['@callbacksList', '@callHandlers']);
});
describe('As a call handler I can reassign calls', () => {
    context('Reassign single call page navigation', () => {
        beforeEach(() => {
            cy.get('[data-testid=callbacks-table-assigned-to_link]').first().click({ force: true });
        });
        it('Back button should route back to Callbacks list page', () => {
            cy.get('[data-testid=reassign-call-back_button]').click({ force: true });
            cy.url().should('match', /\/callback-list$/);
        });

        it('Cancel button should route back to Callbacks list page', () => {
            cy.get('[data-testid=reassign-call-cancel_button]').click({ force: true });
            cy.url().should('match', /\/callback-list$/);
        });

        it('Assign button should route back to Callbacks list page', () => {
            cy.get('[data-testid=reassign-call-handlers-dropdown]').select('Person D');
            cy.get('[data-testid=reassign-call-assign_button]').click();
            cy.wait(500);
            cy.url().should('match', /\/callback-list$/);
        });
    });

    context('Reassign single call page displays and maps data correctly', () => {
        it('Call handlers are retrieved and mapped to dropdown options', () => {
            cy.get('[data-testid=callbacks-table-assigned-to_link]').first().click({ force: true });
            cy.get('[data-testid=reassign-call-handlers-dropdown]')
                .find('option')
                .should('have.length', 5);
        });

        it("Call handler dropdown's default value should match callback's assigned call handler", () => {
            cy.get('[data-testid=callbacks-table-assigned-to_link]')
                .first()
                .should('contain', 'PB')
                .click();
            cy.get('[data-testid=reassign-call-handlers-dropdown]')
                .invoke('val')
                .should('contain', 'Person B');
        });
    });
});
