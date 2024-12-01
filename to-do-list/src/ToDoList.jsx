import React, { useState, useEffect } from 'react'
import './ToDoList.css'

function ToDoList() {

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const [tasks, setTasks] = useState(savedTasks);
    const [newTask, setNewTask] = useState('');

    // Update localStorage every time tasks value is updated
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            setTasks(t => [...t, newTask]);
            setNewTask('')
        }
    }

    function deleteTask(idx) {
        setTasks(t => t.filter((_, i) => i !== idx));
    }

    function moveTaskUp(idx) {
        if (idx > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[idx], updatedTasks[idx - 1]] = [updatedTasks[idx - 1], updatedTasks[idx]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(idx) {
        if (idx < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[idx], updatedTasks[idx + 1]] = [updatedTasks[idx + 1], updatedTasks[idx]];
            setTasks(updatedTasks);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div className='to-do-list'>
            <h1>To Do List</h1>

            <div>
                <input
                    type='text'
                    placeholder='New Task...'
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} />

                <button className='add-button' onClick={addTask}> Add </button>
            </div>

            <ol>
                {tasks.map((task, i) =>
                    <li key={i}>
                        <span className='text'> {task} </span>
                        <button className='delete-button' onClick={() => deleteTask(i)}> Delete </button>
                        <button className='move-button' onClick={() => moveTaskUp(i)}> ↑ </button>
                        <button className='move-button' onClick={() => moveTaskDown(i)}> ↓ </button>
                    </li>)}
            </ol>
        </div>
    );
}

export default ToDoList