"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added Todo', todo: newTodo });
});
router.put('/todo/:todoId', (req, res, next) => {
    const param = req.params;
    const body = req.body;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === param.todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: 'Updated todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const param = req.params;
    todos = todos.filter(todoItem => todoItem.id !== param.todoId);
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;
