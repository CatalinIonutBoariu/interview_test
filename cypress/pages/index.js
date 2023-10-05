export class Index {

    url = "https://emag.ro"
    searchBar = "input[id='searchboxTrigger']"
    itemTitle = "div[id='card_grid'] div div h2"
    itemPrice = "div[id='card_grid'] div div div div p[class='product-new-price']"
    itemPagePrice = "form div div div div div div p[class='product-new-price']"

    searchForItem(item) {
        cy.get(this.searchBar).type(item)
    }

    /**
     * Check that the item title from the thumbnail is the same with the title from the item page
     */
    checkTitle() {
        cy.get(this.itemTitle)
            .should("be.visible")
            .eq(2)
            .invoke('text')
            .then((title) => {
                const cleanTitle = title.replace(/\n/g, '').trim();

                cy.get(this.itemTitle).eq(2).click()

                cy.get('h1').invoke('text').then((h1Text) => {
                    // Remove newline characters from the h1Text
                    const cleanH1Text = h1Text.replace(/\n/g, '').trim();

                    // Compare the cleaned titles
                    cy.wrap(cleanH1Text).should("eq", cleanTitle);
                })
        })
    }

    /**
     * Check that the price item thumbnail is the same as the price from the item page
     */
    checkPrice() {
        cy.get(this.itemPrice)
            .should("be.visible")
            .eq(2)
            .invoke('text')
            .then((price) => {
                cy.get(this.itemTitle).eq(2).click()

                cy.get(this.itemPagePrice).first().should("be.visible").invoke('text').then((pagePrice) => {
                    cy.wrap(price).should("eq", pagePrice);
                })
            })
    }

    goToHomepage() {
        cy.visit(this.url)
    }


}