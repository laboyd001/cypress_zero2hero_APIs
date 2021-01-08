/// <reference types="cypress" />


describe('Test with backend', () => {

    beforeEach('login to the app', () => {
        cy.loginToApplication()
    })

    it('verify correct request and response', () => {

        cy.server()
        cy.route('POST', '**/articles').as('postArticles')
        
        cy.contains('New Article').click() 
        cy.get('[formcontrolname="title"]').type('This is a title')
        cy.get('[formcontrolname="description"]').type('This is a description')
        cy.get('[formcontrolname="body"]').type('This is the body of an article')
        cy.contains('Publish Article').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then( xhr => {
            console.log(xhr)
            expect(xhr.status).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is the body of an article')
            expect(xhr.response.body.article.description).to.equal('This is a description')
        })

    })
})