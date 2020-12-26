var express = require('express');
var router = express.Router();
var validation = require('../middlewares/validate.mdw');
var userModel = require('../models/users.model');
var jwt = require('jsonwebtoken');
var constant = require('../utils/globals');
var commonUtils = require('../utils/common');

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Authorization
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "username": "tienqd", (Bắt buộc)
 *          "password": "123456" (Bắt buộc)
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRpZW5xZCIsImVtYWlsIjoicXVhY2hkaW5odGllbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiMzAzLzE3IELhur9uIFbDom4gxJDhu5NuIFAuMiBRLjQgVFAuSENNIiwicGhvbmUiOiIwNTgyMTQxMTA3IiwidXNlcl9yb2xlX2lkIjoyLCJpYXQiOjE2MDg5OTcwMjJ9.Da8w4cLxKpibP3t8YsKco3Lw__0eNP0YLAumO_XbXx0",
 *          "data": {
 *              "user_id": 1,
 *              "username": "tienqd",
 *              "email": "quachdinhtien@gmail.com",
 *              "address": "303/17 Bến Vân Đồn P.2 Q.4 TP.HCM",
 *              "phone": "0582141107",
 *              "user_role_id": 2
 *          }
 *     }
 */
router.post('/login', validation(require('../schemas/auth.json')), function (req, res) {
    const user = req.body;

    userModel.login(user.username).then(data => {
        const password = data.password;

        if (password != user.password) {
            throw "Password not match";
        }

        data.password = undefined;

        const token = jwt.sign(commonUtils.parse2PlainObject(data), constant.secretKeys);

        res.json({
            access_token: token,
            data: data
        });
    }).catch(_ => {
        res.status(401).json({
            message: "Username or password incorrect!"
        });
    });
});

module.exports = router;
