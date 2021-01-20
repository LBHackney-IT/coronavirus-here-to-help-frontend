describe('Callbacks list page displays and maps data correctly', () => {
    it('Callbacks are retrieved and mapped to table rows', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('callbacks-table').find('tbody > tr').its('length').should('be.gte', 0)
    });
    it('Help types are mapped to help case type dropdown options', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('help-type-dropdown').find('option').its('length').should('be.gte', 1) // 1st item is default
    });
    it('Call handlers are mapped to call handlers dropdown options', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('call-handlers-dropdown').find('option').its('length').should('be.gte', 1) // 1st item is default
    });
    it('Dropdowns have correct default values', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('help-type-dropdown').find('option').eq(0).should('have.text', 'All');
        cy.getBySel('call-handlers-dropdown').find('option').eq(0).should('have.text', 'Assigned to all');
    });
});

describe('Callbacks list page filters callbacks correctly', () => {
    it('Upon selecting Help Case Type dropdown value, callbacks get filtered by that value', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('callbacks-table').find('tr').find('td:has(span:contains("Welfare"))').its('length').then((size) => {
            cy.getBySel('help-type-dropdown').select('Welfare');
            cy.wait(1000);
            cy.getBySel('callbacks-table').find('tbody > tr').its('length').should('eq', size);
         });
    });

    it('Upon selecting Call Handlers dropdown value, callbacks get filtered by that value', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('call-handlers-dropdown').find('option').eq(4).invoke('val').then((callHandlerVal) => {
            cy.getBySel('callbacks-table').find('tr').find(`td:has(a[title="${callHandlerVal}"])`).its('length').then((size) => {
                cy.getBySel('call-handlers-dropdown').select(callHandlerVal);
                cy.wait(1000);
                cy.getBySel('callbacks-table').find('tbody > tr').its('length').should('eq', size);
             });
        })
    });
});

describe('Navigating Away from Callbacks list page', () => {
    it('Callbacks are retrieved and mapped to table rows', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('callbacks-table').find('tbody > tr').find('td:has(a:contains("View"))').eq(0).find('a').click({force: true});
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
    });
});