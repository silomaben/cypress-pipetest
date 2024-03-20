describe('cypress works as exprected thank you very much! ', () => {
  it('Student List was found by the silent G', () => {
    cy.wait(4000)
    cy.visit('/');
    
    cy.get(".text-2xl").contains("Students List")
  })
})