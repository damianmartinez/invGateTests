// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--no-sandbox']
        }
    },

    baseUrl: 'https://damianmard.cloud.invgate.net',
    rootElement: 'html',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true
    },

    onPrepare: function() {
        global.isAngularSite = function(flag){
            browser.ignoreSynchronization = !flag;
        };
    },

    specs: [
        'suites/video.js'
    ]
};
