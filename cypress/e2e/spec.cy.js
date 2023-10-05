import {Index} from "../pages";

describe ('interview test', () => {
  let index = new Index()

  beforeEach(() => {
    index.goToHomepage()
  })

  it('title', () => {
    cy.readFile('cypress/fixtures/items.csv').then((csvContent) => {
      // Split the CSV content into an array of items
      const items = csvContent.split('\n').map((row) => row.trim());

      items.forEach((item) => {
        cy.get(index.searchBar).type(item+'{enter}')
        cy.wait(1000)
        index.checkTitle()
      })
    })
  })

  it('price', () => {
    cy.readFile('cypress/fixtures/items.csv').then((csvContent) => {
      // Split the CSV content into an array of items
      const items = csvContent.split('\n').map((row) => row.trim());

      items.forEach((item) => {
        cy.get(index.searchBar).type(item+'{enter}')
        cy.wait(1000)
        index.checkPrice()
      })
    })
  })
})
