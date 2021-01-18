beforeEach(() => {
    cy.visit(`http://localhost:3000/resident-search`);
});

describe('View resident lookup page', () => {
    it('User can view the title', () => {
        cy.get('h1').should('contain', 'Resident lookup');
    });
});

describe('Test for user input', () => {
    context('Postcode input field', () => {
        it('Checks that a postcode can be entered', () => {
            cy.get('input[name="postcode"]').type("E7 0DE");
            cy.get('input[name="postcode"]').invoke('val').should('not.be.empty');
            
        });

        it('Checks that the postcode is entered in the correct format', () => {
            cy.get('input[name="postcode"]').type("E7 0DE");
            cy.get('input[name="postcode"]').invoke('val').should('match', /^[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]?\s?[0-9][a-zA-Z]{1,2}/);
            cy.get('input[name="postcode"]').clear();

            cy.get('input[name="postcode"]').type("56F 715");
            cy.get('input[name="postcode"]').invoke('val').should('not.match', /^[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]?\s?[0-9][a-zA-Z]{1,2}/);
            cy.get('input[name="postcode"]').clear();
        });
    });

    context('First name input field', () => {
        it('Checks that a name can be entered in either field', () => {
            cy.get('input[name="firstName"]').type("Joseph");
            cy.get('input[name="firstName"]').invoke('val').should('contain', "Joseph");
            cy.get('input[name="firstName"]').clear();

            cy.get('input[name="firstName"]').type("Mary");
            cy.get('input[name="firstName"]').invoke('val').should('contain', "Mary");
            cy.get('input[name="firstName"]').clear();
        });

        it('Checks that the first name is entered in the correct format', () => {
            cy.get('input[name="firstName"]').type("Joseph");
            cy.get('input[name="firstName"]').invoke('val').should('match', /^[a-zA-Z]{1,50}$/);
            cy.get('input[name="firstName"]').clear();

            cy.get('input[name="firstName"]').type("J@m£s");
            cy.get('input[name="firstName"]').invoke('val').should('not.match', /^[a-zA-Z]{1,50}$/);
            cy.get('input[name="firstName"]').clear();
        });
    });

    context('Last name input field', () => {
        it('Checks that a name can be entered in the last name field', () => {
            cy.get('input[name="lastName"]').type("Joseph");
            cy.get('input[name="lastName"]').invoke('val').should('contain', "Joseph");
            cy.get('input[name="lastName"]').clear();

            cy.get('input[name="lastName"]').type("Mary");
            cy.get('input[name="lastName"]').invoke('val').should('contain', "Mary");
            cy.get('input[name="lastName"]').clear();
        });

        it('Checks that the last name is entered in the correct format', () => {
            cy.get('input[name="lastName"]').type("Joseph");
            cy.get('input[name="lastName"]').invoke('val').should('match', /^[a-zA-Z]{1,50}$/);
            cy.get('input[name="lastName"]').clear();

            cy.get('input[name="lastName"]').type("J@m£s");
            cy.get('input[name="lastName"]').invoke('val').should('not.match', /^[a-zA-Z]{1,50}$/);
            cy.get('input[name="lastName"]').clear();
        });
    });
});

export {};