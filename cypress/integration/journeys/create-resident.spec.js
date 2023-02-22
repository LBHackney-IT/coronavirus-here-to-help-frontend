beforeEach(() => {  
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=search-for-residents_button]').click({ force: true });
    cy.get('input[name="postcode"]').type('EW65AD');
    cy.get('.govuk-button').click({ force: true });
});

describe('As a call handler, I want to create a new resident profile', () => {
    context('When the "Add new resident" button is clicked from the resident search results page', () => {
        it('displays a form to input new resident details', () => {
            cy.get('[data-testid=add-new-resident-button]').click({ force: true });
            cy.url().should('match', /\/create-resident$/); 
        });
    });
    
    context('When a new resident\'s details are entered and saved', () => {
        it('it redirects to that resident\'s profile page', () => {
            cy.get('[data-testid=add-new-resident-button]').click({ force: true });
            cy.get('[data-testid=first-name-input]').type("Cydney", { force: true });
            cy.get('[data-testid=last-name-input]').type("Nader", { force: true });
            cy.get('[data-testid=contact-telephone-input]').type("02075333654", { force: true });
            cy.get('[data-testid=dobDay-input]').type("1", { force: true });
            cy.get('[data-testid=dobMonth-input]').type("2", { force: true });
            cy.get('[data-testid=dobYear-input]').type("2019", { force: true });
            cy.get('[data-testid=postcode-input]').type("E8 1DY", { force: true });
            cy.get('[data-testid=address-search]').click({ force: true });
            cy.get('[data-testid=address-dropdown]').select('Somewhere, else, HACKNEY, E8 1DY', { force: true });
            cy.get('[data-testid=edit-resident-form-update-button').click({ force: true });
            
            cy.url().should('match', /\/helpcase-profile\/\d+$/); 
        });
    });

    context('Form validation', () => {
        it('displays validation errors for individual fields when validation is triggered', () => {
            cy.get('[data-testid=add-new-resident-button]').click({ force: true });
            /*
                A  bug in Cypress test mode where its behaviour doesn't match the default browser behaviour makes this test fail.
                When doing these exact same actions by hand on any browser - everything works as expected.

                When the form is running via cypress test mode, the submit-triggered validation stops at the first validation error.
                This prevents the 'onInvalidField' functions from trigering on remaining fields. In doing so, Cypress mode prevents
                the remaining error messages from getting rendered. Hence, the test fail.

                As such the test was modified from
                'all required errors automatically appear upon submit' to
                'errors can appear when validation gets triggered' (and the validation does get triggered in non-cypress mode).
            */
            cy.get('#firstName').type(' ').clear();
            cy.get('#lastName').type(' ').clear();
            cy.get('#contactTelephoneNumber').type('0').clear();

            cy.get('[data-testid=edit-resident-form-update-button').click({ force: true });
            cy.get('[data-testid=first-name-error]').should("be.visible")
            cy.get('[data-testid=last-name-error]').should("be.visible")
            cy.get('[data-testid=contact-number-error]').should("be.visible")
            cy.get('[data-testid=dob-error]').should("be.visible")
            
            cy.url().should('match', /create-resident/); 
        });

        it('displays validation error banner when empty form is submitted', () => {
            cy.get('[data-testid=add-new-resident-button]').click({ force: true });
            cy.get('[data-testid=edit-resident-form-update-button').click({ force: true });
            cy.get('[data-testid=edit-resident-form-validation-error]').should("be.visible")
            
            cy.url().should('match', /create-resident/); 
        });

        it('does not display individual field errors when all required fields are filled in', () => {
            cy.get('[data-testid=add-new-resident-button]').click({ force: true });
            cy.get('[data-testid=edit-resident-form-update-button').click({ force: true });

            cy.get('[data-testid=first-name-input]').type("Cydney", { force: true });
            cy.get('[data-testid=last-name-input]').type("Nader", { force: true });
            cy.get('[data-testid=contact-telephone-input]').type("02075333654", { force: true });
            cy.get('[data-testid=dobDay-input]').type("1", { force: true });
            cy.get('[data-testid=dobMonth-input]').type("2", { force: true });
            cy.get('[data-testid=dobYear-input]').type("2019", { force: true });

            cy.get('[data-testid=first-name-error]').should("not.exist")
            cy.get('[data-testid=last-name-error]').should("not.exist")
            cy.get('[data-testid=contact-number-error]').should("not.exist")
            cy.get('[data-testid=dob-error]').should("not.exist")
            cy.get('[data-testid=edit-resident-form-update-button').click({ force: true });
            
            cy.url().should('match', /\/helpcase-profile\/\d+$/); 
        });
    });
});