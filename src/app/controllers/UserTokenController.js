const jwt = require('jsonwebtoken');
const UserToken = require('../models/UserTokens');
class UserTokenController {
    async upsert({ user_id, access_token, expired_at }) {
        try {
            await UserToken.updateOne(
                { user_id: user_id },
                {
                    $set: {
                        access_token: access_token,
                        expired_at: expired_at,
                    },
                },
                { upsert: true },
            );
        } catch (error) {
            console.log(error, 'ERR');
        }
    }
    async findOne(user_id) {
        let entry = await UserToken.findOne({ user_id: user_id });
        return entry;
    }
    getNewToken(data, secret_key, time_life) {
        return jwt.sign({ data: data }, secret_key, {
            expiresIn: time_life,
        });
    }
}

module.exports = new UserTokenController();
