beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit('/');
    cy.get('[data-testid=admin_button]').click();
    cy.get('[data-testid=assign-calls_button]').click();
});

describe('As a call handler I can bulk assign calls', () => {
    context('Assign call navigation', () => {
        it('Can navigate to assign calls page', () => {
            cy.url().should('match', /\/assign-calls$/);
        });

        it('Back button should route back to admin page', () => {
            cy.get('[data-testid=assign-call-back_button]').click({ force: true });
            cy.url().should('match', /\/admin$/);
        });

        it('Cancel button should route back to admin page', () => {
            cy.get('[data-testid=assign-call-cancel_button]').click({ force: true });
            cy.url().should('match', /\/admin$/);
        });

        it('Assign button should route to Callbacks list page', () => {
            cy.get('[data-testid=assign-call-handler-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.url().should('match', /\/callback-list$/);
        });
    });

    context('Assign call page displays and maps data correctly', () => {
        it('Call handlers are retrieved and mapped to dropdown options', () => {
            cy.get('[data-testid=assign-call-type_dropdown]')
                .find('option')
                .should('have.length', 5);
            cy.get('[data-testid=assign-call-handler-checkbox]').should('have.length', 4);
        });
    });

    context('Assign call has validation', () => {
        it('does not let you assign calls unless assignment type and handlers areselected', () => {
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');

            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');

            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-handler-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });
    });
});
