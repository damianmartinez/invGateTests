const configuration = require('./ConfigurationPage');
const until = require('./UtilPage');

class Catalog {
    /**
     * Default page constructor, locates all the elements
     */
    constructor () {
        this.adminLink = element(by.linkText('Admin'))
        this.cataloglink = element(by.linkText("Catalog"))
        this.category = element(by.linkText("Category"))
        this.titleCategory = element(by.id("cat_0"))
        this.botomSave = element(by.linkText("Save"))

    } 

    //voy hasta la home de catalog
    goTo(){
        this.adminLink.click()
        this.cataloglink.click()
        until.waitUntilElement(this.category, configuration.timeMs , 'no encontre el elemento Category')          
    }

    CreateCategory(categoryName){
        this.category.click()
        until.waitUntilElementBeClicked(this.titleCategory, configuration.timeMs,"no aparecio")
        this.titleCategory.clear()
        this.titleCategory.sendKeys(categoryName)
        this.botomSave.click()
    }
}

module.exports = new Catalog()