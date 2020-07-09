const util = require('../util/util');
const errorUtil = require('../util/errorUtil');
const fallbackService = require('../services/fallback.service');

module.exports = {
    fallback: (conv) => {
        try {
            var buildResponse = util.buildResponse;
            return new Promise((resolve, reject) => {
                fallbackService.fallback(conv, buildResponse, resolve);
            });
        }
        catch (exception) {
            errorUtil.serverError(exception, conv);
        }
    }
};