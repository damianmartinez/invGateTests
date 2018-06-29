const configuration = require('./ConfigurationPage');
const until = require('./UtilPage');

class Incident {
    /**
     * Default page constructor, locates all the elements
     */
    constructor () {
        this.home = element(by.css('a.optionsNewTicket'))
        this.continue = element(by.id("button_continue"))
        this.backToCategory = element(by.css("#category_step2 > div.requestCategoryTitles > div.moduleButton"))
        this.fielCustom = element(by.css('div.requestCreateCustomField > div.requestCreateLabel'))

    } 

    //voy hasta la home de catalog
    goTo(){
        this.home.click();                  
    }

    selectCategory(category){
        
    element(by.cssContainingText('div.inputMultipleSelectOptionTitle', category)).click()
    }

    isPresentCustomField(cat, field){
    this.goTo()
    this.selectCategory(cat)
    this.continue.click()
    until.waitUntilElementVisible(this.fielCustom, configuration.timeMs, 'no aparece el file')
    expect(this.fielCustom.getText()).toEqual(field)
    }

    isNotPresentCustomField(cat, field){
        this.goTo()
        this.selectCategory(cat)
        this.continue.click()
        browser.sleep(500)
        expect(this.fielCustom.isDisplayed()).toBe(false)
        }

}

module.exports = new Incident()