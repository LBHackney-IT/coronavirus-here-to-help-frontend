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

    it('Cancel button should route back to Callbacks list page', () => {
        navigateToReassignSingleCallPage(() => {
            cy.getBySel('cancel-button').click();
            cy.wait(500);
            cy.url().should('match', /\/callback-list$/);
        });
    });

    it('Assign button should route back to Callbacks list page', () => {
        navigateToReassignSingleCallPage((callHandler) => {
            cy.getBySel('call-handlers-dropdown').find(`option:not(:contains(${callHandler}))`).eq(0).invoke('val').then((newCH) => {
                cy.getBySel('call-handlers-dropdown').select(newCH);
                cy.getBySel('assign-button').click()
                cy.wait(500);
                cy.url().should('match', /\/callback-list$/);
            })
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

describe('Reassign Single Call page reassigns call handler on a callback', () => {
    it('Callback is reassigned to a different call handler and it\'s reflected on a callbacks list', () => {
        cy.visit(`http://localhost:3000/callback-list`).then(() => {
            cy.getBySel('call-handlers-dropdown').find('option').eq(4).invoke('val').then((callHandlerVal) => {     // Step 1: Select random call handler
                cy.getBySel('callbacks-table').find(`tbody > tr:has(a[title="${callHandlerVal}"])`).eq(0).invoke('attr', 'data-cy').then((row_id) => { // Step 2: Get the identifier of the 1st row (callback) that's assigned to a that call handler
                    cy.getBySel('callbacks-table').find(`tbody > tr:has(a[title="${callHandlerVal}"])`).eq(0).find(`td:has(a[title])`).find('a').click({force: true}); // Step 3: Click on link that leads to a Single reassign page for that callback (row)
                    cy.wait(500);   // wait for SR page to load
                    cy.getBySel('call-handlers-dropdown').find(`option:not(:contains(${callHandlerVal}))`).invoke('val').then((otherCallHandlerVal) => { // Step 4: Grab the 1st call handler from the dropdown that is not the call handler from Step 1
                        cy.getBySel('call-handlers-dropdown').select(otherCallHandlerVal); // Select this other call handler from the dropdown (to reassign the callback to)
                        cy.getBySel('assign-button').click(); // Click "Assign" button
                        cy.wait(1000); // Wait for the callbacks list to load again
                        cy.getBySel(row_id).find('td:has(a[title])').find('a').invoke('attr', 'title').should('eq', otherCallHandlerVal); // Find the callback (row) we edited via identifier from Step 2, and assert whether the displayed assigned call handler matches the other call handler we selected on Step 4
                    });
                });
            });
        });
    });
});
