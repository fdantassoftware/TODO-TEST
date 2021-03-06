'use strict'
var express = require('express');
var router = express.Router();
var Task = require('../models/task');
var mongoose = require('mongoose');

router.getAllTasks = function(req, res) {

    // Create a result variable to be used later when sending json
    var result = {};

    // Here we return all tasks

    Task.find(function (error, tasks) {
        if (error) {
            result.errorDescription = 'Error while retrieving tasks';
            result.errorCode = -1;
            res.json(result);
        } else {
            // Here we send the tasks instead
            res.json(tasks);
        }
    });
}

router.getTaskByID = function(req, res) {

    // Create a result variable to be used later when sending json
    var result = {};

    // Get Task by a given id

    Task.find({"_id": req.body.id}, function (error, task) {
       if (error) {
           result.errorDescription = 'Error while retrieving task';
           result.errorCode = -1;
           res.json(result);
       } else {
           res.json(task);
       }
    });

}


router.getAllCompletedTasks = function(req, res) {

    // Create a result variable to be used later when sending json
    var result = {};

    // Get Task by a given id

    Task.find({"status": 'completed'}, function (error, task) {
        if (error) {
            result.errorDescription = 'Error while retrieving task';
            result.errorCode = -1;
            res.json(result);
        } else {
            res.json(task);
        }
    });

}


router.createNewTask = function(req, res) {

    // Create a result variable to be used later when sending json
    var result = {};

    // create a new task instance
    var task = new Task();

    // Grab values from post and set our new instance

    // Here we make sure that the post includes valid mandatory data (name, deadline).
    if (req.body.name == false || req.body.deadline == false) {
        result.errorDescription = 'Invalid Entries';
        result.errorCode = -2;
        res.json(result);
    } else {
        task.name = req.body.name;
        task.deadline = req.body.deadline;
        task.description = req.body.description;
        // Here we default the task status to new
        task.status = 'new';

        // Here we finally save our data to Mongo
        task.save(function(error, data) {
            if (error) {
                result.errorDescription = 'Error while saving data to db';
                result.errorCode = -1;
            } else {
                result.errorDescription = null;
                result.errorCode = 0;
            }
            res.json(result);
        });

    }


}

router.updateTaskStatus = function(req, res) {
    // Create a result variable to be used later when sending json
    var result = {};

    // Here we grab the ID from The post request and attempt to update the record as completed
    Task.findOneAndUpdate({_id: req.body.id}, {
        $set: {
            "status": 'completed',
        }
    }, {upsert: true}, function (error, task) {

        if (error) {
            result.errorDescription = 'Error while updating record';
            result.errorCode = -1;

        } else {
            result.errorDescription = null;
            result.errorCode = 0;
        }
        res.json(result);

    });
}


router.deleteTaskByID = function(req, res) {
    // Create a result variable to be used later when sending json
    var result = {};

    // Attempt to delete record
    Task.findByIdAndRemove(req.body.id, function (error) {
       if (error) {
           result.errorDescription = 'Error while deleting record';
           result.errorCode = -1;
       } else {
           result.errorDescription = null;
           result.errorCode = 0;
       }
        res.json(result);

    });

}



module.exports = router;