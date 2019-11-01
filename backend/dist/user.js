"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matchers = function (user) {
        return user != undefined
            && user.email === this.email
            && user.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "mail1@domain.com": new User('mail1@domain.com', 'User 1', 'password'),
    "mail2@domain.com": new User('mail2@domain.com', 'User 2', 'password')
};
