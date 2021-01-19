describe('Callbacks list page displays callbacks table correctly', () => {
    it('Callbacks are retrieved and mapped to table rows', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.getBySel('callbacks-table').find('tr').its('length').should('be.gte', 1) // 1st row is thead
    });
});
