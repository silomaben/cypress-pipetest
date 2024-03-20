describe('cypress hurraaa ', () => {
  it('Student List was found by the silent G', () => {
    cy.wait(4000)
    cy.visit('/');
    
    cy.get(".text-2xl").contains("Students List")
  })
})