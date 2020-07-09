const util = require('../util/util');
const { Carousel, Image, Suggestions } = require('actions-on-google');

module.exports = {

    welcomePermission: (conv, buildResponse, resolve, permissionGranted) => {
        let richConvList = [], convList = [];

        if (!permissionGranted) {
            // response for Audio Visual
            richConvList.push(`Ok, no worries. What's your favorite color?`);
            richConvList.push(new Suggestions('Blue', 'Red', 'Green'));
        }
        else {
            const userName = util.getUsername(conv);
            // For Audio Visual
            richConvList.push(`Thanks, ${userName}. What's your favorite color?`);
            richConvList.push(new Suggestions('Blue', 'Red', 'Green'));
        }

        buildResponse(conv, richConvList, convList);
        resolve();
    }
};