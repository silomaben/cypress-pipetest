describe('cypress tests up', () => {
  it('Student List was found', () => {
    cy.wait(4000)
    cy.visit('/');
    
    cy.get(".text-2xl").contains("Students List")
  })
})