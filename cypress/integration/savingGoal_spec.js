describe('Saving Goal Page', () => {
  it('successfully loads', () => {
    cy.viewport(1440, 1200);

    cy.visit('http://localhost:1234'); // change URL to match your dev URL
  });

  it('accepts input', () => {
    const typedText = '500000';

    cy.get('.inputAmount').type(typedText);
  });

  it('accepts backward date', () => {
    cy.get('.forward').click();
    cy.get('.forward').click();
    cy.get('.forward').click();
  });

  it('accepts click confirm button', () => {
    cy.get('.confirmButton');
  });

  it('accepts backward date', () => {
    cy.get('.backward').click();
    cy.get('.backward').click();
    cy.get('.backward').click();
  });

  it('accepts backward date', () => {
    for (let i = 0; i < 48; i++) {
      cy.get('.forward').click();
    }
  });

  it('accepts input', () => {
    const typedText = '5000000';

    cy.get('.inputAmount').type(typedText);
  });

  it('accepts backward date', () => {
    for (let i = 0; i < 36; i++) {
      cy.get('.backward').click();
    }
  });
});
