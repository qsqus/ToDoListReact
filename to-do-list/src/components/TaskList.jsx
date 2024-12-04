import Task from "./Task";

function TaskList(props) {

    return (
        <ol className='task-list'>
            {props.tasks.map((task, i) => <Task task={task} idx={i} key={i} />)}
        </ol>
    );
}

export default TaskList;