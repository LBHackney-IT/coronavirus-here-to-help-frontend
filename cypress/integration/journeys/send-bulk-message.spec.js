import { values } from 'lodash';
import { EUSS, IS_EUSS_ENABLED } from '../../../src/helpers/constants';

beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
});

context('When sending bulk messages', () => {
    it('it returns to the dashboard once the messages have sent', () => {
        cy.get('[data-testid=admin_button]').click({ force: true });
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.get('[data-testid=select-dropdown]').select('Contact Tracing');
        cy.get('[data-testid=assigned-send-bulk-checkbox]').click({ force: true });
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.url().should('contain', `dashboard`);
    });
    if (IS_EUSS_ENABLED) {
        it('it allows bulk messages to be sent to EUSS cases when EUSS is enabled', () => {
            cy.get('[data-testid=admin_button]').click({ force: true });
            cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
            cy.get('[data-testid=select-dropdown]').find('option').should('have.length', 4);
            cy.get('[data-testid=select-dropdown]')
                .find('option')
                .last()
                .should('have.value', EUSS);
            cy.get('[data-testid=select-dropdown]').select(EUSS);
            cy.get('[data-testid=assigned-send-bulk-checkbox]').click({ force: true });
            cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
            cy.url().should('contain', `dashboard`);
        });
    }

    if (!IS_EUSS_ENABLED) {
        it('it hides the EUSS option when EUSS is not enabled', () => {
            cy.get('[data-testid=admin_button]').click({ force: true });
            cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
            cy.get('[data-testid=select-dropdown]').find('option').should('have.length', 3);
            cy.get('[data-testid=select-dropdown]')
                .find('option')
                .last()
                .should('not.have.value', EUSS);
        });
    }
});
