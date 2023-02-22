import { EUSS } from '../../../src/helpers/constants';
import { EUSS_User } from '../../support/commands';

beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
});

context('When sending bulk messages', () => {
    it('it returns to the dashboard once the messages have sent', () => {
        cy.get('[data-testid=admin_button]').click();
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.get('[data-testid=bulk-message-dropdown]').select('Contact Tracing');
        cy.get('[data-testid=assigned-send-bulk-checkbox]').click({ force: true });
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.url().should('contain', `dashboard`);
    });

    it('it allows bulk messages to be sent to EUSS cases when logged in as an EUSS user', () => {
        cy.login(EUSS_User);
        cy.get('[data-testid=admin_button]').click();
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.get('[data-testid=bulk-message-dropdown]').find('option').should('have.length', 5);
        cy.get('[data-testid=bulk-message-dropdown]').find('option').last().should('have.value', EUSS);
        cy.get('[data-testid=bulk-message-dropdown]').select(EUSS);
        cy.get('[data-testid=assigned-send-bulk-checkbox]').click({ force: true });
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.url().should('contain', `dashboard`);
    });

    it('it hides the EUSS option when not logged in as an EUSS user', () => {
        cy.get('[data-testid=admin_button]').click();
        cy.get('[data-testid=send-bulk-message_button]').click({ force: true });
        cy.get('[data-testid=bulk-message-dropdown]').find('option').should('have.length', 4);
        cy.get('[data-testid=bulk-message-dropdown]')
            .find('option')
            .last()
            .should('not.have.value', EUSS);
    });
});
