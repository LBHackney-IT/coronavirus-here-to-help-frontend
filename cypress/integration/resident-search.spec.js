describe('View resident lookup page', () => {
    it('User can view the title', () => {
        cy.visit(`http://localhost:3000/resident-search`);
        cy.get('h1').should('contain', 'Resident lookup');
    });
});

describe('Test for user input', () => {
    context('Postcode input field', () => {
        it('Checks that a postcode can be entered', () => {
            cy.visit(`http://localhost:3000/resident-search`);

            cy.get('input[name="postcode"]').type("E7 0DE");
            cy.get('input[name="postcode"]').invoke('val').should('not.be.empty');
            
        });

        it('Checks that the postcode is entered in the correct format', () => {
            cy.visit(`http://localhost:3000/resident-search`);

            cy.get('input[name="postcode"]').type("E7 0DE");
            cy.get('input[name="postcode"]').invoke('val').should('match', /^[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]?\s?[0-9][a-zA-Z]{1,2}/);
            cy.get('input[name="postcode"]').clear();

            cy.get('input[name="postcode"]').type("56F 715");
            cy.get('input[name="postcode"]').invoke('val').should('not.match', /^[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]?\s?[0-9][a-zA-Z]{1,2}/);
            cy.get('input[name="postcode"]').clear();
        });
    });
});

export {};