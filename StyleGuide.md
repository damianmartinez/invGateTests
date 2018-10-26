Protractor Style Guide
============================

*Some opinionated guidelines for those out there looking for testing best practices with protractor*

This style guide is a set of opinionated rules and best practices about writing e2e tests with Protractor.

## Table of Contents
[Style Guide Rules](#style-guide-rules)
  * [Generic Rules](#generic-rules)
  * [Project Structure](#project-structure)
  * [Locator Strategies](#locator-strategies)
  * [Page Objects](#page-objects)
  * [Test suites](#test-suites)
  * [Useful Links](#useful-links)

## Style Guide Rules

### Generic Rules

###### [Rule-01: Do not cheat on your tests]

  If you're skipping tests or writing dummy ones just to pass that good old coverage check, you're on the road to perdition.
  I'm not necessarily advocating for 100% code coverage, though that would be nice, but at least make sure
  that all your use cases have a minimum amount of tests and that the major possible breaking points are covered.

  **Why?**
  * Tests are there for a reason. They are there to help you track errors and bugs in your code
  * One test less can possibly mean one more bug shipped to production
  * The 'I will test it manually later' thing doesn't work
  * The 'I wrote the code myself, I'm sure it works' thing doesn't work either

###### [Rule-02: Prefer unit over e2e tests when possible]

  Try to cover as much as possible of your logic with unit tests rather than with e2e tests. If you have doubts whether
  a certain part of your code should be unit or e2e tested, if it makes sense to unit test it, always prefer that over
  e2e tests.

  **Why?**
  * Unit tests are much faster than e2e tests

###### [Rule-03: Don't e2e test what has already been unit tested]

  If you already have unit tests for a particular behavior, there is no need to write more e2e tests for that exact same
  part of the code. It might be that the same behavior will be hit as part of the flow under test in one of your e2e
  tests, but having two dedicated tests for the same piece of code is not necessary

  **Why?**
  * Avoid duplicate tests

### Project Structure

###### [Rule-04: Group your e2e tests in a structure that makes sense to the structure of your project]

  **Why?**
  * Finding your e2e related files should be intuitive and easy
  * Makes the folder structure more readable
  * Clearly separates e2e tests from unit tests

  ##### Small scale Angular apps
  
   ```
     /* avoid */
     |-- project-folder
       |-- app
           |-- css
           |-- img
           |-- partials
               home.html
               profile.html
               contacts.html
           |-- js
               |-- controllers
               |-- directives
               |-- services
               app.js
               ...
           index.html
       |-- test
           |-- unit
           |-- e2e
               home.pageObject.js
               home.spec.js
               profile.pageObject.js
               profile.spec.js
               contacts.pageObject.js
               contacts.spec.js
   ```

   ```
     /* recommended */
     |-- project-folder
       |-- app
           |-- css
           |-- img
           |-- partials
                 home.html
                 profile.html
                 contacts.html
           |-- js
               |-- controllers
               |-- directives
               |-- services
               app.js
               ...
           index.html
       |-- test
           |-- unit
           |-- e2e
               |-- page-objects
                     home.pageObject.js
                     profile.pageObject.js
                     contacts.pageObject.js
                |-- specs
                     home.spec.js
                     profile.spec.js
                     contacts.spec.js
   ```

### Locator Strategies

###### [Rule-05: Never use xpath]

  **Why?**
  * It's the slowest and most brittle locator strategy of all
  * Markup is very easily subject to change and therefore xpath locators require a lot of maintenance
  * xpath expressions are unreadable and very hard to debug


  ```javascript
    /* avoid */
    var elem = element(by.xpath('/*/p[2]/b[2]/following-sibling::node()' +
     '[count(.|/*/p[2]/b[2]/following-sibling::br[1]/preceding-sibling::node())' +
     '=' +
     ' count((/*/p[2]/b[2]/following-sibling::br[1]/preceding-sibling::node()))' +
     ']'));
  ```

###### [Rule-06: Prefer Protractor locators when possible]

  **Why?**
  * They are very specific locators
  * Access elements easier
  * Expressions are less likely to change than markup
  * Simple and readable locators

    ```html
      <ul class="red">
        <li>{{color.name}}</li>
        <li>{{color.shade}}</li>
        <li>{{color.code}}</li>
      </ul>
    ```

    ```javascript
      /* avoid */
      var nameElem = element.all(by.css('.red li')).get(0);
    ```

    ```javascript
      /* recommended */
      var nameElem = element(by.binding('color.name'));
    ```

###### [Rule-07: Prefer **by.id** and **by.css** when no Protractor locators are available]

  **Why?**
  * Both are very performant and readable locators
  * Access elements easier

###### [Rule-08: Avoid text locators for text that changes frequently]

  **Why?**
  * Text for buttons, links, and labels tends to change over time
  * Your tests should not break when you make minor text changes


### Page Objects

###### [Rule-9: Use Page Objects to interact with page under test]

  **Why?**
  * They encapsulate information about the elements on the page under test
  * Can be reused across multiple tests
  * Decouple the test logic from implementation details

   ```javascript
      /* avoid */

      /* question.spec.js */
      describe('Question page', function() {
        it('should answer any question', function() {
          var question = element(by.model('question.text'));
          var answer = element(by.binding('answer'));
          var button = element(by.css('.question-button'));

          question.sendKeys('What is the purpose of life?');
          button.click();
          expect(answer.getText()).toEqual("Chocolate!");
        });
      });
   ```

   ```javascript
      /* recommended */

      /* question.spec.js */
      var question = require('./question.page');

      describe('Question page', function() {
        it('should ask any question', function() {
          question.ask('What is the purpose of meaning?');
          expect(question.answer.getText()).toEqual('Chocolate');
        });
      });
   ```

   ```javascript
      /* recommended */

      /* question.page.js */
      var QuestionPage = function() {
        this.question = element(by.model('question.text'));
        this.answer = element(by.binding('answer'));
        this.button = element(by.className('question-button'));

        this.ask = function(question) {
          this.question.sendKeys(question);
          this.button.click();
        };
      };
      module.exports = new QuestionPage;
   ```

###### [Rule-10: UpperCamelCase the names of your Page Objects]

  **Why?**
  * By definition, a Page Object is an object-oriented class and therefore all class naming conventions
  apply to it

    ```javascript
      /* avoid */
      var grandfatherOfAllKnowledge = function() {};
      var grandfather-of-all-knowledge = function() {};
      var grandfather_of_all_knowledge = function() {};
    ```

    ```javascript
      /* recommended */
      var GrandfatherOfAllKnowledge = function() {
        /*...*/
      };
    ```

###### [Rule-11: Pick a descriptive file naming convention for your Page Object files]

  I've seen both 'page' or 'pageObject' being used and as far as I am concerned, they are equally fine

  **Why?**
  * This will ensure that your Page Object related files are easily recognisable and distinguishable from all
  the other test files

   ```
      /* avoid */
        |-- test
            |-- unit
            |-- e2e
                |-- home
                    |-- home.js
                    |-- home.spec.js
                |-- profile
                    |-- profile.js
                    |-- profile.spec.js
                |-- contacts
                    |-- contacts.js
                    |-- contacts.spec.js
                |-- archive
                    |-- archive.js
                    |-- archive.spec.js
   ```

   ```
   /* recommended */
     |-- test
         |-- unit
         |-- e2e
              |-- page-objects
                    homePage.js
                    profilePage.js
                    contactsPage.js
               |-- specs
                    home.js
                    profile.js
                    contacts.js
   ```

###### [Rule-12: Use a single module.exports at the end of the Page Object file]

  **Why?**
  * Keeps code clean

      ```javascript
      /* avoid */

      /* user-profile.pageObject.js */
      module.exports.logInUser = function() {};
      module.exports.logOutUser = function() {};
      ```

      ```javascript
      /* recommended */

      /* user-profile.pageObject.js */
      var UserProfilePage = function() {
        return {
          logInUser: function() {},
          logOutUser: function() {}
        }
      };

      module.exports = new UserProfilePage;
    ```

###### [Rule-13: Require and instantiate all the modules at the top]

  **Why?**
  * The module dependencies should be clear and easy to find
  * Separates dependencies from the test code

    ```javascript
      /* avoid */

      /* user-properties.spec.js */
      const userPage = require('./user-properties.page');
      const menuPage = require('./menu.page');
      const footerPage = require('./footer.page');

      describe('User properties page', function() {
        // specs
      });
    ```

###### [Rule-14: Declare all public elements in the constructor]

  **Why?**
  * The consumer of the Page Object should have quick access to the available elements on a page


    ```html
        <form>
           Name: <input type="text" ng-model="ctrl.user.name">
           E-mail: <input type="text" ng-model="ctrl.user.email">
           <button id="save-button">Save</button>
        </form>
    ```

    ```javascript
        /* recommended */
        constructor() {
          this.name = element(by.model('ctrl.user.name'));
          this.email = element(by.model('ctrl.user.email'));
          this.saveButton = element(by.id('save-button'));
        };
    ```

###### [Rule-15: Declare functions for operations that require more that one step]

  **Why?**
  * Most elements are exposed by the Page Object and can be used directly in the test
  * Doing otherwise adds unnecessary complexity

    ```javascript
        /* avoid */

        /* user-properties.page.js */
        var UserPropertiesPage = function() {
          this.name = element(by.model('ctrl.user.name'));
          this.saveButton = element(by.id('save-button'));

          this.enterName = function(name) {
            this.name.sendKeys(name);
          };
        };


        /* user-properties.spec.js */
        var user = require('./user-properties.page');

        describe('User properties page', function() {

          it('should enable save button when a username is entered', function() {
             user.enterName('TeddyB');
             expect(user.saveButton.isEnabled()).toBe(true);
           });
        });
    ```

    ```javascript
        /* recommended */

        /* user-properties.page.js */
        var UserPropertiesPage = function() {
          this.name = element(by.model('ctrl.user.name'));
          this.saveButton = element(by.id('save-button'));
        };


        /* user-properties.spec.js */
        var user = require('./user-properties.page');

        describe('User properties page', function() {

          it('should enable save button when a username is entered', function() {
             user.name.sendKeys('TeddyB');
             expect(user.saveButton.isEnabled()).toBe(true);
           });
        });
    ```

###### [Rule-16: Do not add any assertions in your Page Object definitions]

  Martin Fowler has a very good thought on this one:

> Page Objects are commonly used for testing, but should not make assertions themselves. Their responsibility is to
> provide access to the state of the underlying page. It's up to test clients to carry out the assertion logic.

  **Why?**
  * It is the responsibility of the test to do all the assertions
  * Reader of the test should be able to understand the behavior of the application by looking at the test only

### Test Suites

###### [Rule-17: Don't mock unless you need to]

  This rule is a bit controversial, in the sense that opinions are very divided when it comes to what the best practice
  is. Some developers argue that e2e tests should use mocks for everything in order to avoid external network calls and
  have a second set of integration tests to test the APIs and database. Other developers argue that e2e tests should
  operate on the entire system and be as close to the 'real deal' as possible.

  I tend to agree with Julie Ralph on this one, when she says that

> which option is better depends on how many backends you have, how expensive they are to start up, and the needs of
> your project.

  If you can test everything together, then my advice is to do that, because that's the closest to the real app context
  you can get. This will also give you much more confidence in your tests and that your app is production ready. If that's
  not possible Protractor has some mocking strategies that you can use.

  **Why?**
  * Using the real application with all the dependencies gives you high confidence
  * Helps you spot some corner cases you might have overlooked

###### [Rule-18: Use Jasmine2]

  **Why?**
  * Well [documented](http://jasmine.github.io/2.0/introduction.html)
  * Supported by Protractor out of the box
  * You can use **beforeAll** and **afterAll**

###### [Rule-19: Make your tests independent at file level]

  **Why?**
  * You can run tests in parallel with sharding
  * The execution order is not guaranteed
  * You can run suites in isolation

###### [Rule-20: Make your tests independent from each other]

  This rule holds true unless the operations performed to initialize the state of the tests are too expensive. For example,
  if your e2e tests would require that you create a new user before each spec is executed, you might end up with too high
  test run times. However, this does not mean you should make tests directly depend on one another.
  So, instead of creating a user in one of your tests and expect that record to be there for all
  other subsequent tests, you could harvest the power of jasmine's [beforeAll](http://jasmine.github.io/edge/introduction.html#section-Setup_and_Teardown) (since Jasmine 2.1)
  to create the user.

  ```javascript
    /* avoid */
    it('should create user', function() {
       browser.get('#/user-list');
       userList.newButton.click();

       userProperties.name.sendKeys('Teddy B');
       userProperties.saveButton.click();

       browser.get('#/user-list');
       userList.search('Teddy B');
       expect(userList.getNames()).toEqual(['Teddy B']);
    });

    it('should update user', function() {
       browser.get('#/user-list');
       userList.clickOn('Teddy B');

       userProperties.name.clear().sendKeys('Teddy C');
       userProperties.saveButton.click();

       browser.get('#/user-list');
       userList.search('Teddy C');
       expect(userList.getNames()).toEqual(['Teddy C']);
    });
  ```
    
  ```javascript
    /* recommended */
   describe('when the user Teddy B is created', function(){
   
       beforeAll(function(){
          browser.get('#/user-list');
          userList.newButton.click();
   
          userProperties.name.sendKeys('Teddy B');
          userProperties.saveButton.click();
          browser.get('#/user-list');
       });
   
       it('should exist', function(){
          userList.search('Teddy B');
          expect(userList.getNames()).toEqual(['Teddy B']);    
          userList.clear();
       });
   
       describe('and gets updated to Teddy C', function(){
   
           beforeAll(function(){
               userList.clickOn('Teddy B');
   
               userProperties.name.clear().sendKeys('Teddy C');
               userProperties.saveButton.click();
   
               browser.get('#/user-list');
           });
   
           it('should be Teddy C', function(){
               userList.search('Teddy C');
               expect(userList.getNames()).toEqual(['Teddy C']);
               userList.clear();
           });
       });
    });
  ```

  **Why?**
  * You can run each single test in isolation
  * You can debug your tests (ddescribe/fdescribe/xdescribe/iit/fit/xit)

## Useful Links
  Protractor - http://angular.github.io/protractor

  GTAC 2010: The Future of Front-End Testing - https://www.youtube.com/watch?v=oX-0Mt5zju0

  Selenium - http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern

  Google Selenium pages - https://github.com/SeleniumHQ/selenium/wiki/PageObjects

  Martin Fowler article on Page Objects - http://martinfowler.com/bliki/PageObject.html
