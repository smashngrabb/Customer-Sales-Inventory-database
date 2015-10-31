var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllTodos = function (callback) {
	pool.query('SELECT * from todos WHERE status != 1', function (err, result) {
		if (err)
			console.log(err);
		else
			callback(result);
}); };

module.exports.GetTodo = function (todoId, callback) {
	pool.query('SELECT * from todos WHERE todo_id = ' + todoId, function (err, result) {
		if (err)
			console.log(err);
		else
			callback(result);
}); };

module.exports.InsertTodo = function (task, callback) {
	pool.query('INSERT INTO todos SET ?', task, function (err, result) {
		if (err)
			console.log(err);
		else
			callback(result.insertId);
}); };

module.exports.UpdateTodo = function (todo, callback) {
	pool.query('UPDATE todos SET ? where todo_id =' + todo.todo_id, todo, function (err) {
        if (err)
            console.log(err);
        else
            callback(todo.todo_id);
}); };

module.exports.DeleteTodo = function (todoId, callback) {
	pool.query('UPDATE todos SET status = 1 WHERE todo_id = ' + todoId, function (err, result) {
		if (err)
			console.log(err);
		else
			callback(result);
}); };	

module.exports.GetTasks = function (todoId, callback) {
	pool.query('SELECT * from tasks WHERE todo_id = ' + todoId + ' ORDER BY task_id ASC', function (err, result) {
		if (err)
			console.log(err);
		else
			callback(result);
}); };

module.exports.GetTask = function (taskId, callback) {
	pool.query('SELECT * from tasks WHERE task_id = ' + taskId, function (err, result) {
		if (err)
			console.log(err);
		else
			callback(result);
}); };

module.exports.InsertTask = function (task, callback) {
	pool.query('INSERT INTO tasks SET ?', task, function (err, result) {
		if (err)
			console.log(err);
		else
			callback(task.todo_id);
}); };

module.exports.CompleteTask = function (taskId, callback) {
	pool.query('UPDATE tasks SET status = 1 WHERE task_id = ' + taskId, function (err, result) {
        if (err)
        	console.log(err);
        else
            callback(taskId);
}); };
