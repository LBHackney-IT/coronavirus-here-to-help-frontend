describe('Reassign single call page navigation', () => {
    // Not an amazing test, but it essentially shows that the page successfully took parameters from url
    // and used them to make an api call to get help request. Except for the case, where the assignee is the first one on the list
    // could get improved by including empty value at the front of CH array.
    it('After page reload, page fetches Help request and sets its assignee correctly', () => {
        cy.visit(`http://localhost:3000/callback-list`).then(() => {
            cy.getBySel('call-handlers-dropdown').find('option').eq(4).invoke('val').then((callHandlerVal) => {
                cy.getBySel('callbacks-table').find(`tbody > tr:has(a[title="${callHandlerVal}"])`)
                .eq(0).find(`td:has(a[title])`).find('a').click({force: true});
                cy.wait(500);
                cy.reload(true).then(() => {
                    cy.getBySel('call-handlers-dropdown').invoke('val').should('eq', callHandler);
                });
            });
        });
    });
});

