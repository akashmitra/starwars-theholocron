const { Carousel, Image, Suggestions } = require('actions-on-google');
const REQUEST = require('request');
const https = require('https');
const config = require('../config/config');
const util = require('../util/util');

module.exports = {
    exit: (conv, buildResponse, resolve) => {
        let richConvList = [], convList = [];
        var exit_arr = [
            `This is the way`,
            `May the Force be with you!`,
            `The Force is with me. I am one with the force.`
        ];

        let msg = util.getRandomMessage(exit_arr);

        // For Google Assistant
        richConvList.push(msg);

        // For Voice Only 
        convList.push(msg);

        buildResponse(conv, richConvList, convList, true);
        resolve();
    }
};