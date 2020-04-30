const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");

const Dishes = require("../models/dishes");


const dishes = express.Router();

dishes.use(bodyParser.json());

dishes.route('/')
    .get((req, res, next) => {
        Dishes.find({})
            .populate('comments.author')
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log("Dish Created ", dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation dose not support on /dishes');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            },
                (err) => next(err))
            .catch((err) => next(err));
    });



dishes.route('/:dishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            },
                (err) => next(err))
            .catch((err) => next(err));
    });


// for comment ............................//


dishes.route('/:dishId/comments')
    .get((req, res, next) => {
        Dishes.findById((req.params.dishId))
            .populate('comments.author')
            .then((dish) => {
                if (dish != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments);
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + 'not found.');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        if (!req.user.admin) {
            Dishes.findById((req.params.dishId))
                .then((dish) => {
                    if (dish != null) {
                        req.body.author = req.user._id;
                        dish.comments.push(req.body);
                        dish.save()
                            .then((dish) => {
                                Dishes.findById(dish._id)
                                    .populate('comments.auther')
                                    .then((dish) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(dish);
                                    })
                            }), (err) => next(err);
                    }
                    else {
                        err = new Error('Dish ' + req.params.dishId + 'not found.');
                        err.statusCode = 404;
                        return next(err);
                    }
                }, (err) => next(err))
                .catch((err) => next(err));
        }
        else {
            var err = new Error("You are not perform this operastion on comment !!");
            next(err);
            return;
        }
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        if (!req.user.admin) {
            res.statusCode = 403;
            res.end('PUT operation dose not support on /dishes' + req.params.dishId + '/comments');
        }
        else {
            var err = new Error("You are not perform this operastion on comment !!");
            next(err);
            return;
        }
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.findById((req.params.dishId))
            .then((dish) => {
                if (dish != null) {
                    for (var i = (dish.comments.length - 1); i >= 0; i--) {
                        dish.comments.id(dish.comments[i]._id).remove();
                    }
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        }), (err) => next(err);
                }
                else {
                    err = new Error('Dish ' + req.params.dishId + 'not found.');
                    err.statusCode = 404;
                    return next(err);
                }
            },
                (err) => next(err))
            .catch((err) => next(err));
    });



dishes.route('/:dishId/comments/:commentId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((dish) => {
                if (dish != null && dish.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments.id(req.params.commentId));
                }
                else if (dish == null) {
                    err = new Error('Dish ' + req.params.dishId + 'not found.');
                    err.statusCode = 404;
                    return next(err);
                }
                else {
                    err = new Error('Comment ' + req.params.commentId + 'not found.');
                    err.statusCode = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        if (!req.user.admin) {
            res.statusCode = 403;
            res.end('POST operation not supported on /dishes/' + req.params.dishId + '/comments/' + req.params.commentId);
        }
        else {
            var err = new Error("You are not perform this operastion on comment !!");
            next(err);
            return;
        }
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        if (!req.user.admin) {
            //    console.log(req.user._id);
            Dishes.findById(req.params.dishId)
                .then((dish) => {

                    //     console.log(dish.comments.id(req.params.commentId).author);

                    if ((req.user._id).equals(dish.comments.id(req.params.commentId).author)) {   // Check user is valid or not for performing delete or update operation on his own comment.
                        // console.log("yes");


                        if (dish != null && dish.comments.id(req.params.commentId) != null) {
                            if (req.body.rating) {
                                dish.comments.id(req.params.commentId).rating = req.body.rating;
                            }
                            if (req.body.comment) {
                                dish.comments.id(req.params.commentId).comment = req.body.comment;
                            }
                            dish.save()
                                .then((dish) => {
                                    Dishes.findById(dish._id)
                                        .populate('comment.author')
                                        .then((dish) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(dish);
                                        })
                                }, (err) => next(err));
                        }
                        else if (dish == null) {
                            let err = new Error('Dish ' + req.params.dishId + 'not found.');
                            err.statusCode = 404;
                            return next(err);
                        } else {
                            let err = new Error('Comment ' + req.params.commentId + 'not found.');
                            err.statusCode = 404;
                            return next(err);
                        }
                    }
                    else {
                        let err = new Error("You can not modify the other user comment !!");
                        next(err);
                        return;
                    }
                }, (err) => next(err))
                .catch((err) => next(err));
        }
        else {
            var err = new Error("You are not perform this operastion on comment !!");
            next(err);
            return;
        }
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        if (!req.user.admin) {
            Dishes.findById((req.params.dishId))
                .then((dish) => {

                    if ((req.user._id).equals(dish.comments.id(req.params.commentId).author)) {

                        if (dish != null && dish.comments.id(req.params.commentId) != null) {

                            dish.comments.id(req.params.commentId).remove();

                            dish.save()
                                .then((dish) => {
                                    Dishes.findById(dish._id)
                                        .populate('comment.author')
                                        .then((dish) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(dish);
                                        })
                                }, (err) => next(err));
                        }
                        else if (dish == null) {
                            err = new Error('Dish ' + req.params.dishId + 'not found.');
                            err.statusCode = 404;
                            return next(err);
                        } else {
                            err = new Error('Comment ' + req.params.commentId + 'not found.');
                            err.statusCode = 404;
                            return next(err);
                        }
                    }
                    else {
                        let err = new Error("You can not delete the other user comment !!");
                        next(err);
                        return;
                    }
                }, (err) => next(err))
                .catch((err) => next(err));
        }
        else {
            var err = new Error("You are not perform this operastion on comment !!");
            next(err);
            return;
        }
    });


module.exports = dishes;