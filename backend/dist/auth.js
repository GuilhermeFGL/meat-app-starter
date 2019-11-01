"use strict";
exports.__esModule = true;
var user_1 = require("./user");
var jwt = require("jsonwebtoken");
exports.handleAuthentication = function (request, response) {
    var user = request.body;
    if (isValid(user)) {
        var dbUser = user_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, 'meat-api-password');
        response.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        response.status(403).json({ message: 'Dados inválidos' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = user_1.users[user.email];
    return dbUser != undefined && dbUser.matchers(user);
}
