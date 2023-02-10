import { EUSS } from '../../../src/helpers/constants';
import { EUSS_User } from '../../support/commands';
import { formatSubText } from '../../../src/helpers/formatter';

beforeEach(() => {
    cy.login();
    cy.setIntercepts();
});

describe('Callbacks list page displays and maps data correctly', () => {
    it('Callbacks are retrieved and mapped to table rows', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').select('All');
        cy.get('[data-testid=call-handlers-dropdown]').select('Assigned to all');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', 8);
    });
    it('Shows subtypes correctly', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=callbacks-table_row]').should(
            'contain',
            formatSubText('Link Work', 'Repairs')
        );
    });

    it('Help types are mapped to help case type dropdown options', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').select('All');
        cy.get('[data-testid=call-handlers-dropdown]').select('Assigned to all');
        cy.get('[data-testid=help-type-dropdown]').find('option').should('have.length', 6);
    });

    it('Displays EUSS filter when logged in as an EUSS user', () => {
        cy.login(EUSS_User);
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').find('option').should('have.length', 7);
    });

    it('Call handlers are mapped to call handlers dropdown options', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=call-handlers-dropdown]')
            .find('option')
            .its('length')
            .should('be.gte', 1); // 1st item is default
    });

    it('Dropdowns have correct default values', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').find('option').first().should('contain', 'All');
        cy.get('[data-testid=call-handlers-dropdown]')
            .find('option')
            .first()
            .should('contain', 'Assigned to all');
    });
});

describe('Callbacks list page filters callbacks correctly', () => {
    it('Upon selecting Help Case Type dropdown value, callbacks get filtered by that value', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').select('All');
        cy.get('[data-testid=call-handlers-dropdown]').select('Assigned to all');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '8');
        cy.get('[data-testid=help-type-dropdown]').select('Self Isolation');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
        cy.get('[data-testid=help-type-dropdown]').select('Help Request');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '3');
        cy.get('[data-testid=help-type-dropdown]').select('Link Work');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
    });
    it('Allows filtering by EUSS when logged in as an EUSS user', () => {
        cy.login(EUSS_User);
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').select(EUSS);
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
    });

    it('Upon selecting Call Handlers dropdown value, callbacks get filtered by that value', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').select('All');
        cy.get('[data-testid=call-handlers-dropdown]').select('Assigned to all');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '8');
        cy.get('[data-testid=call-handlers-dropdown]').select('Person A');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '2');
        cy.get('[data-testid=call-handlers-dropdown]').select('Person B');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '5');
    });

    it('Upon typing into CTAS filter text input, callbacks get filtered by that value', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').select('All');
        cy.get('[data-testid=call-handlers-dropdown]').select('Assigned to all');

        // test of filtering correctness
        cy.get('[data-testid=ctasid-filter]').type('ex');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '2');
        // test if filtering while typing
        cy.get('[data-testid=ctasid-filter]').type('o');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
        // test of whitespace trimming
        cy.get('[data-testid=ctasid-filter]').type('dia ');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
    });
});

describe('Navigating Away from Callbacks list page', () => {
    it('can link to a helpcase-profile', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
        cy.wait(['@resident3', '@resident3helpRequests', '@resident3caseNotes']);
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
    });

    it('persists selected dropdowns', () => {
        cy.visit('/callback-list');

        // Select default dropdown options
        cy.get('[data-testid=help-type-dropdown]').select('All');
        cy.get('[data-testid=call-handlers-dropdown]').select('Assigned to all');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '8');

        // Change call handler
        cy.get('[data-testid=call-handlers-dropdown]').select('Person A');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '2');

        // Change call type
        cy.get('[data-testid=help-type-dropdown]').select('Contact Tracing');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');

        // Navigate away
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
        cy.url().should('match', /\/helpcase-profile\/\d+$/);

        // Navigate back
        cy.visit('/callback-list');

        // Check values persisted
        cy.get('[data-testid=call-handlers-dropdown]').should('have.value', 'Person A');
        cy.get('[data-testid=help-type-dropdown]').should('have.value', 'Contact Tracing');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
    });
});
