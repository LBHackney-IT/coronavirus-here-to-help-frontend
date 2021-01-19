beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
});

describe('As a call handler, I want to search for a resident by postcode', () => {
    context('From the start page', () => {
        it('User clicks the "Go" button to get to the Resident lookup page', () => {
            cy.get('a').contains('Go').eq(0).click();
        });
    });

    context('On the Resident lookup page', () => {
        it('User enters a postcode in the "Postcode" input field', () => {
            cy.visit(`http://localhost:3000/resident-search`);
            cy.get('input[name="postcode"]').type("E7 0DE");
        });

        it('User clicks "Search" and is redirected to a list of residents matching the search', () => {
            cy.contains('Search').click();
            cy.on("url:changed", (newUrl) => {
                expect(newUrl).to.contain("residents-list");
            });
            // cy.get('h1').should('contain', 'Search results'); 
        });
    });
});

export {};