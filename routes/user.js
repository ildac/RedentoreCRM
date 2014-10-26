/**
 * Created by Dac on 25/10/14.
 */

var router = require('express').Router();

router.get('/users', function defaultRoute(req, res) {
    res.json({message: "Welcome to new Redentore CRM"});
});

module.exports = router;