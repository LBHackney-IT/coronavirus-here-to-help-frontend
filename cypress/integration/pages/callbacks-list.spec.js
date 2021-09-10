beforeEach(() => {
    cy.login();
    cy.setIntercepts();
});

describe('Callbacks list page displays and maps data correctly', () => {
    it('Callbacks are retrieved and mapped to table rows', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', 6);
    });

    it('Help types are mapped to help case type dropdown options', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=help-type-dropdown]').find('option').should('have.length', 5);
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
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '6');
        cy.get('[data-testid=help-type-dropdown]').select('Self Isolation');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
        cy.get('[data-testid=help-type-dropdown]').select('Help Request');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '3');
    });

    it('Upon selecting Call Handlers dropdown value, callbacks get filtered by that value', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '6');
        cy.get('[data-testid=call-handlers-dropdown]').select('Person A');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '2');
        cy.get('[data-testid=call-handlers-dropdown]').select('Person B');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '3');
    });

    it('Upon typing into CTAS filter text input, callbacks get filtered by that value', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=ctasid-filter]').type('ex');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '2');
        cy.get('[data-testid=ctasid-filter]').type('o');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
        cy.get('[data-testid=ctasid-filter]').type('dia ');
        cy.get('[data-testid=callbacks-table_row]').should('have.length', '1');
    });
});

describe('Navigating Away from Callbacks list page', () => {
    it('can link to a helpcase-profile', () => {
        cy.visit('/callback-list');
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
    });
});
