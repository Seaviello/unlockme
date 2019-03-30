describe('Application', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should be properly set up', () => {
        cy.get('[data-test-id="app-bar"]').should('be.visible');
        cy.get('[data-test-id="app-bar-menu-button"]').should('be.visible');
        cy.get('[data-test-id="content"]').should('be.visible');
        cy.get('[data-test-id="side-bar"]').should('not.be.visible');
    });
    it('should open menu with proper links', () => {
        cy.get('[data-test-id="app-bar-menu-button"]').click();
        cy.get('[data-test-id="side-bar"]').should('be.visible');
        const links = cy.get('[data-test-id="side-bar-link"]');
        links.should('have.length', 4);
        links.eq(0).should('contain', 'Dashboard');
        links.eq(1).should('contain', 'Users');
        links.eq(2).should('contain', 'Locks');
        links.eq(3).should('contain', 'Event logs');
    });
});
