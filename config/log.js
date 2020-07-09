const config = require('./config');

(function () {
    'use strict';

    const log4js = require('log4js');

    //log the Dev logger messages to a file, and the console ones as well.
    log4js.configure({
        appenders: {
            develop: {
                type: 'file',
                filename: global.gConfig.log_filename
            }
        },
        categories: {
            default: {
                appenders: ['develop'],
                level: 'trace'
            }
        }
    });

    //Create a logger instance
    const logger = log4js.getLogger('develop');

    //export the instance
    module.exports = logger;


}());