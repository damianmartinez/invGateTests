/**
 * Copyright (C) Intraway Corporation - All Rights Reserved (2016)
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
'use strict';

var fs = require('fs');
var path = require('path');
const config = require('./ConfigurationPage');


class Util {

      // Generic methods
    //////////////////////////////////////////////////////////////////////////
    waitUntilElement(element, timeoutInMs, errorMessage) {
        console.log('Waiting for element for ' + timeoutInMs + ' ms...');
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(element), timeoutInMs, errorMessage);
        return element;
    }

     waitUntilElementVisible(element, timeoutInMs, errorMessage) {
        console.log('Waiting for element to be visible for ' + timeoutInMs + ' ms...');
        var until = protractor.ExpectedConditions;
        browser.wait(until.visibilityOf(element), timeoutInMs, errorMessage);
        return element;
    }

    waitUntilVisibleGeneral(typeElement, elementValue, timeoutInMs, errorMessage) {
        console.log('Waiting for element that matches the "' + typeElement + '" with the value "' + elementValue + '" to be visible for ' + timeoutInMs + ' ms...');
        var elem = this.returnElement(typeElement,elementValue);
        var until = protractor.ExpectedConditions;
        browser.wait(until.visibilityOf(elem), timeoutInMs, errorMessage);
        return elem;
    }

    waitUntilElementBeClicked(element, timeoutInMs, errorMessage) {
        console.log('Waiting for element to be clickeable for ' + timeoutInMs + ' ms...');
        var until = protractor.ExpectedConditions;
        browser.wait(until.elementToBeClickable(element), timeoutInMs, errorMessage);
        return element;
    }
    waitUntilElementHide(element, timeoutInMs, errorMessage) {
        console.log('Waiting for element to hide for ' + timeoutInMs + ' ms...');
        var until = protractor.ExpectedConditions;
        browser.wait(until.invisibilityOf(element), timeoutInMs, errorMessage);
        return element;
    }

    waitElementToBePresent(element, timeOutInS, cont = 1) {
        var present = false;
        var contSeg = cont;
        return element.isPresent()
            .then((present) => {
                if(!present && contSeg <= timeOutInS){
                    console.log('Waiting for element for ' + timeOutInS + ' Sec to be present...');
                    browser.sleep(1000);
                    contSeg = contSeg + 1;
                    return this.waitElementToBePresent(element, timeOutInS, contSeg);
                }
                else{
                    console.log("intento: " + contSeg)
                    if(contSeg >= timeOutInS) {
                        console.log("The element is not present.");
                        present = false;
                    }
                    else {
                        console.log("The element is present.");
                        present = true;
                    }
                }
                return present;
            })
    }
   
    //////////////////////////////////////////////////////////////////////////
}

module.exports = new Util();
