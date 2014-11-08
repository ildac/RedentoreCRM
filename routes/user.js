/**
 * Created by Dac on 25/10/14.
 */

var router = require('express').Router();
var userController = require('./controllers/user');

router.route('/users')
    .get(userController.getUsers)
    .post(userController.addUser);

router.route('/users/:userId')
    .get(userController.getUser)
    .put(userController.putUser)
    .delete(userController.deleteUser);

module.exports = router;