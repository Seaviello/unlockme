describe('Locks', () => {
    describe('page initialization', () => {
        it('should redirect from menu', () => {
            cy.visit('/');
            cy.get('[data-test-id="app-bar-menu-button"]').click();
            cy.get('[data-test-id="side-bar-link"]')
                .contains('Locks')
                .click();
            cy.url().should('contain', '/locks');
        });

        it('should be properly populated', () => {
            cy.visit('/locks');
            const locks = cy.get('[data-test-id="lock-card"]');
            locks.should('have.length', 3);
            cy.get('[data-test-lock-name="Las Vegas"]').should('be.visible');
        });
    });

    describe('lock button', () => {
        beforeEach(() => {
            cy.visit('/locks');
            cy.get('[data-test-lock-name="Las Vegas"]').as('lock');
        });
        it('should handle opening', () => {
            cy.get('@lock').should('have.attr', 'data-test-lock-status', 'CLOSED');
            cy.get('@lock')
                .find('[data-test-id="lock-toggle-button"]')
                .click();
            cy.get('@lock').should('have.attr', 'data-test-lock-status', 'OPENED');
        });
    });
});
