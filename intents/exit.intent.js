const util = require('../util/util');
const errorUtil = require('../util/errorUtil');
const exitService = require('../services/exit.service');

module.exports = {
    exit: (conv) => {
        try {
            var buildResponse = util.buildResponse;
            return new Promise((resolve, reject) => {
                exitService.exit(conv, buildResponse, resolve);
            });
        }
        catch (exception) {
            errorUtil.serverError(exception, conv);
        }
    }
};