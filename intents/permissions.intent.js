const util = require('../util/util');
const errorUtil = require('../util/errorUtil');
const permissionService = require('../services/permission.service');

module.exports = {
    usernamePermission: (conv, params, permissionGranted) => {
        try {
            var buildResponse = util.buildResponse;
            if (permissionGranted) {
                util.setUsername(conv, conv.user.name.display);
            }
            return new Promise((resolve, reject) => {
                permissionService.welcomePermission(conv, buildResponse, resolve, permissionGranted);
            });
        }
        catch (exception) {
            errorUtil.serverError(exception, conv);
        }
    }

};