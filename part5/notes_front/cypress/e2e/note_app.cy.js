describe('Note app', function() {


  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainnen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST',`${Cypress.env('BACKEND')}/users` , user)

    cy.visit('')
  })
  
  it('front page can be opened', function() {
    cy.contains('Notes')
  })
  
it('login fails with wrong password', function() {
    cy.contains('show login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()


    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  it('login form can be opened', function() {
    cy.contains('show login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainnen logged in')
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be crated', function() {
      cy.contains('show add form').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

  describe('and several notes exist', function () {
    beforeEach(function () {
      cy.createNote({ content: 'first note', important: false })
      cy.createNote({ content: 'second note', important: false })
      cy.createNote({ content: 'third note', important: false })
    })

    it('one of those can be made important', function () {
      cy.contains('second note')
        .contains('make important')
        .click()

      cy.contains('second note')
        .contains('make not important')
    })
  })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function() {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make important')
      })
    })
  })
  
})


