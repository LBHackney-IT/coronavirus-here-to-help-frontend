import { EUSS } from '../../../src/helpers/constants';
import { EUSS_User } from '../../support/commands';

beforeEach(() => {
    cy.login(EUSS_User);
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click({ force: true });
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
    cy.get('[data-testid=add-support-button]').click({ force: true });
});

context('When adding new EUSS help request and call completed is selected', () => {
    it('does not display self isolation help needs form and form can be submitted', () => {
        cy.server();
        cy.route('GET', '/api/proxy/help-types').as('getHelpTypes');
        cy.wait('@getHelpTypes', { timeout: 10000 });
        cy.get('[data-testid=call-type-radio-button]').eq(5).should('have.value', EUSS);
        cy.get('[data-testid=call-type-radio-button]').eq(5).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=self-isolation-needs]').should('not.exist');

        cy.get('[data-testid=call-direction-radio-button]').first().click({ force: true });
        cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });

        cy.get('[data-testid=callback-form-validation-error]').should('not.exist');
    });
    // it('does not display the messaging follow up options', () => {
    //     cy.server();
    //     cy.route('GET', '/api/proxy/help-types').as('getHelpTypes');
    //     cy.wait('@getHelpTypes', { timeout: 10000 });
    //     cy.get('[data-testid=call-type-radio-button]').eq(5).should('have.value', EUSS);
    //     cy.get('[data-testid=call-type-radio-button]').eq(5).click({ force: true });

    //     cy.get('[data-testid=send-email-checkbox]').should('not.exist');
    // });
});

context('When required fields are not filled in', () => {
    it('displays validation error if form is submitted with no inputs', () => {
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
        cy.url().should('match', /\/add-support/);
    });

    it('displays validation error when call completed but no follow up selected', () => {
        cy.server();
        cy.route('GET', '/api/proxy/help-types').as('getHelpTypes');
        cy.wait('@getHelpTypes', { timeout: 10000 });
        cy.get('[data-testid=call-type-radio-button]').eq(5).click({ force: true });
        cy.get('[data-testid=call-type-yes-radio-button]').click({ force: true });
        cy.get('[data-testid=yes-spoke-to-resident]').click({ force: true });
        cy.get('[data-testid=callback_complete-checkbox]').click({ force: true });
        cy.get('[data-testid=call-direction-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
    });
});

context('When a non-EUSS user is logged in', () => {
    it('does not display EUSS call type option', () => {
        cy.login();
        cy.server();
        cy.route('GET', '/api/proxy/help-types').as('getHelpTypes');
        cy.wait('@getHelpTypes', { timeout: 10000 });
        cy.get('[data-testid=call-type-radio-button]').last().should('not.have.value', EUSS);
        cy.get('[data-testid=call-type-radio-button]').should('not.contain.value', EUSS);
    });
});
