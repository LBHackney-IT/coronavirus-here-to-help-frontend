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
        cy.get('[data-testid=first-name-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')
    });

    it('displays validation error when last name is missing', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=last-name-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')
    });

    it('displays validation error when contact telephone number is missing', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=contact-telephone-input]').clear();
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')
    });

    it('displays validation error when date of birth is missing', () => {
        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=dobDay-input]').clear({ force: true });
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')
        cy.get('[data-testid=dobDay-input]').type("12", {force: true});

        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=dobMonth-input]').clear({ force: true });
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible');
        cy.get('[data-testid=dobMonth-input]').type("12", {force: true});

        cy.get('[data-testid=edit-resident-bio-button]').click({ force: true });
        cy.get('[data-testid=dobYear-input]').clear({ force: true });
        cy.get('[data-testid=edit-resident-form-update-button]').click({ force: true });
        cy.get('[data-testid=edit-resident-form-validation-error]').should('be.visible')
    });
});
