const { User } = require("../models");
const AppError = require("../utils/errors/app-error");
const CrudRepository = require("./crud-repository");

class UserAuthRepository extends CrudRepository {
    constructor() {
        super(User)
    }

    async findByEmail(email) {
        return this.model.findOne({ email });
    }
}

module.exports = UserAuthRepository