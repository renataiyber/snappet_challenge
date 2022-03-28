Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Snappet', () => {

    beforeEach(() => {
        cy.visit('https://teacher.snappet.org')

        cy.log('Verify Log In')

        cy
            .get('#Input_Username')
            .type(Cypress.env('username'))
            .should('have.value', 'TechChallengeTeacher')

        cy
            .get('#password-input')
            .type(Cypress.env('password'))
            .should('have.value', 'P@ssw0rd')

        cy
            .get('button[type=submit]')
            .click()

        cy.log('Check redirection to Teacher Dashboard')
        cy
            .url()
            .should('include', 'teach')

        cy.log('Check that Teach icon is active')
        cy
            .get('.teach.is-active.active', {timeout: 10000})

    });

    after(() => {
        cy.log('Log Out')
        cy
            .get('.btn-submenu')
            .click()
        cy
            .contains('Log out', {timeout: 10000})
            .click()

        cy
            .url()
            .should('include', 'Logout')
        cy
            .get('#logoutButton')
            .click()
    });

    it('Create Project on Teacher Dashboard', () => {

        cy.log('Open drop down')
        cy
            .get('subject-dropdown[data-test-id="subject-group-dropdown"]')
            .click()

        cy.log('Trigger Create subject')
        cy
            .get('add-subject-button')
            .click()

        cy.log('Start subject creation')
        cy
            .get('.inner.modal', {timeout: 10000})
            .wait(1000)
            .contains('Which subject do you want to activate?')

        cy
            .get('a.btn.btn-primary', {timeout: 10000})
            .contains('Next')
            .click()

        cy
            .get('a.btn.btn-primary', {timeout: 10000})
            .contains('Next')
            .click()

        cy.log('Select First suggestion')
        cy
            .get(':nth-child(1) > .card', {timeout: 10000})
            .click()

        cy.log('Set subject name')
        cy
            .get('input')
            .clear()
            .type('Testing Subject')
            .should('have.value', 'Testing Subject')

        cy.log('Activate subject')
        cy
            .get('button.btn.btn-primary', {timeout: 10000})
            .contains('Activate subject')
            .click()

        cy.log('Verify that subject was created')
        cy
            .contains('.panel-card.alternate', 'Testing Subject', {timeout: 10000})
    })


    it('Edit Project on Teacher Dashboard', () => {

        cy.log('Open drop down')
        cy
            .get('subject-dropdown[data-test-id="subject-group-dropdown"]')
            .click()

        cy.log('Trigger Edit subject')
        cy
            .contains('a[data-test-id="subject-group-option"]', 'Testing Subject', {timeout: 10000})
            .find('.manage-icon')
            .click();

        cy.log('Verify that Edit form is opened')

        cy
            .get('input', {timeout: 10000})
            .clear()
            .type('Renamed Subject')
            .should('have.value', 'Renamed Subject')

        cy
            .get('select')
            .select('Groep 3', {force: true})

        cy.log('Save changes')
        cy
            .contains('button.btn.btn-primary', 'Save', {timeout: 10000})
            .click()

        cy
            .contains('Subject changes have been saved', {timeout: 10000})
        cy
            .contains('.panel-card.alternate', 'Renamed Subject', {timeout: 10000})

    })

    it('Delete Project on Teacher Dashboard', () => {

        cy.log('Open drop down')
        cy
            .get('subject-dropdown[data-test-id="subject-group-dropdown"]')
            .click()

        cy.log('Trigger Edit subject')
        cy
            .contains('a[data-test-id="subject-group-option"]', 'Renamed Subject', {timeout: 10000})
            .find('.manage-icon')
            .click();

        cy.log('Delete changes')

        cy
            .get('button.btn.btn-txt.btn-txt-delete')
            .click()

        cy
            .contains('button.btn.btn-primary', 'Remove', {timeout: 10000})
            .click()

        cy
            .contains('The subject has been deactivated.', {timeout: 10000})

        cy
            .contains('.panel-card.alternate', 'Renamed Subject', {timeout: 10000})
            .should('not.exist')

    })
})
