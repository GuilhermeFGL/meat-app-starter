"use strict";
exports.__esModule = true;
exports.handleAuthorization = function (request, response, callback) {
    var token = extractToken(request);
    if (!token) {
        response.setHeader('WWW-Authenticate', 'Bearer token-type="JWT"');
        response.status(401).json({ message: 'Você precisa se autentificar.' });
    }
    else {
    }
};
