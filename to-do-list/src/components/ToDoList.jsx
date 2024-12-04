import { useState, useEffect, createContext } from 'react'
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import Button from './Button';

export const ButtonsContext = createContext()

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

    function handleAddTask() {
        if (newTask.trim() !== '') {
            setTasks(t => [...t, newTask]);
            setNewTask('')
        }
    }

    function handleDeleteTask(idx) {
        setTasks(t => t.filter((_, i) => i !== idx));
    }

    function handleMoveTaskUp(idx) {
        if (idx > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[idx], updatedTasks[idx - 1]] = [updatedTasks[idx - 1], updatedTasks[idx]];
            setTasks(updatedTasks);
        }
    }

    function handleMoveTaskDown(idx) {
        if (idx < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[idx], updatedTasks[idx + 1]] = [updatedTasks[idx + 1], updatedTasks[idx]];
            setTasks(updatedTasks);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    }

    return (
        <div className='to-do-list'>
            <h1 className='title'>To Do List</h1>

            <div>
                <TaskInput
                    placeholder={'New Task...'}
                    newTask={newTask}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                />
                <Button class='add-button' func={handleAddTask} text={'Add'}/>
            </div>

            <ButtonsContext.Provider value={{
                deleteTask: handleDeleteTask,
                moveTaskUp: handleMoveTaskUp,
                moveTaskDown: handleMoveTaskDown
            }}
            >
                <TaskList tasks={tasks} />
            </ButtonsContext.Provider>

        </div>
    );
}

export default ToDoList