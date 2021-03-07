describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Cristian Baciu',
      username: 'baciuness',
      password: 'aloha',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
    cy.contains('Login to application');
    cy.contains('Username');
    cy.contains('Password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('baciuness');
      cy.get('#password').type('aloha');
      cy.get('#login-button').click();

      cy.get('.notification').should('contain', 'Logged in!');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('moldovaness');
      cy.get('#password').type('saymyname');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'baciuness',
        password: 'aloha',
      });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('My Resume');
      cy.get('#author').type('Cristian Baciu');
      cy.get('#url').type('https://baciucristian.github.io/resume/');
      cy.get('button').contains('Create').click();

      cy.get('.notification').contains('Blog created successfully!');
      cy.contains('My Resume');
      cy.contains('Cristian Baciu');
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('My Resume');
      cy.get('#author').type('Cristian Baciu');
      cy.get('#url').type('https://baciucristian.github.io/resume/');
      cy.get('button').contains('Create').click();

      cy.get('.notification').contains('Blog created successfully!');
      cy.contains('My Resume');
      cy.contains('Cristian Baciu');
    });

    describe.only('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'author1',
          url: 'blog1.com',
        });
      });

      it('it can be liked', function () {
        cy.contains('first blog').contains('view').click();
        cy.get('.togglableContent').contains('like').click();
        cy.get('.togglableContent').contains('likes 1');
      });
    });
  });
});
