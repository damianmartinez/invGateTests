'use strict';

const loginPage = require('./../pages/LoginPage')
const configuration = require('./../pages/ConfigurationPage')
const until = require('./../pages/UtilPage')
const catalog = require('./../pages/CatalogPage')
const incident = require('./../pages/IncidentPage')
const customization = require('./../pages/CustomizationsPage')

describe('Ejercicio de automation InvGate', function() {

  beforeAll(() => {
    isAngularSite(false)
    browser.driver.manage().window().maximize()
    browser.get(configuration.url)
    
  })

  it('Login', function() {
    //me logueo
    loginPage.login(configuration.credentials.username, configuration.credentials.password)
    //espero el nombre del user logueado
    until.waitUntilElement( loginPage.user, configuration.timeMs , 'no puedo asegurar el logueo espere el elemento y no aparecio')
    //valido al user logueado
    expect(loginPage.user.getText()).toEqual('Admin User')
  })

  it('crear categoty', function() {
    //voy a catalogo
    catalog.goTo()
    //creo una categoria
    catalog.CreateCategory(configuration.nameCategory)
    //espero que termine de guardar
    //var newCategory = element(by.xpath("//div[@id='admin_categories']/ul/li[2]/ul/li[2]/div/div[3]/strong"))
    until.waitUntilElementBeClicked(catalog.category, configuration.timeMs, "espero elemento visible")
    //vamos a validar que exista la  categoria en la pagina 'incidente'
    incident.goTo()
    var elem = element(by.cssContainingText('div.inputMultipleSelectOptionTitle', configuration.nameCategory))
    expect(elem.getText()).toEqual(configuration.nameCategory)

  })
 
  it('crear custom field', function(){
    // voy a customization
    customization.goTo()
    // creo una field
    customization.create(configuration.customField.name, configuration.customField.description, configuration.customField.fieldType)
    // espero volver a la page, esperando el boton agregar
    until.waitUntilElementBeClicked(customization.botomAdd, configuration.timeMs, "espero elemento visible")
    //valido que exista al crear un incidente 
     incident.isPresentCustomField(configuration.nameCategory, configuration.customField.name)
     incident.isPresentCustomField(configuration.nameCategoryDefault, configuration.customField.name)

  })

  it('probar Boton Change Category',function(){
    incident.goTo()
    incident.selectCategory(configuration.nameCategory)
    incident.continue.click()
    incident.backToCategory.click()
    expect(element(by.css('div.inputMultipleSelectOptionTitle')).isDisplayed()).toBe(true)

  })

  it('editar custom field - que solo exista para Default', function(){
    customization.goTo()
    //edito el catalog
    customization.edit(configuration.nameCategoryDefault)
    incident.goTo()
    //valido que no este visible el field
    incident.isNotPresentCustomField(configuration.nameCategory, configuration.customField.name)
  })

});

