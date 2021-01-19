describe('Callbacks list page displays callbacks table correctly', () => {
    it('Callbacks are retrieved and mapped to table rows', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('callbacks-table').find('tr').its('length').should('be.gte', 1) // 1st row is thead
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
});