var express = require('express'),
    bodyParser = require('body-parser');

// Initialise express to app
var app = express();
app.use(bodyParser.json());

// Routes
require('./app/routes/auth.route.js')(app);
require('./app/routes/task.route.js')(app);

// DB Connection
const db = require('./app/config/db.config.js');
const Role = db.role;
const Task = db.tasks;
const User = db.user;

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync with { force: true }');
//     initial();
// });

// Create server
var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
})

function initial() {

    Role.create({
        id: 1,
        name: "USER"
    });

    Role.create({
        id: 2,
        name: "ADMIN"
    });

    Role.create({
        id: 3,
        name: "PM"
    });

    Task.create({
        title: "First task",
        description: "Task description",
        deadline: "2019-04-20 10:00:00",
        status: "not done"
    })

}