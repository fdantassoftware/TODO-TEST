var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({

    name: String,
    deadline: String,
    status: String,
    description: String,
    createdAt: {type: Date},
});

TaskSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});


module.exports = mongoose.model('tasks', TaskSchema);