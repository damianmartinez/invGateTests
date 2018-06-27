'use strict';

const loginPage = require('./../pages/LoginPage')
const configuration = require('./../pages/ConfigurationPage')
const until = require('./../pages/UtilPage')
const catalog = require('./../pages/CatalogPage')
const incident = require('./../pages/IncidentPage')

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

  it('Catalog', function() {
    //voy a catalogo
    catalog.goTo()
    //creo una categoria
    catalog.CreateCategory(configuration.nameCategory)
    //espero y valido que se creo en la pagina Catalogo
    var newCategory = element(by.xpath("//div[@id='admin_categories']/ul/li[2]/ul/li[2]/div/div[3]/strong"))
    until.waitUntilElementBeClicked(newCategory, configuration.timeMs, "espero elemento visible")
    expect(newCategory.getText()).toEqual(configuration.nameCategory)
    //vamos a validar que exista la  categoria en la pagina incidente
    incident.goTo()
    var elem = element(by.cssContainingText('div.inputMultipleSelectOptionTitle', configuration.nameCategory));
    expect(elem.getText()).toEqual(configuration.nameCategory)

  })


});

