const configuration = require('./ConfigurationPage');
const until = require('./UtilPage');

class Customizations {
    /**
     * Default page constructor, locates all the elements
     */
    constructor () {
        this.adminLink = element(by.linkText('Admin'))
        this.requestslink = element(by.cssContainingText('div.toolbarItem.incident-config  > a.toolbarItemButton', 'Requests'))
        this.customizationlink = element(by.cssContainingText('div.sectionNavItemTitle', 'Customizations'))
        this.botomAdd = element(by.xpath("//div[@id='body']/div[2]/div[2]/div/div[4]/div/div[2]/a/span[2]"))
        this.botomEdit = element(by.linkText('Edit'))
        this.name = element(by.id("input_name"))
        this.description = element(by.id("input_description"))
        this.fieldCatalog = element(by.xpath("//div[@id='body']/div[2]/div[8]/div/form/div[6]/div/div[2]/div/div[3]/div[2]/div/div/div"))
        this.fieldType = element(by.xpath("//div[@id='body']/div[2]/div[8]/div/form/div[6]/div/div[2]/div/div[6]/div[2]/div/div/div"))
        this.botomSave = element(by.xpath("(//a[contains(text(),'Save')])[6]"))

    } 

   goTo(){
       this.adminLink.click()
       this.requestslink.click()
       until.waitUntilElement(this.customizationlink, configuration.timeMs , 'no enoctre el customlink').click()
   }

   create(customName,descrp, typeElement){
    until.waitUntilElement(this.botomAdd, configuration.timeMs , 'no enoctre el add').click()
    until.waitUntilElement(this.name, configuration.timeMs , 'no enocontre el name').clear()
    this.name.sendKeys(customName)
    this.description.clear()
    this.description.sendKeys(descrp)
    this.fieldType.click()
    browser.sleep(500)
    element(by.cssContainingText("div.inputMultipleSelectOptionTitle", typeElement)).click()
    this.botomSave.click()
    until.waitUntilElementVisible(this.botomAdd, configuration.timeMs, 'no se si lo guardo')
}

   edit(typeCatalog){
    until.waitUntilElement(this.botomEdit, configuration.timeMs , 'no enoctre el add').click()
    until.waitUntilElement(this.fieldCatalog, configuration.timeMs , 'no enocontre el name').click()
    browser.sleep(500)
    element(by.cssContainingText("div.inputMultipleSelectOptionTitle", typeCatalog)).click()
    this.botomSave.click()
    until.waitUntilElementVisible(this.botomAdd, configuration.timeMs, 'no se si lo guardo')

   }

}

module.exports = new Customizations()