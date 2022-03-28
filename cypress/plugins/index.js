// plugins/index.js
require('dotenv').config()

module.exports = (on, config) => {
    // copy any needed variables from process.env to config.env
    config.env.username = process.env.LOGIN_USERNAME
    config.env.password = process.env.LOGIN_PASSWORD

    // do not forget to return the changed config object!
    return config
}
