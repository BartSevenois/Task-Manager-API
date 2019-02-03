module.exports = function(sequelize, Sequelize) {
 
    var Task = sequelize.define('task', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.TEXT,
            notEmpty: true
        },

        deadline: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('done', 'not done'),
            defaultValue: 'not done'
        }
    });
    return Task;
 
}