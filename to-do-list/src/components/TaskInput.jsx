function TaskInput(props) {
    return (
        <input
            className='task-input'
            type='text'
            placeholder={props.placeholder}
            value={props.newTask}
            onChange={props.handleInputChange}
            onKeyDown={props.handleKeyDown}
        />
    );
}

export default TaskInput;