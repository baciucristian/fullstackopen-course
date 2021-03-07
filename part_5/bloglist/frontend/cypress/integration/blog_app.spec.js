describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Cristian Baciu',
      username: 'baciuness',
      password: 'aloha',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    const user2 = {
      name: 'Timoteo Pedreiro',
      username: 'ounicoctt',
      password: 'portugal',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
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

        cy.login({
          username: 'ounicoctt',
          password: 'portugal',
        });

        cy.createBlog({
          title: 'second blog',
          author: 'author2',
          url: 'blog2.com',
        });

        cy.createBlog({
          title: 'third blog',
          author: 'author3',
          url: 'blog3.com',
        });
      });

      it('it can be liked', function () {
        cy.contains('first blog').contains('view').click();
        cy.get('.togglableContent').contains('like').click();
        cy.get('.togglableContent').contains('likes 1');
      });

      it('it can be deleted by the user who created', function () {
        cy.contains('second blog').contains('view').click();
        cy.contains('second blog').parent().contains('delete').click();
        cy.get('body').should('not.contain', 'second blog');
      });

      it.only('are ordered by likes', function () {
        // add random number of likes
        let likesArray = [];
        cy.get('button:contains("view")')
          .then((buttons) => {
            cy.wrap(buttons).each((button) => {
              button.click();
              const randomNumber = Math.floor(Math.random() * 10);
              for (let i = 0; i < randomNumber; i++)
                cy.wrap(button).parent().parent().contains('like').click();
            });
          })
          .then((res) => {
            cy.get('.likes').then((blogsLikes) => {
              cy.wrap(blogsLikes).each((blogLikes) => {
                likesArray.push(blogLikes.text());
              });
            });
          });

        // check if array is sorted
        let isSorted = true;
        for (let j = 0; j < likesArray.length - 1; j++) {
          if (likesArray[j] > likesArray[j + 1]) {
            isSorted = false;
            break;
          }
        }
        console.log(isSorted);
        expect(isSorted).to.be.true;
      });
    });
  });
});
