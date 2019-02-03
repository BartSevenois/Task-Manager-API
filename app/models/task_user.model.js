module.exports = function(sequelize, Sequelize) {
 
    var TaskUser = sequelize.define('taskUser', {
        task_id: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    }, {
        tableName: 'task_user'
    });
    return TaskUser;
 
}