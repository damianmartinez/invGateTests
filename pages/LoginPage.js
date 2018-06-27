const configuration = require('./ConfigurationPage');
const until = require('./UtilPage');

class Login {
    /**
     * Default page constructor, locates all the elements
     */
    constructor () {
        this.usernameInput = element(by.id('login_username'));
        this.passwordInput = element(by.id('login_password'));
        this.loginSubmit   = element(by.id('button_login'));
        this.user = element(by.css('div.link'));
        
    } 

    login (username, password) {
        this.usernameInput.clear()
        this.usernameInput.sendKeys(username)
        this.passwordInput.clear()
        this.passwordInput.sendKeys(password)
        this.loginSubmit.click();
    }

}

module.exports = new Login()
