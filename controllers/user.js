/**
 * Created by Dac on 25/10/14.
 */

var User = require('../models/user');

exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    })
};

exports.getUser = function (req, res) {
    User.findById( req.params.userId,
        function (err, user) {
            if(err) {
                res.send(err);
            }
            res.json(user);
        }
    );
};

exports.postUser = function (req, res) {
    var user = new User(req.body)
    user.save(function (err, result) {
        if (err) {
            res.send(err);
        }

        res.json({message: 'saved', data: result});
    });
};

exports.putUser = function (req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body,
        function (err, user) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'updated', data: user});
        }
    );
};

exports.deleteUser = function (req, res) {
    User.findByIdAndRemove( req.params.userId,
        function (err, removed) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'deleted', data: removed });
        }
    );
};