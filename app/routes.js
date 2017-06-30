var express = require('express');
//var router = express.Router();
//var mongoose = require('mongoose');
//var db = mongojs('mongodb://bryan:bryan@ds153709.mlab.com:53709/yaletownnailspa_db', ['subscription_list']);
var Subscriber = require('./models/list');

function getSubs(res) {
    Subscriber.find(function (err, client) {
        if (err) {
            //            console.log(err);
            res.send(err);
        }
        res.json(client);
        //        console.log(client);
    });
};

module.exports = function (app) {
    //api
    //get all clients from db
    app.get('/api/list', function (req, res) {
        getSubs(res);
    });

    //save clients' info
    app.post('/api/list', function (req, res) {
        Subscriber.create({
            name: req.body.name,
            email: req.body.email
        }, function (err, todo) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            getSubs(res);
        });
    });

    // delete a subscriber
    app.delete('/api/list/:list_id', function (req, res) {
        Subscriber.remove({
            _id: req.params.list_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getSubs(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


};


// Get single client info
//router.get('/list/:id', function (req, res, next) {
//    Subscribe.findOne({
//        _id: mongojs.ObjectId(req.params.id)
//    }, function (err, client) {
//        if (err) {
//            res.send(err);
//        }
//        res.json(client);
//    });
//});

//save clients' info
//router.post('/list', function (req, res, next) {
//    var client = req.body;
//    if (!client.name || !client.email) {
//        res.status(400);
//        res.json({
//            "error": "Please enter both your name and email in input fields."
//        });
//    } else {
//        Subscribe.create({
//            name: req.body.text,
//            email: req.body.text
//        }, function (err, client) {
//            if (err) {
//                res.send(err);
//            }
//            Subscribe.find(function (err, client) {
//                if (err) {
//                    res.send(err);
//                }
//                res.json(client);
//            });
//        });
//    }
//});
