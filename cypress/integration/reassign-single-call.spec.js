beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit('/');
    cy.get('[data-testid=view-callback-list_button]').click();
});
describe('As a call handler I can reassign calls', () => {
    context('Reassign single call page navigation', () => {
        beforeEach(() => {
            cy.get('[data-testid=callbacks-table-assigned-to_link]').first().click({ force: true });
        });
        it('Back button should route back to Callbacks list page', () => {
            cy.get('[data-testid=reassign-call-back_button]').click({ force: true });
            cy.url().should('match', /\/callback-list$/);
        });

        it('Cancel button should route back to Callbacks list page', () => {
            cy.get('[data-testid=reassign-call-cancel_button]').click({ force: true });
            cy.url().should('match', /\/callback-list$/);
        });

        it('Assign button should route back to Callbacks list page', () => {
            cy.get('[data-testid=call-handlers-dropdown]').select('Person D');
            cy.get('[data-testid=reassign-call-assign_button]').click();
            cy.wait(500);
            cy.url().should('match', /\/callback-list$/);
        });
    });

    context('Reassign single call page displays and maps data correctly', () => {
        it('Call handlers are retrieved and mapped to dropdown options', () => {
            cy.get('[data-testid=callbacks-table-assigned-to_link]').first().click({ force: true });
            cy.get('[data-testid=reassign-call-handlers-dropdown]')
                .find('option')
                .should('have.length', 5);
        });

        it("Call handler dropdown's default value should match callback's assigned call handler", () => {
            cy.get('[data-testid=callbacks-table-assigned-to_link]')
                .first()
                .should('contain', 'PB')
                .click();
            cy.get('[data-testid=reassign-call-handlers-dropdown]')
                .invoke('val')
                .should('contain', 'Person B');
        });
    });

    context('Reassign Single Call page reassigns call handler on a callback', () => {
        xit("Callback is reassigned to a different call handler and it's reflected on a callbacks list", () => {
            cy.visit(`http://localhost:3000/callback-list`).then(() => {
                cy.getBySel('call-handlers-dropdown')
                    .find('option')
                    .eq(4)
                    .invoke('val')
                    .then((callHandlerVal) => {
                        // Step 1: Select random call handler
                        cy.getBySel('callbacks-table')
                            .find(`tbody > tr:has(a[title="${callHandlerVal}"])`)
                            .eq(0)
                            .invoke('attr', 'data-cy')
                            .then((row_id) => {
                                // Step 2: Get the identifier of the 1st row (callback) that's assigned to a that call handler
                                cy.getBySel('callbacks-table')
                                    .find(`tbody > tr:has(a[title="${callHandlerVal}"])`)
                                    .eq(0)
                                    .find(`td:has(a[title])`)
                                    .find('a')
                                    .click({ force: true }); // Step 3: Click on link that leads to a Single reassign page for that callback (row)
                                cy.wait(500); // wait for SR page to load
                                cy.getBySel('call-handlers-dropdown')
                                    .find(`option:not(:contains(${callHandlerVal}))`)
                                    .eq(1)
                                    .invoke('val')
                                    .then((otherCallHandlerVal) => {
                                        // Step 4: Grab the 1st call handler from the dropdown that is not the call handler from Step 1
                                        cy.getBySel('call-handlers-dropdown').select(
                                            otherCallHandlerVal
                                        ); // Select this other call handler from the dropdown (to reassign the callback to)
                                        cy.getBySel('assign-button').click(); // Click "Assign" button
                                        cy.wait(1000); // Wait for the callbacks list to load again
                                        cy.getBySel(row_id)
                                            .find('td:has(a[title])')
                                            .find('a')
                                            .invoke('attr', 'title')
                                            .should('eq', otherCallHandlerVal); // Find the callback (row) we edited via identifier from Step 2, and assert whether the displayed assigned call handler matches the other call handler we selected on Step 4
                                    });
                            });
                    });
            });
        });
    });
});
