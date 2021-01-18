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
    });
});

export {};