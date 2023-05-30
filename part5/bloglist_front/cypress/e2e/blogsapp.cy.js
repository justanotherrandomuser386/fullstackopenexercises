describe('Blogs app', () => {
  
  beforeEach(function() {
    cy.request('POST', '/api/testing/reset')
    const user = {
      name: 'Matti Luukkainnen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST',`/api/users` , user)
    const user1 = {
      name: 'Lukki Maattiannen',
      username: 'lmuukkai',
      password: 'salainen'
    }
    cy.request('POST',`/api/users` , user1)
    
    cy.visit('/')
  })

  it('can open homepage', () => {
    cy.contains('show login').click()
    cy.contains('Blogs')

  })

  describe('Login', function() {
    it('fails with wrong credentials', function() {
      cy.get('#showLogin').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('wrong')
      cy.get('#login').click()
      cy.contains('invalid username or password')
    })
   

    it('succeeds with correct credentials', function() {
      cy.get('#showLogin').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login').click()
      cy.contains('Matti Luukkainnen logged in')
    })

  })

    describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#showLogin')
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login').click()
      cy.contains('Matti Luukkainnen logged in')
    })

    it('A blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('Test blog title created by cypress')
      cy.get('#author').type('Test blog author created by cypress')
      cy.get('#url').type('Test blog url created by cypress')
      cy.get('#createBlogButton').click()
      cy.contains('Test blog title created by cypress added')
      cy.contains('Test blog author created by cypress')
    })
  })

  describe('When there are some blogs exists', function() {
    beforeEach(function() {
      cy.get('#showLogin').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login').click()
      cy.contains('add blog').click()
      cy.get('#title').type('Test blog title created by cypress')
      cy.get('#author').type('Test blog author created by cypress')
      cy.get('#url').type('Test blog url created by cypress')
      cy.get('#createBlogButton').click()
    })

    it('blog can be liked', function() {
      cy.get('#entryShow').click()
      cy.get('#entryLikes')
        .contains('likes 0')
      cy.get('#likeButton').click()
      cy.get('#entryLikes')
        .contains('likes 1')
    })
    it('blog can only be deleted by its creator', function() {
      cy.get('#logout').click()
      cy.get('#showLogin').click()
      cy.get('input:first').type('lmuukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login').click()
      cy.get('#entryShow').click()
      cy.contains('#removeButton').should('not.exist')
      cy.get('#logout').click()
      cy.get('#showLogin').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login').click()
      cy.get('#removeButton').click()
    })

    it.only('multiple blogs are sorted acording to number of likes', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('Test blog title1 created by cypress')
      cy.get('#author').type('Test blog author1 created by cypress')
      cy.get('#url').type('Test blog url created1 by cypress')
      cy.get('#createBlogButton').click()
      cy.contains('add blog').click()
      cy.get('#title').type('Test blog title2 created by cypress')
      cy.get('#author').type('Test blog author2 created by cypress')
      cy.get('#url').type('Test blog url created2 by cypress')
      cy.get('#createBlogButton').click()
      cy.get('.blogEntry').eq(1).find('#entryShow').click()
      cy.get('.blogEntry').eq(1).find('#likeButton').click()
      cy.get('.blogEntry').eq(0).contains('Test blog title1 created by cypress')
    })
  })

})
