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
            cy.get('[data-testid=assign-call-type_dropdown]').select('All');
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
                .should('have.length', 6);
            cy.get('[data-testid=assign-call-handler-checkbox]').should('have.length', 4);
        });
        it('Call types dropdown does not default to All', () => {
            cy.get('[data-testid=assign-call-type_dropdown]')
                .find('option')
                .should('not.have.value', 'All');
        });
    });

    context('Assign call has validation', () => {
        it('does not let you assign calls if call type, assignment type and handlers are not selected', () => {
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });
        it('does not let you assign calls if only an assignment type is selected', () => {
            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });

        it('does not let you assign calls if only a handler is selected', () => {
            cy.get('[data-testid=assign-call-handler-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });

        it('does not let you assign calls if only a call type is selected', () => {
            cy.get('[data-testid=assign-call-type_dropdown]').select('All');
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });

        it('does not let you assign calls if only a call type and assignment type are selected', () => {
            cy.get('[data-testid=assign-call-type_dropdown]').select('All');
            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });

        it('does not let you assign calls if only a call type and handlers are selected', () => {
            cy.get('[data-testid=assign-call-type_dropdown]').select('All');
            cy.get('[data-testid=assign-call-handler-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });

        it('does not let you assign calls if only an assignment type and handlers are selected', () => {
            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-handler-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });
    });
});
