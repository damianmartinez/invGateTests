const config = {}

config.baseUrl =  'https://damianmard.cloud.invgate.net'
config.url = config.baseUrl
config.timeMs = 100000
config.nameCategory = 'No CF'
config.nameCategoryDefault = 'Default'


config.allowScreenshots = true

config.credentials = {
    username:  'superadmin',
    password:  ''
}

config.customField = {
    name: 'custom',
    description: 'custom',
    fieldType: 'Number'
}

module.exports = config
