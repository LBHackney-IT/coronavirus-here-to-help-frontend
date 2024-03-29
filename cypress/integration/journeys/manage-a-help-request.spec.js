import { HELP_TYPE } from '../../../src/helpers/constants';
import { EUSS_User } from '../../support/commands';

beforeEach(() => {
    cy.login(EUSS_User);
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.wait(['@callbacksList', '@callHandlers']);
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
    cy.wait(['@resident3', '@resident3helpRequests', '@resident3caseNotes']);
});

context('When you view a helpcase profile', () => {
    it('it allows you to naviagte to the manage request page', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.url().should('match', /\/manage-request/);
    });

    it('it displays the call history', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=call-history-entry]').should('have.length', 2);
        cy.get('[data-testid=call-history-entry]')
            .first()
            .should('contain', '2021-01-26 15:12 by handler');
        cy.get('[data-testid=call-history-entry]')
            .first()
            .should('contain', 'outbound Self Isolation Call: Callback complete');
    });
    it('it displays the case notes', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=case-note-entry]').should('have.length', 1);
        cy.get('[data-testid=case-note-entry]')
            .first()
            .should('contain', '020-09-10 08:53 by Professor Umbridge');
        cy.get('[data-testid=case-note-entry]').first().should('contain', 'Contact Tracing:');
        cy.get('[data-testid=case-note-entry]').first().should('contain', 'CREATED');
    });

    // not EUSS
    it('displays the email preview', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=send-email-checkbox]').click({ force: true });
        cy.get('[data-testid=send-email-preview]').should('contain', 'email preview');
    });

    it('displays the text preview if it exists', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=send-text-checkbox]').click({ force: true });
        cy.get('[data-testid=send-text-preview]').should('contain', 'text preview');
    });

    // EUSS
    it('displays the EUSS email preview', () => {
        cy.get('[data-testid=back-to-callbacks-list]').click({ force: true });
        cy.wait('@callbacksList');
        cy.get('[data-testid=help-type-dropdown]').select(HELP_TYPE.EUSS);
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });

        cy.wait(['@resident3', '@resident3caseNotes', '@resident3helpRequests', '@callHandlers']);

        cy.get('[data-testid=support-requested-table]')
            .find(`tr:has(td:contains("${HELP_TYPE.EUSS}"))`)
            .find('a:contains("View")')
            .click({ force: true });

        cy.get('[data-testid=send-email-checkbox]').click({ force: true });
        cy.get('[data-testid=send-email-preview]').should('contain', 'EUSS Email Pre Call');
    });

    it('displays the EUSS text preview', () => {
        cy.get('[data-testid=back-to-callbacks-list]').click({ force: true });
        cy.wait('@callbacksList');
        cy.get('[data-testid=help-type-dropdown]').select(HELP_TYPE.EUSS);
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });

        cy.wait(['@resident3', '@resident3caseNotes', '@resident3helpRequests', '@callHandlers']);

        cy.get('[data-testid=support-requested-table]')
            .find(`tr:has(td:contains("${HELP_TYPE.EUSS}"))`)
            .find('a:contains("View")')
            .click({ force: true });

        cy.get('[data-testid=send-text-checkbox]').click({ force: true });
        cy.get('[data-testid=send-text-preview]').should(
            'contain',
            'EUSS Text Pharaoh GX no answer'
        );
    });
});

context('When viewing a single help request', () => {
    it('it displays help request metadata', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('.govuk-caption-l').should('have.length', 2);
        cy.get('[data-testid=ctas-id]').first().should('contain', 'CTAS ID: 123abc');
        cy.get('[data-testid=metadata]').last().should('contain', 'Date tested: 02/02/2020');
    });

    it('it displays help request type', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=help-type]').should('contain', 'Contact Tracing');
    });

    context('When managing other type of help request', () => {
        it('it does not display the cev help needs form', () => {
            cy.get('[data-testid=support-requested-table-view_link-0]')
                .contains('View')
                .click({ force: true });
            cy.get('[data-testid=cev-help-needs]').should('not.exist');
        });
        it('it does not display the cev help needs form', () => {
            cy.get('[data-testid=support-requested-table-view_link-1]')
                .contains('View')
                .click({ force: true });
            cy.get('[data-testid=cev-help-needs]').should('not.exist');
        });
        it('it does not display the cev help needs form', () => {
            cy.get('[data-testid=support-requested-table-view_link-5]')
                .contains('View')
                .click({ force: true });
            cy.get('[data-testid=cev-help-needs]').should('exist');
        });
    });
});

context('When required fields are not filled in', () => {
    it('it displays validation error', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });

        cy.wait(['@resident3', '@helpRequest12caseNotes', '@helpRequest12']);

        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');

        cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('be.visible');
    });
});

context('When required fields are filled in', () => {
    it('it redirects to the resident page', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });

        cy.wait(['@resident3', '@helpRequest12caseNotes', '@helpRequest12']);

        cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
    
        cy.get('[data-testid=callback-form-validation-error]').should('not.exist');
        cy.url().should('match', /\/helpcase-profile/);
    });
});

context('When add support gets cancelled', () => {
    it('it returns to the resident page', () => {
        cy.get('[data-testid=support-requested-table-view_link-0]')
            .contains('View')
            .click({ force: true });

        cy.wait(['@resident3', '@helpRequest12caseNotes', '@helpRequest12']);

        cy.get('[data-testid=callback-form-cancel_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('not.exist');
        cy.url().should('match', /\/helpcase-profile/);
    });
});

context('When opening an existing cev help request', () => {
    it('the cev radio button should be pre-selected and the cev help needs form is visible', () => {
        cy.get('[data-testid=support-requested-table]')
            .find(`tbody > tr:contains("CEV")`)
            .eq(0)
            .find(`td:has(a:contains(View))`)
            .find('a')
            .click({ force: true });
        cy.get('[data-testid=cev-help-needs]').should('exist');
        cy.get('[data-testid=cev-help-needs]').should('be.visible');
    });

    it('the cev support needed fields are retrieved and represented correctly in the checkboxes', () => {
        cy.get('[data-testid=support-requested-table]')
            .find(`tbody > tr:contains("CEV")`)
            .eq(0)
            .find(`td:has(a:contains(View))`)
            .find('a')
            .click({ force: true });
        cy.get('[data-testid=cev-help-needs]')
            .find('input[type="checkbox"]')
            .eq(0)
            .should('be.checked');
        cy.get('[data-testid=cev-help-needs]')
            .find('input[type="checkbox"]')
            .eq(1)
            .should('be.checked');
        cy.get('[data-testid=cev-help-needs]')
            .find('input[type="checkbox"]')
            .eq(3)
            .should('be.checked');
        cy.get('[data-testid=cev-help-needs]')
            .find('input[type="checkbox"]')
            .eq(2)
            .should('not.be.checked');
        cy.get('[data-testid=cev-help-needs]')
            .find('input[type="checkbox"]')
            .eq(4)
            .should('not.be.checked');
        cy.get('[data-testid=cev-help-needs]')
            .find('input[type="checkbox"]')
            .eq(5)
            .should('not.be.checked');
    });
});

context('When opening a non-cev help request', () => {
    it('it does not display the cev help needs form', () => {
        cy.get('[data-testid=support-requested-table]')
            .find(`tbody > tr:contains("Contact Tracing")`)
            .eq(0)
            .find(`td:has(a:contains(View))`)
            .find('a')
            .click({ force: true });

        cy.get('[data-testid=cev-help-needs]').should('not.exist');
    });

    it('it does not display cev help needs checkbox form', () => {
        cy.get('[data-testid=support-requested-table]')
            .find(`tbody > tr:contains("Help Request")`)
            .eq(0)
            .find(`td:has(a:contains(View))`)
            .find('a')
            .click({ force: true });

        cy.get('[data-testid=cev-help-needs]').should('not.exist');
    });
});

context('When opening a Link Work (Repairs) request', () => {
    it('it does displays Link Work (Repairs) in the title, call history and case notes', () => {
        cy.get('[data-testid=support-requested-table-view_link-6]')
            .contains('View')
            .click({ force: true });
        cy.get('[data-testid=help-type]').should('contain', 'Link Work (Repairs)');
        cy.get('[data-testid=call-history-entry]').should('have.length', 1);
        cy.get('[data-testid=call-history-entry]')
            .first()
            .should('contain', '2021-01-14 07:36 by Homer Simpson');
        cy.get('[data-testid=call-history-entry]')
            .first()
            .should('contain', 'outbound Link Work (Repairs): Callback complete');
        cy.get('[data-testid=case-note-entry]').should('have.length', 1);
        cy.get('[data-testid=case-note-entry]')
            .first()
            .should('contain', '2021-09-12 10:53 by Harry Potter');
        cy.get('[data-testid=case-note-entry]').first().should('contain', 'Link Work (Repairs):');
        cy.get('[data-testid=case-note-entry]').first().should('contain', 'CREATED');
    });
});
