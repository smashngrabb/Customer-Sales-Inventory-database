var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var todoFunctions = require('../functions/todoFunctions.js');

router.get('/', function (req, res) {
	todoFunctions.GetAllTodos(function (result) {
		res.render('allTodos', {
			title: 'All Todos',
			todos: result
}); }); });

router.get('/New/', function (req, res) {
	res.render('addTodo', {
		title: 'Add new Todo'
}); });

router.post('/New/', function (req, res) {
	todoFunctions.InsertTodo(req.body, function (todoId) {
		res.redirect('/Todo/View/' + todoId);
}); });

router.get('/View/:id', function (req, res) {
	todoFunctions.GetTodo(req.params.id, function (result1) {
		todoFunctions.GetTasks(req.params.id, function (result2) {
			res.render('viewTodo', {
				title: 'View Todo',
				todo: result1,
				tasks: result2
}); }); }); });

router.get('/Delete/:id', function (req, res) {
	todoFunctions.DeleteTodo(req.params.id, function (result) {
		res.redirect('/Todo/');
}); });

router.get('/Edit/:id', function (req, res) {
	todoFunctions.GetTodo(req.params.id, function (result) {
		res.render('editTodo', {
			title: 'Edit Todo',
			todo: result
}); }); });

router.post('/Edit/', function (req, res) {
	todoFunctions.UpdateTodo(req.body, function (todoId) {
		res.redirect('/Todo/View/' + todoId);
}); });

router.post('/Tasks/New/', function (req, res) {
	todoFunctions.InsertTask(req.body, function (todoId) {
		res.redirect('/Todo/View/' + todoId);
}); });

router.get('/Tasks/Complete/:id', function (req, res) {
	todoFunctions.CompleteTask(req.params.id, function (taskId) {
		todoFunctions.GetTask(taskId, function (task) {
			res.redirect('/Todo/View/' + task[0].todo_id);
}); }); });


module.exports = router;