describe('Spotify Album Catalog - UI Flow', () => {

  it('should load the homepage correctly', () => {
    cy.visit('/');
    cy.get('[data-cy="title"]').should('be.visible').and('include.text', 'Spotify');
  });

  it('should have a search bar visible on top', () => {
    cy.visit('/');
    cy.get('[data-cy="search-input"]').should('be.visible');
  });

  it('renders the header logo with the right text', () => {
    cy.visit('/');
    cy.get('[data-cy="spotify-logo"]').should('be.visible').and('contain.text', 'Spotify');
  });

  it('should display multiple albums on the main page', () => {
    cy.visit('/');
    cy.get('[data-cy="album-card"]').should('have.length.gte', 3);
  });

  it('album cards should include a title and an author link', () => {
    cy.visit('/');
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-title"]').should('exist').and('not.be.empty');
      cy.get('a[href^="/author/"]').should('have.attr', 'href');
    });
  });

  it('each album includes a visible detail button', () => {
    cy.visit('/');
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.contains('a', 'Detail').should('be.visible');
    });
  });

  it('shows a footer at the bottom', () => {
    cy.visit('/');
    cy.get('[data-cy="footer"]').should('be.visible');
  });

  it('navigates to an author page and shows their info', () => {
    cy.visit('/');
    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('a[href^="/author/"]').first().invoke('text').then((name) => {
        cy.wrap(name.trim()).as('artistName');
        cy.get('a[href^="/author/"]').first().click();
      });
    });

    cy.location('pathname').should('match', /^\/author\/\d+/);

    cy.get('@artistName').then((artistName) => {
      cy.contains('Name:').should('include.text', String(artistName));
    });

    cy.contains('Albums:').parent().find('ul').should('exist');
  });

});

