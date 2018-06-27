const configuration = require('./ConfigurationPage');
const until = require('./UtilPage');

class Incident {
    /**
     * Default page constructor, locates all the elements
     */
    constructor () {
        this.home = element(by.css('a.optionsNewTicket'))
        

    } 

    //voy hasta la home de catalog
    goTo(){
        this.home.click();                  
    }
}

module.exports = new Incident()