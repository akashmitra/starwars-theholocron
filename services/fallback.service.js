const util = require('../util/util');
const { Carousel, Image, Suggestions } = require('actions-on-google');

module.exports = {
    fallback: (conv, buildResponse, resolve) => {
        let richConvList = [], convList = [];
        var fallback_arr = [
            `I didn't understand`,
            `I'm sorry, can you try again?`
        ];

        let msg = util.getRandomMessage(fallback_arr);

        // For Google Assistant
        richConvList.push(msg);

        // For Voice Only
        convList.push(msg);

        buildResponse(conv, richConvList, convList);
        resolve();
    }
};
