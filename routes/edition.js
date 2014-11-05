
var router = require('express').Router();
var editionController = require('../controllers/edition');

router.route('/editions/:editionId')
    .put(editionController.putEdition);


module.exports = router;