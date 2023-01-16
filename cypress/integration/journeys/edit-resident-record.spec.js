beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
});
describe;
context('When you view a helpcase profile', () => {
    it('it allows you to edit the resident bio', () => {
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.url().should('match', /\/editresident/);
    });
});

context('When required fields are not filled in', () => {
    it('displays validation error when first name is missing', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.wait('@resident3');
        cy.get('[data-testid=first-name-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('exist')
        cy.get('[data-testid=first-name-error]').should("exist")
    });

    it('displays validation error when last name is missing', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.wait('@resident3');
        cy.get('[data-testid=last-name-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('exist')
        cy.get('[data-testid=last-name-error]').should("exist")
    });

    it('displays validation error when contact telephone number is missing', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.wait('@resident3');
        cy.get('[data-testid=contact-telephone-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('exist')
        cy.get('[data-testid=contact-number-error]').should("exist")
    });

    it('displays validation error when date of birth is missing', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        // The ".type('{selectall}{backspace}')" is a workaround for cypress ".clear()" buggy behaviour.
        cy.get('[data-testid=dobDay-input]').type('{selectall}{backspace}');
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('exist');
        cy.get('[data-testid=dob-error]').should("exist");
        cy.get('[data-testid=dobDay-input]').type("12", {force: true});

        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=dobMonth-input]').type('{selectall}{backspace}');
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('exist');
        cy.get('[data-testid=dob-error]').should("exist");
        cy.get('[data-testid=dobMonth-input]').type("12", {force: true});

        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=dobYear-input]').type('{selectall}{backspace}');
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('exist');
        cy.get('[data-testid=dob-error]').should("exist");
    });

    context('When an address search is made by postcode', () => {
        it('it populates the address field when an address is selected from the dropdown', () => {        
            cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
    
            cy.get('[data-testid=postcode-input]').type("E8 1DY", { force: true });
            cy.get('[data-testid=address-search]').click({ force: true });
            cy.get('[data-testid=address-dropdown]').select('Somewhere, over the rainbow, HACKNEY, E8 1DY', { force: true })
    
            cy.get('[data-testid=first-line-address-value]').should('have.value', "Somewhere")
            cy.get('[data-testid=second-line-address-value]').should('have.value', "over the rainbow")
            cy.get('[data-testid=third-line-address-value]').should('have.value', "HACKNEY")
            cy.get('[data-testid=postcode-address-value]').should('have.value', "E8 1DY")
        });
    });
});
