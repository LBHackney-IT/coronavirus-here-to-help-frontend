import { DEFAULT_DROPDOWN_OPTION, EUSS } from '../../../src/helpers/constants';
import { EUSS_User } from '../../support/commands';

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
            cy.get('[data-testid=call-type-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-handler-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.url().should('match', /\/callback-list$/);
        });
        it('Can assign to EUSS call types when logged in as EUSS user', () => {
            cy.login(EUSS_User);
            cy.get('[data-testid=call-type-checkbox]')
                .should('have.length', 5)
                .eq(4)
                .should('have.value', EUSS);
            cy.get('[data-testid=call-type-checkbox]').eq(4).click({ force: true });
            cy.get('[data-testid=assign-call-handler-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
        });
        it('Can not assign to EUSS call types when EUSS is disabled ', () => {
            cy.get('[data-testid=call-type-checkbox]')
                .should('have.length', 4)
                .should('not.have.value', EUSS);
        });
    });

    context('Assign call page displays and maps data correctly', () => {
        it('Call handlers are retrieved and mapped to checkboxes', () => {
            cy.get('[data-testid=call-type-checkbox]')
                .should('have.length', 4)
                .should('not.have.value', DEFAULT_DROPDOWN_OPTION);
            cy.get('[data-testid=assign-call-handler-checkbox]').should('have.length', 4);
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
            cy.get('[data-testid=call-type-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });

        it('does not let you assign calls if only a call type and assignment type are selected', () => {
            cy.get('[data-testid=call-type-checkbox]').first().click({ force: true });
            cy.get('[data-testid=assign-call-assigned-checkbox]').click({ force: true });
            cy.get('[data-testid=assign-call-assign_button]').click({ force: true });
            cy.get('[data-testid=assign-call-validation-error]').should('be.visible');
        });

        it('does not let you assign calls if only a call type and handlers are selected', () => {
            cy.get('[data-testid=call-type-checkbox]').first().click({ force: true });
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
