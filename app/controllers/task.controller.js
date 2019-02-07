const db = require('../config/db.config.js');
const Task = db.tasks;
const TaskUser = db.task_user;

const Op = db.Sequelize.Op;

exports.createTask = (req, res) => {
	var timeSplit = req.body.deadlineTime.split(":");
    timeSplit[0] = Number(timeSplit[0]) + 1;
    var time = timeSplit.join(":")
    task = {
        'title': req.body.title,
        'description': req.body.description,
        'deadline': req.body.deadlineDate.split("/").reverse().join("-") + ' ' + time,
        'status': req.body.status
    }
    Task.create(task).then(function (task) {
   
        relation = {
            task_id: task.id,
            user_id: req.body.userId
        }
        TaskUser.create(relation)
        res.send("Task created")
    })
}

exports.getTaskById = (req, res) => {
	Task.findAll({
        where: {
            '$taskUsers.user_id$': req.body.userId,
            '$task.id$': req.params.id
        },
        include: [{
            model: TaskUser,
            required: false
        }]
    }).then(tasks => {
        console.log(tasks);
        res.send(tasks)
        
    })
}

exports.getTasksByUserId = (req, res) => {
    Task.findAll({
        where: {
            '$taskUsers.user_id$': req.params.id
        },
        include: [{
            model: TaskUser,
            required: false
        }]
    }).then(tasks => {
        console.log(tasks);
        res.send(tasks)
        
    })
}

exports.updateTask = (req ,res) => {
    var timeSplit = req.body.deadlineTime.split(":");
    timeSplit[0] = Number(timeSplit[0]) + 1;
    var time = timeSplit.join(":")
    Task.find({
        where: {
            '$task.id$': req.params.id
        },
        include: [{
            model: TaskUser,
            required: false
        }]
    }).then(task => {
        if(task) {
            task.update({
                'title': req.body.title,
                'description': req.body.description,
                'deadline': req.body.deadlineDate.split("/").reverse().join("-") + ' ' + time,
                'status': req.body.status
            }).then(task => {
                res.send("Task updated");
            })
        } else {
            res.status(404).json({
                "error": "Task dont exists"
            })
        }
    }).catch(err => {
        res.status(500).json({
			"description": "TTT",
			"error": err
		});
    })
}

