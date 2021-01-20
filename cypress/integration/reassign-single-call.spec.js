function navigateToReassignSingleCallPage(f) {
    return cy.visit(`http://localhost:3000/callback-list`).then(() => {
        cy.getBySel('call-handlers-dropdown').find('option').eq(4).invoke('val').then((callHandlerVal) => {
            cy.getBySel('callbacks-table').find(`tbody > tr:has(a[title="${callHandlerVal}"])`)
            .eq(0).find(`td:has(a[title])`).find('a').click({force: true});
            cy.wait(1500);
            f(callHandlerVal);
        })
    });
}

describe('Reassign single call page navigation', () => {
    // Not an amazing test, but it essentially shows that the page successfully took parameters from url
    // and used them to make an api call to get help request. Except for the case, where the assignee is the first one on the list
    // could get improved by including empty value at the front of CH array.
    it('After page reload, page fetches Help request and sets its assignee correctly', () => {
        navigateToReassignSingleCallPage((callHandler) => {
            cy.reload(true).then(() => {
                cy.getBySel('call-handlers-dropdown').invoke('val').should('eq', callHandler);
            });
        });
    });

    it('Back button should route back to Callbacks list page', () => {
       navigateToReassignSingleCallPage(() => {
           cy.getBySel('back-button').click({force: true});
           cy.wait(500);
           cy.url().should('match', /\/callback-list$/);
       });
    });

    it('Back button should route back to Callbacks list page', () => {
        navigateToReassignSingleCallPage(() => {
            cy.getBySel('cancel-button').click();
            cy.wait(500);
            cy.url().should('match', /\/callback-list$/);
        });
     });

});

describe('Reassign single call page displays and maps data correctly', () => {
    it('Call handlers are retrieved and mapped to dropdown options', () => {
        navigateToReassignSingleCallPage(() => {
            cy.getBySel('call-handlers-dropdown').find('option').its('length').should('be.gte', 0)
        });
    });

    it('Call handler dropdown\'s default value should match callback\'s assigned call handler', () => {
        navigateToReassignSingleCallPage((callHandlerVal) => {
            cy.getBySel('call-handlers-dropdown').invoke('val').should('eq', callHandlerVal);
        });    
    });
});

